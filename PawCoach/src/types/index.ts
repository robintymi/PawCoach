export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  trainerName?: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  systemPrompt: string;
  avatar: string;
}

export interface ChatSession {
  id: string;
  trainerId: string;
  messages: Message[];
  createdAt: Date;
}
