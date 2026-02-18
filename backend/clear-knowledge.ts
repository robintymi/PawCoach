import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

async function clearAll() {
  const { count } = await supabase.from('knowledge').select('*', { count: 'exact', head: true });
  console.log(`${count} Einträge in der Datenbank gefunden.`);

  const { error } = await supabase.from('knowledge').delete().neq('id', 0);
  if (error) {
    console.error('Fehler beim Löschen:', error);
  } else {
    console.log(`Alle ${count} Einträge gelöscht. Datenbank ist jetzt leer.`);
  }
}

clearAll();
