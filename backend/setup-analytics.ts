import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

async function setupAnalytics() {
  console.log('Erstelle chat_analytics Tabelle...\n');

  // Prüfe ob Tabelle schon existiert
  const { data: existing } = await supabase
    .from('chat_analytics')
    .select('id')
    .limit(1);

  if (existing !== null) {
    console.log('Tabelle chat_analytics existiert bereits!');
    return;
  }

  // Tabelle existiert noch nicht → muss in Supabase SQL Editor erstellt werden
  console.log(`
Die Tabelle muss im Supabase SQL Editor erstellt werden.
Gehe zu: https://supabase.com/dashboard → SQL Editor → Neues Query:

────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_analytics (
  id BIGSERIAL PRIMARY KEY,
  user_question TEXT NOT NULL,
  assistant_response TEXT,
  categories_used TEXT[] DEFAULT '{}',
  response_length INTEGER DEFAULT 0,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  source VARCHAR(20) DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnelle Abfragen
CREATE INDEX idx_chat_analytics_created ON chat_analytics(created_at DESC);
CREATE INDEX idx_chat_analytics_rating ON chat_analytics(rating) WHERE rating IS NOT NULL;
CREATE INDEX idx_chat_analytics_source ON chat_analytics(source);

-- RLS deaktivieren (wie bei knowledge-Tabelle)
ALTER TABLE chat_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON chat_analytics FOR ALL USING (true) WITH CHECK (true);
────────────────────────────────────────────────

Führe dieses SQL in Supabase aus, dann ist die Analytics-Tabelle bereit.
  `);
}

setupAnalytics();
