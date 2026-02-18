import { supabase } from './db';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

// Ermittelt welche Kategorien zur Kundenfrage passen
const pickRelevantCategories = async (
  query: string,
  availableCategories: string[]
): Promise<string[]> => {
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Ein Hundehalter stellt folgende Frage an einen Hundetrainer:
"${query}"

Welche dieser Wissenskategorien sind relevant, um die Frage kompetent zu beantworten?
Wähle 1-4 Kategorien (nur die wirklich relevanten).

Verfügbare Kategorien:
${availableCategories.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Antworte NUR mit den Nummern, kommagetrennt (z.B. "2, 5, 11"). Kein anderer Text.`,
      }],
    });

    const result = (response.content[0] as { text: string }).text.trim();
    const indices = result.match(/\d+/g)?.map(n => parseInt(n) - 1) || [];
    return indices
      .filter(i => i >= 0 && i < availableCategories.length)
      .map(i => availableCategories[i]);
  } catch {
    // Bei Fehler: alle Kategorien zurückgeben (Fallback)
    return availableCategories;
  }
};

// Baut den Knowledge-Prompt – selektiv nach Kundenfrage oder komplett (für Admin)
export const buildKnowledgePrompt = async (customerQuery?: string): Promise<string> => {
  const entries = await getKnowledge();
  if (entries.length === 0) return '';

  const grouped: Record<string, string[]> = {};
  for (const entry of entries) {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry.content);
  }

  const allCategories = Object.keys(grouped);

  // Weniger als 30 Einträge oder keine Query → alles laden
  let selectedCategories: string[];
  if (!customerQuery || entries.length < 30) {
    selectedCategories = allCategories;
  } else {
    selectedCategories = await pickRelevantCategories(customerQuery, allCategories);
    // Fallback: wenn keine Kategorie gewählt wurde, alle nehmen
    if (selectedCategories.length === 0) selectedCategories = allCategories;
  }

  let prompt = '\n\n## DEIN ERFAHRUNGSWISSEN AUS DER PRAXIS:\n';
  for (const category of selectedCategories) {
    if (!grouped[category]) continue;
    prompt += `\n### ${category}:\n`;
    grouped[category].forEach(c => (prompt += `- ${c}\n`));
  }
  return prompt;
};
