import { supabase } from './db';

export interface KnowledgeEntry {
  id?: number;
  category: string;
  content: string;
  created_at?: string;
}

export const getKnowledge = async (): Promise<KnowledgeEntry[]> => {
  const { data, error } = await supabase
    .from('knowledge')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Supabase getKnowledge Fehler:', error);
    return [];
  }
  return data || [];
};

export const addKnowledgeEntry = async (
  category: string,
  content: string
): Promise<void> => {
  const { error } = await supabase
    .from('knowledge')
    .insert({ category, content: content.trim() });

  if (error) console.error('Supabase addKnowledge Fehler:', error);
};

export const deleteKnowledgeEntry = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('knowledge')
    .delete()
    .eq('id', id);

  if (error) console.error('Supabase deleteKnowledge Fehler:', error);
};

export const buildKnowledgePrompt = async (): Promise<string> => {
  const entries = await getKnowledge();
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
