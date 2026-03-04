import { Trainer } from '../types';
import { API_BASE_URL } from '../config';

// Fallback bis Trainer-Profil vom Backend geladen ist
const DEFAULT_TRAINER: Trainer = {
  id: 'trainer',
  name: 'PawCoach',
  specialty: 'Hundeerziehung',
  avatar: '🐕',
  systemPrompt: '',
};

// Trainer-Profil vom Backend laden
export const fetchTrainer = async (): Promise<Trainer> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/trainer`);
    if (!res.ok) return DEFAULT_TRAINER;
    const data = await res.json();
    return {
      id: data.id || DEFAULT_TRAINER.id,
      name: data.name || DEFAULT_TRAINER.name,
      specialty: data.specialty || DEFAULT_TRAINER.specialty,
      avatar: data.avatar || DEFAULT_TRAINER.avatar,
      systemPrompt: '',
    };
  } catch {
    return DEFAULT_TRAINER;
  }
};

export const TRAINER = DEFAULT_TRAINER;

export const getWelcomeMessage = (trainer?: Trainer): string => {
  const t = trainer || DEFAULT_TRAINER;
  return `Hallo! Ich bin ${t.name}. Wie kann ich dir helfen? ${t.avatar}`;
};
