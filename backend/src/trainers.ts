import fs from 'fs';
import path from 'path';

const PROMPTS_FILE = path.join(__dirname, '../../data/system-prompts.json');

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  systemPrompt: string;
}

// ── Trainer-Profil hier anpassen ──────────────────────
const TRAINER_BASE = {
  id: 'trainer',
  name: 'Dein Hundetrainer',      // ← Echten Namen eintragen
  specialty: 'Hundeerziehung',    // ← Spezialgebiet eintragen
  avatar: '🐕',
};
// ──────────────────────────────────────────────────────

const DEFAULT_PROMPT = (): string =>
  `Du bist ${TRAINER_BASE.name}, ein erfahrener Hundetrainer. ` +
  `Antworte ausschließlich als ${TRAINER_BASE.name}, gib praktische und klare Ratschläge auf Deutsch. ` +
  `Nutze das Admin-Panel → Prompt Builder, um dieses Profil mit echtem Wissen zu befüllen.`;

const loadStoredPrompt = (): string => {
  if (fs.existsSync(PROMPTS_FILE)) {
    const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'));
    return data[TRAINER_BASE.id] || '';
  }
  return '';
};

export const saveSystemPrompt = (_trainerId: string, prompt: string): void => {
  fs.mkdirSync(path.dirname(PROMPTS_FILE), { recursive: true });
  const data: Record<string, string> = fs.existsSync(PROMPTS_FILE)
    ? JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
    : {};
  data[TRAINER_BASE.id] = prompt;
  fs.writeFileSync(PROMPTS_FILE, JSON.stringify(data, null, 2));
};

// Immer frisch laden damit Prompt-Änderungen sofort wirksam sind
export const getTrainer = (): Trainer => ({
  ...TRAINER_BASE,
  systemPrompt: loadStoredPrompt() || DEFAULT_PROMPT(),
});

// Rückwärts-Kompatibilität
export const getTrainers = (): Trainer[] => [getTrainer()];
export const TRAINERS = getTrainers();
