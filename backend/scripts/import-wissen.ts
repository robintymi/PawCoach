import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Manuelles Kategorie-Mapping pro Eintrag (präziser als KI)
const CATEGORY_MAP: Record<number, string> = {
  1:  'Hundeverhalten & Körpersprache',
  2:  'Hundeverhalten & Körpersprache',
  3:  'Hundeverhalten & Körpersprache',
  4:  'Sozialverhalten & Hundebegegnungen',
  5:  'Hundeverhalten & Körpersprache',
  6:  'Hundeverhalten & Körpersprache',
  7:  'Hundeverhalten & Körpersprache',
  8:  'Hundeverhalten & Körpersprache',
  9:  'Hundeverhalten & Körpersprache',
  10: 'Philosophie & Trainingsansatz',
  11: 'Mensch-Hund-Beziehung',
  12: 'Sozialverhalten & Hundebegegnungen',
  13: 'Lerntheorie & Trainingsmethoden',
  14: 'Lerntheorie & Trainingsmethoden',
  15: 'Lerntheorie & Trainingsmethoden',
  16: 'Lerntheorie & Trainingsmethoden',
  17: 'Lerntheorie & Trainingsmethoden',
  18: 'Hundeverhalten & Körpersprache',
  19: 'Hundeverhalten & Körpersprache',
  20: 'Hundeverhalten & Körpersprache',
  21: 'Welpen & Junghunde',
  22: 'Welpen & Junghunde',
  23: 'Welpen & Junghunde',
  24: 'Ernährung & Gesundheit',
  25: 'Philosophie & Trainingsansatz',
  26: 'Lerntheorie & Trainingsmethoden',
  27: 'Rückruf & Impulskontrolle',
  28: 'Lerntheorie & Trainingsmethoden',
  29: 'Lerntheorie & Trainingsmethoden',
  30: 'Lerntheorie & Trainingsmethoden',
  31: 'Aggression & Reaktivität',
  32: 'Angst & Unsicherheit',
  33: 'Aggression & Reaktivität',
  34: 'Angst & Unsicherheit',
  35: 'Aggression & Reaktivität',
  36: 'Rassebesonderheiten',
  37: 'Ernährung & Gesundheit',
  38: 'Ernährung & Gesundheit',
  39: 'Welpen & Junghunde',
  40: 'Welpen & Junghunde',
  41: 'Leinenführigkeit & Freilauf',
  42: 'Rückruf & Impulskontrolle',
  43: 'Beschäftigung & Auslastung',
  44: 'Lerntheorie & Trainingsmethoden',
  45: 'Alltagssituationen & Management',
  46: 'Sozialverhalten & Hundebegegnungen',
  47: 'Alltagssituationen & Management',
  48: 'Alltagssituationen & Management',
};

async function importEntries() {
  const filePath = path.join(__dirname, '..', 'data', 'wissenseintraege.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Parse entries: split by "### Eintrag N:"
  const entryRegex = /### Eintrag (\d+):\s*(.+?)\n\n([\s\S]*?)(?=### Eintrag \d+:|$)/g;
  const entries: { num: number; title: string; content: string }[] = [];

  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    entries.push({
      num: parseInt(match[1]),
      title: match[2].trim(),
      content: match[3].trim(),
    });
  }

  console.log(`${entries.length} Einträge gefunden.`);

  // Check existing entries to avoid duplicates
  const { data: existing } = await supabase.from('knowledge').select('content');
  const existingContents = new Set((existing || []).map(e => e.content.substring(0, 50)));

  let inserted = 0;
  let skipped = 0;

  for (const entry of entries) {
    const category = CATEGORY_MAP[entry.num] || 'Alltagssituationen & Management';
    const fullContent = `${entry.title}: ${entry.content}`;

    // Skip if already exists (check first 50 chars)
    if (existingContents.has(fullContent.substring(0, 50))) {
      skipped++;
      continue;
    }

    const { error } = await supabase.from('knowledge').insert({
      category,
      content: fullContent,
    });

    if (error) {
      console.error(`Fehler bei Eintrag ${entry.num}:`, error.message);
    } else {
      console.log(`  ${entry.num}. [${category}] ${entry.title}`);
      inserted++;
    }
  }

  console.log(`\nFertig: ${inserted} eingefügt, ${skipped} übersprungen (Duplikate).`);

  // Show category distribution
  const { data: all } = await supabase.from('knowledge').select('category');
  if (all) {
    const counts: Record<string, number> = {};
    all.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
    console.log('\nKategorie-Verteilung:');
    Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`  ${count}x ${cat}`);
    });
    console.log(`\nGesamt: ${all.length} Einträge`);
  }
}

importEntries();
