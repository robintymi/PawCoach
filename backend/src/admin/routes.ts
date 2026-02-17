import { Router, Request, Response } from 'express';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { requireAuth, handleLogin, handleLogout } from './auth';
import {
  getKnowledge,
  addKnowledgeEntry,
  deleteKnowledgeEntry,
} from '../knowledge';
import { getTrainers, getTrainer, saveSystemPrompt } from '../trainers';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Login
router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/admin/login.html'));
});
router.post('/login', handleLogin);
router.get('/logout', handleLogout);

// Dashboard
router.get('/dashboard', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/admin/dashboard.html'));
});

// Prompt Builder
router.get('/prompt-builder', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/admin/prompt-builder.html'));
});

// ── Trainer API ──────────────────────────────────────
router.get('/api/trainers', requireAuth, (req: Request, res: Response) => {
  const trainers = getTrainers().map(t => ({
    id: t.id,
    name: t.name,
    specialty: t.specialty,
    avatar: t.avatar,
    hasCustomPrompt: t.systemPrompt.length > 200,
  }));
  res.json(trainers);
});

// Aktuellen System Prompt abrufen
router.get('/api/systemprompt/:trainerId', requireAuth, (req: Request, res: Response) => {
  const trainer = getTrainer(req.params.trainerId);
  if (!trainer) { res.status(404).json({ error: 'Trainer nicht gefunden' }); return; }
  res.json({ prompt: trainer.systemPrompt });
});

// System Prompt speichern
router.post('/api/systemprompt/:trainerId', requireAuth, (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt || prompt.trim().length < 50) {
    res.status(400).json({ error: 'Prompt muss mindestens 50 Zeichen lang sein' });
    return;
  }
  saveSystemPrompt(req.params.trainerId, prompt.trim());
  res.json({ success: true });
});

// ── Prompt Builder: Claude baut den Prompt ──────────
router.post('/api/build-prompt', requireAuth, async (req: Request, res: Response) => {
  const { trainerId, input, mode } = req.body;

  if (!trainerId || !input || input.trim().length < 30) {
    res.status(400).json({ error: 'Bitte mehr Text eingeben (min. 30 Zeichen)' });
    return;
  }

  const trainer = getTrainer(trainerId);
  if (!trainer) { res.status(404).json({ error: 'Trainer nicht gefunden' }); return; }

  const modeInstructions: Record<string, string> = {
    freestyle:
      'Der Trainer hat seine Methoden, Weisheiten und Philosophie frei aufgeschrieben. ' +
      'Extrahiere daraus seinen Kommunikationsstil, seine Kernmethoden und typische Phrasen.',
    situations:
      'Der Trainer hat typische Alltagssituationen aus seiner Arbeit beschrieben. ' +
      'Leite daraus ab wie er denkt, was seine Methoden sind und wie er mit Kunden umgeht.',
    interview:
      'Dies sind Antworten des Trainers auf Interview-Fragen. ' +
      'Extrahiere Persönlichkeit, Methodik, Sprache und Werte des Trainers.',
  };

  const metaPrompt = `Du bist Experte für das Erstellen von KI-System-Prompts für virtuelle Assistenten.

Ein Hundetrainer namens "${trainer.name}" (Schwerpunkt: ${trainer.specialty}) hat folgende Informationen gegeben:

---
${input.trim()}
---

Kontext: ${modeInstructions[mode] || modeInstructions.freestyle}

Erstelle daraus einen präzisen System Prompt der:
1. Die KI instruiert, diesen Trainer EXAKT zu simulieren (erste Person, niemals als KI outen)
2. Den Kommunikationsstil und die Persönlichkeit des Trainers authentisch erfasst
3. Spezifische Methoden und Trainingsphilosophie einbettet
4. Typische Phrasen und Ausdrucksweisen natürlich einfließen lässt
5. Klare Verhaltensregeln für die KI definiert
6. Auf Deutsch ist und sich natürlich anfühlt

Wichtig: Schreibe NUR den fertigen System Prompt, keine Einleitung, keine Erklärung. Beginne direkt mit "Du bist ${trainer.name}..."`;

  // Streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [{ role: 'user', content: metaPrompt }],
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Prompt Builder Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Generieren' });
  }
});

// ── Knowledge API ────────────────────────────────────
router.get('/api/knowledge/:trainerId', requireAuth, (req: Request, res: Response) => {
  res.json(getKnowledge(req.params.trainerId));
});

router.post('/api/knowledge/:trainerId', requireAuth, (req: Request, res: Response) => {
  const { category, content } = req.body;
  if (!category || !content || content.trim().length < 10) {
    res.status(400).json({ error: 'Kategorie und Inhalt (min. 10 Zeichen) erforderlich' });
    return;
  }
  addKnowledgeEntry(req.params.trainerId, category, content);
  res.json({ success: true });
});

router.delete('/api/knowledge/:trainerId/:index', requireAuth, (req: Request, res: Response) => {
  deleteKnowledgeEntry(req.params.trainerId, parseInt(req.params.index));
  res.json({ success: true });
});

export default router;
