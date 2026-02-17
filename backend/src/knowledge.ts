import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '../../data/knowledge.json');

export interface KnowledgeEntry {
  category: string;
  content: string;
  addedAt: string;
}

export interface TrainerKnowledge {
  trainerId: string;
  entries: KnowledgeEntry[];
  lastUpdated: string;
}

export interface KnowledgeBase {
  [trainerId: string]: TrainerKnowledge;
}

// Leere Datenbank initialisieren falls noch nicht vorhanden
const initDb = (): KnowledgeBase => {
  if (!fs.existsSync(DATA_FILE)) {
    const empty: KnowledgeBase = {};
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(empty, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

export const getKnowledge = (trainerId: string): KnowledgeEntry[] => {
  const db = initDb();
  return db[trainerId]?.entries || [];
};

export const saveKnowledge = (trainerId: string, entries: KnowledgeEntry[]): void => {
  const db = initDb();
  db[trainerId] = {
    trainerId,
    entries,
    lastUpdated: new Date().toISOString(),
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
};

export const addKnowledgeEntry = (
  trainerId: string,
  category: string,
  content: string
): void => {
  const db = initDb();
  if (!db[trainerId]) {
    db[trainerId] = { trainerId, entries: [], lastUpdated: '' };
  }
  db[trainerId].entries.push({
    category,
    content: content.trim(),
    addedAt: new Date().toISOString(),
  });
  db[trainerId].lastUpdated = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
};

export const deleteKnowledgeEntry = (trainerId: string, index: number): void => {
  const db = initDb();
  if (db[trainerId]) {
    db[trainerId].entries.splice(index, 1);
    db[trainerId].lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  }
};

// Wissen als Text für den System Prompt aufbereiten
export const buildKnowledgePrompt = (trainerId: string): string => {
  const entries = getKnowledge(trainerId);
  if (entries.length === 0) return '';

  const grouped: Record<string, string[]> = {};
  for (const entry of entries) {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry.content);
  }

  let prompt = '\n\n## DEIN ERFAHRUNGSWISSEN AUS DER PRAXIS:\n';
  for (const [category, contents] of Object.entries(grouped)) {
    prompt += `\n### ${category}:\n`;
    contents.forEach(c => (prompt += `- ${c}\n`));
  }
  return prompt;
};
