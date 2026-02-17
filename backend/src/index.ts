import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import { TRAINERS } from './trainers';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'PawCoach API' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history, trainerId } = req.body;

  if (!message || !trainerId) {
    return res.status(400).json({ error: 'message und trainerId sind erforderlich' });
  }

  const trainer = TRAINERS.find(t => t.id === trainerId);
  if (!trainer) {
    return res.status(404).json({ error: `Trainer ${trainerId} nicht gefunden` });
  }

  const messages = [
    ...(history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: message },
  ];

  // Streaming-Antwort
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: trainer.systemPrompt,
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
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

app.listen(PORT, () => {
  console.log(`🐾 PawCoach Backend läuft auf Port ${PORT}`);
});
