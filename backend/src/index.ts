import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { getTrainer } from './trainers';
import { buildKnowledgePrompt } from './knowledge';
import adminRouter from './admin/routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'pawcoach-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 Stunden
}));

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ──────────────────────────────────────────
// ÖFFENTLICHE ROUTEN (Kunden)
// ──────────────────────────────────────────

// Chat-Interface aufrufen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/chat/index.html'));
});

// Trainer-Info abrufen (für Kunden-UI)
app.get('/api/trainer', (req, res) => {
  const { id, name, specialty, avatar } = getTrainer();
  res.json({ id, name, specialty, avatar });
});

// Chat-Endpunkt mit SSE-Streaming
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'message ist erforderlich' });
  }

  const trainer = getTrainer();
  const knowledgeAddendum = buildKnowledgePrompt(trainer.id);
  const systemPrompt = trainer.systemPrompt + knowledgeAddendum;

  const messages = [
    ...(history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: message },
  ];

  // Streaming via Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Claude API Fehler:', error);
    res.write(`data: ${JSON.stringify({ error: 'Interner Fehler' })}\n\n`);
    res.end();
  }
});

// ──────────────────────────────────────────
// ADMIN ROUTEN (Trainer-Login)
// ──────────────────────────────────────────
app.use('/admin', adminRouter);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PawCoach API',
    trainer: getTrainer().name,
  });
});

app.listen(PORT, () => {
  console.log(`🐾 PawCoach läuft auf http://localhost:${PORT}`);
  console.log(`   Chat:  http://localhost:${PORT}/`);
  console.log(`   Admin: http://localhost:${PORT}/admin/login`);
});
