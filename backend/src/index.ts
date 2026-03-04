import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { getTrainer } from './trainers';
import { buildKnowledgePrompt } from './knowledge';
import adminRouter from './admin/routes';
import whatsappRouter from './whatsapp';
import { logChat, rateChat, getAnalyticsSummary, getTopQuestions, getLowRatedChats } from './analytics';
import { requireAuth } from './admin/auth';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS – nur bekannte Origins erlauben (Fallback: alles erlauben)
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length > 0
    ? (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error('CORS not allowed'));
      }
    : true,
  credentials: true,
}));

// Rate-Limiting: Chat-Endpunkt (20 Anfragen pro Minute pro IP)
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Zu viele Anfragen. Bitte warte einen Moment.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate-Limiting: Allgemein (100 Anfragen pro Minute)
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'pawcoach-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 },
}));

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Einfache HTML-Sanitization gegen XSS
const sanitize = (input: string): string =>
  input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ──────────────────────────────────────────
// ÖFFENTLICHE ROUTEN (Kunden)
// ──────────────────────────────────────────

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/chat/index.html'));
});

app.get('/api/trainer', async (req, res) => {
  const { id, name, specialty, avatar } = await getTrainer();
  res.json({ id, name, specialty, avatar });
});

// Chat-Endpunkt mit SSE-Streaming + Rate-Limiting
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message ist erforderlich' });
  }

  // Input-Länge begrenzen
  const safeMessage = message.substring(0, 2000);

  const trainer = await getTrainer();
  const knowledgeAddendum = await buildKnowledgePrompt(safeMessage);
  const systemPrompt = trainer.systemPrompt + knowledgeAddendum;

  const messages = [
    ...(history || []).slice(-10).map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: typeof msg.content === 'string' ? msg.content.substring(0, 5000) : '',
    })),
    { role: 'user' as const, content: safeMessage },
  ];

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Timeout: 60 Sekunden für die gesamte Anfrage
  const timeout = setTimeout(() => {
    res.write(`data: ${JSON.stringify({ error: 'Zeitüberschreitung' })}\n\n`);
    res.end();
  }, 60000);

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text;
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    clearTimeout(timeout);

    // Analytics: Chat-Interaktion loggen
    const source = (req.headers['x-source'] as 'app' | 'web' | 'whatsapp') || 'web';
    logChat(safeMessage, fullResponse, [], source).then(chatId => {
      if (chatId) {
        res.write(`data: ${JSON.stringify({ chatId })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    }).catch(() => {
      res.write('data: [DONE]\n\n');
      res.end();
    });
  } catch (error) {
    clearTimeout(timeout);
    console.error('Claude API Fehler:', error);
    res.write(`data: ${JSON.stringify({ error: 'Interner Fehler' })}\n\n`);
    res.end();
  }
});

// ──────────────────────────────────────────
// ADMIN ROUTEN (Trainer-Login)
// ──────────────────────────────────────────
app.use('/admin', adminRouter);

// ──────────────────────────────────────────
// WHATSAPP WEBHOOK
// ──────────────────────────────────────────
app.use('/webhook', whatsappRouter);

// ──────────────────────────────────────────
// ANALYTICS API
// ──────────────────────────────────────────

// Kunde bewertet eine Chat-Antwort (1-5 Sterne) – öffentlich
app.post('/api/rate', async (req, res) => {
  const { chatId, rating, feedback } = req.body;
  if (!chatId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'chatId und rating (1-5) erforderlich' });
  }
  const safeFeedback = feedback ? sanitize(String(feedback).substring(0, 500)) : undefined;
  const success = await rateChat(chatId, rating, safeFeedback);
  res.json({ success });
});

// Admin: Analytics-Übersicht (geschützt)
app.get('/api/analytics/summary', requireAuth, async (req, res) => {
  const summary = await getAnalyticsSummary();
  res.json(summary);
});

// Admin: Letzte Fragen (geschützt)
app.get('/api/analytics/questions', requireAuth, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const questions = await getTopQuestions(limit);
  res.json(questions);
});

// Admin: Schlecht bewertete Antworten (geschützt)
app.get('/api/analytics/low-rated', requireAuth, async (req, res) => {
  const chats = await getLowRatedChats(2, 20);
  res.json(chats);
});

// Health Check
app.get('/health', async (req, res) => {
  const trainer = await getTrainer();
  res.json({
    status: 'ok',
    service: 'PawCoach API',
    trainer: trainer.name,
  });
});

app.listen(PORT, () => {
  console.log(`PawCoach laeuft auf http://localhost:${PORT}`);
  console.log(`   Chat:  http://localhost:${PORT}/`);
  console.log(`   Admin: http://localhost:${PORT}/admin/login`);
});
