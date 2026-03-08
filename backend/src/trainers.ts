import { supabase } from './db';

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  systemPrompt: string;
}

const TRAINER_BASE = {
  id: 'trainer',
  name: 'Robin Erike',
  specialty: 'Robins Hundeschule',
  avatar: '🐕',
};

const DEFAULT_PROMPT =
  `Du bist ${TRAINER_BASE.name}, ein erfahrener Hundetrainer. ` +
  `Antworte ausschließlich als ${TRAINER_BASE.name}, gib praktische und klare Ratschläge auf Deutsch. ` +
  `Nutze das Admin-Panel → Prompt Builder, um dieses Profil mit echtem Wissen zu befüllen.`;

export const saveSystemPrompt = async (prompt: string): Promise<void> => {
  const { error } = await supabase
    .from('system_prompts')
    .upsert({
      id: TRAINER_BASE.id,
      prompt,
      updated_at: new Date().toISOString(),
    });

  if (error) console.error('Supabase savePrompt Fehler:', error);
};

export const getTrainer = async (): Promise<Trainer> => {
  const { data } = await supabase
    .from('system_prompts')
    .select('prompt')
    .eq('id', TRAINER_BASE.id)
    .single();

  return {
    ...TRAINER_BASE,
    systemPrompt: data?.prompt || DEFAULT_PROMPT,
  };
};
