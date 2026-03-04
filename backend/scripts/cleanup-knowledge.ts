import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const removeCategories = [
  'BUSINESSWISSEN FÜR HUNDETRAINER',
  'RECHT & GESETZGEBUNG',
  'WISSENSCHAFT & FORSCHUNG',
  'KOMMUNIKATION MIT HUNDEHALTERN (Coaching-Kompetenzen)',
  'ASSISTENZ- & THERAPIEHUNDE',
  'APP-SPEZIFISCHE KATEGORIEN (Funktionsideen)',
  'Glossar & Fachbegriffe',
];

async function cleanup() {
  for (const cat of removeCategories) {
    const { error, count } = await supabase
      .from('knowledge')
      .delete()
      .eq('category', cat);
    console.log(`${error ? 'FEHLER' : 'OK'} - ${cat}`);
  }

  const { data } = await supabase.from('knowledge').select('category');
  const cats: Record<string, number> = {};
  data?.forEach((e: any) => { cats[e.category] = (cats[e.category] || 0) + 1; });

  console.log('\nVerbleibende Kategorien:');
  Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${v}x ${k}`);
  });
  console.log(`\nGesamt: ${data?.length} Einträge`);
}

cleanup();
