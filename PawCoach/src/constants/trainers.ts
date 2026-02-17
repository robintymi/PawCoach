import { Trainer } from '../types';

// ── Trainer-Profil hier anpassen ──────────────────────
// Den System Prompt am besten über das Admin-Panel →
// Prompt Builder generieren lassen.
// ──────────────────────────────────────────────────────

export const TRAINER: Trainer = {
  id: 'trainer',
  name: 'Dein Hundetrainer',      // ← Echten Namen eintragen
  specialty: 'Hundeerziehung',    // ← Spezialgebiet eintragen
  avatar: '🐕',
  systemPrompt:
    'Du bist ein erfahrener Hundetrainer. Antworte ausschließlich in dieser Rolle, ' +
    'gib praktische und klare Ratschläge auf Deutsch. Nutze das Admin-Panel → Prompt Builder, ' +
    'um dieses Profil mit echtem Wissen zu befüllen.',
};

export const getWelcomeMessage = (): string =>
  `Hallo! Ich bin ${TRAINER.name}. Wie kann ich dir helfen? ${TRAINER.avatar}`;
