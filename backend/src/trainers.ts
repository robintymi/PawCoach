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

// Basis-Trainer-Daten – hier echte Namen eintragen
const BASE_TRAINERS: Omit<Trainer, 'systemPrompt'>[] = [
  {
    id: 'trainer_1',
    name: 'Max Mustermann',       // ← Echten Namen eintragen
    specialty: 'Welpen & Grundgehorsam',
    avatar: '🐕',
  },
  {
    id: 'trainer_2',
    name: 'Lisa Beispiel',        // ← Echten Namen eintragen
    specialty: 'Verhaltensprobleme & Aggression',
    avatar: '🐩',
  },
];

const DEFAULT_PROMPT = (name: string, specialty: string): string =>
  `Du bist ${name}, ein erfahrener Hundetrainer mit dem Schwerpunkt "${specialty}". ` +
  `Antworte ausschließlich als ${name}, gib praktische und klare Ratschläge auf Deutsch. ` +
  `Nutze das Admin-Panel → Prompt Builder, um dieses Profil mit echtem Wissen zu befüllen.`;

const loadStoredPrompts = (): Record<string, string> => {
  if (fs.existsSync(PROMPTS_FILE)) {
    return JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'));
  }
  return {};
};

export const saveSystemPrompt = (trainerId: string, prompt: string): void => {
  const stored = loadStoredPrompts();
  stored[trainerId] = prompt;
  fs.mkdirSync(path.dirname(PROMPTS_FILE), { recursive: true });
  fs.writeFileSync(PROMPTS_FILE, JSON.stringify(stored, null, 2));
};

// Immer frisch vom Disk lesen (damit gespeicherte Prompts sofort aktiv sind)
export const getTrainers = (): Trainer[] => {
  const stored = loadStoredPrompts();
  return BASE_TRAINERS.map(t => ({
    ...t,
    systemPrompt: stored[t.id] || DEFAULT_PROMPT(t.name, t.specialty),
  }));
};

export const getTrainer = (id: string): Trainer | undefined =>
  getTrainers().find(t => t.id === id);

// Rückwärts-Kompatibilität
export const TRAINERS = getTrainers();
