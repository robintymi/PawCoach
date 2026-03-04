import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const file = fs.readFileSync(
  path.join(__dirname, '../Hundetrainer_Wissenslandkarte.md'),
  'utf-8'
);

interface Entry {
  category: string;
  content: string;
}

function parseMarkdown(md: string): Entry[] {
  const entries: Entry[] = [];
  const lines = md.split('\n');

  let currentCategory = '';
  let currentSubsection = '';
  let buffer: string[] = [];

  const flush = () => {
    if (currentCategory && buffer.length > 0) {
      const content = buffer.join('\n').trim();
      if (content.length > 20) {
        entries.push({
          category: currentCategory,
          content: currentSubsection
            ? `### ${currentSubsection}\n${content}`
            : content,
        });
      }
    }
    buffer = [];
  };

  for (const line of lines) {
    // Hauptkategorie (## 1. HUNDEVERHALTEN ...)
    if (line.match(/^## \d+\./)) {
      flush();
      currentCategory = line
        .replace(/^## \d+\.\s*/, '')
        .replace(/\s*$/, '');
      currentSubsection = '';
      continue;
    }

    // Unterkategorie (### 1.1 Kommunikation ...)
    if (line.match(/^### \d+\.\d+/)) {
      flush();
      currentSubsection = line.replace(/^### \d+\.\d+\s*/, '');
      continue;
    }

    // Anhang / Glossar
    if (line.startsWith('## ANHANG')) {
      flush();
      currentCategory = 'Glossar & Fachbegriffe';
      currentSubsection = '';
      continue;
    }

    // App-spezifische Kategorien
    if (line.match(/^## \d+\. APP-SPEZIFISCHE/)) {
      flush();
      currentCategory = 'App-Funktionsideen';
      currentSubsection = '';
      continue;
    }

    // Skip Titel, Trennlinien, leere Zeilen am Anfang
    if (line.startsWith('# ') || line === '---') continue;

    if (currentCategory) {
      buffer.push(line);
    }
  }
  flush();

  return entries;
}

async function importAll() {
  const entries = parseMarkdown(file);

  console.log(`Parsed ${entries.length} Wissenseinträge`);
  console.log('Kategorien:', [...new Set(entries.map(e => e.category))].join(', '));

  // Batch insert (Supabase max 1000 rows per insert)
  const batchSize = 50;
  let imported = 0;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const { error } = await supabase.from('knowledge').insert(batch);

    if (error) {
      console.error(`Fehler bei Batch ${i}:`, error);
    } else {
      imported += batch.length;
      console.log(`${imported}/${entries.length} importiert...`);
    }
  }

  console.log(`\nFertig! ${imported} Einträge importiert.`);
}

importAll();
