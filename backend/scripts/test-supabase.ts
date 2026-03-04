import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

async function test() {
  console.log('URL:', process.env.SUPABASE_URL);
  console.log('Key:', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...');

  // Test select
  const { data: before, error: err1 } = await supabase.from('knowledge').select('*');
  console.log('Vorher:', before?.length, 'Einträge. Error:', err1);

  // Test insert
  const { data, error } = await supabase.from('knowledge').insert({ category: 'Test', content: 'Testeintrag' }).select();
  console.log('Insert:', data, 'Error:', error);

  // Test select after
  const { data: after, error: err2 } = await supabase.from('knowledge').select('*');
  console.log('Nachher:', after?.length, 'Einträge. Error:', err2);

  // Cleanup
  if (data && data[0]) {
    await supabase.from('knowledge').delete().eq('id', data[0].id);
    console.log('Test-Eintrag wieder gelöscht.');
  }
}
test();
