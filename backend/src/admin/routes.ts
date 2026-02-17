import { Router, Request, Response } from 'express';
import path from 'path';
import { requireAuth, handleLogin, handleLogout } from './auth';
import {
  getKnowledge,
  addKnowledgeEntry,
  deleteKnowledgeEntry,
  KnowledgeEntry,
} from '../knowledge';
import { TRAINERS } from '../trainers';

const router = Router();

// Login-Seite
router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/admin/login.html'));
});

router.post('/login', handleLogin);
router.get('/logout', handleLogout);

// Dashboard (geschützt)
router.get('/dashboard', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/admin/dashboard.html'));
});

// API: Alle Trainer abrufen
router.get('/api/trainers', requireAuth, (req: Request, res: Response) => {
  const trainers = TRAINERS.map(t => ({
    id: t.id,
    name: t.name,
    specialty: t.specialty,
  }));
  res.json(trainers);
});

// API: Wissen eines Trainers abrufen
router.get('/api/knowledge/:trainerId', requireAuth, (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const entries = getKnowledge(trainerId);
  res.json(entries);
});

// API: Neuen Wissens-Eintrag hinzufügen
router.post('/api/knowledge/:trainerId', requireAuth, (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const { category, content } = req.body;

  if (!category || !content) {
    res.status(400).json({ error: 'category und content sind erforderlich' });
    return;
  }

  if (content.trim().length < 10) {
    res.status(400).json({ error: 'Inhalt muss mindestens 10 Zeichen lang sein' });
    return;
  }

  addKnowledgeEntry(trainerId, category, content);
  res.json({ success: true });
});

// API: Wissens-Eintrag löschen
router.delete('/api/knowledge/:trainerId/:index', requireAuth, (req: Request, res: Response) => {
  const { trainerId, index } = req.params;
  deleteKnowledgeEntry(trainerId, parseInt(index));
  res.json({ success: true });
});

export default router;
