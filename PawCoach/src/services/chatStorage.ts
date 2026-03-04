import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../types';

const MESSAGES_KEY = 'pawcoach_messages';
const MAX_MESSAGES = 50;

interface SerializedMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  trainerName?: string;
  chatId?: number;
  rating?: number;
}

const serializeMessages = (messages: Message[]): string => {
  const serialized: SerializedMessage[] = messages.map(msg => ({
    ...msg,
    timestamp: msg.timestamp.toISOString(),
  }));
  return JSON.stringify(serialized);
};

const deserializeMessages = (json: string): Message[] => {
  const parsed: SerializedMessage[] = JSON.parse(json);
  return parsed.map(msg => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
};

export const saveMessages = async (messages: Message[]): Promise<void> => {
  try {
    // Keep only the last MAX_MESSAGES
    const trimmed = messages.slice(-MAX_MESSAGES);
    await AsyncStorage.setItem(MESSAGES_KEY, serializeMessages(trimmed));
  } catch (error) {
    console.warn('Nachrichten konnten nicht gespeichert werden:', error);
  }
};

export const loadMessages = async (): Promise<Message[] | null> => {
  try {
    const json = await AsyncStorage.getItem(MESSAGES_KEY);
    if (!json) return null;
    return deserializeMessages(json);
  } catch (error) {
    console.warn('Nachrichten konnten nicht geladen werden:', error);
    return null;
  }
};

export const clearMessages = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(MESSAGES_KEY);
  } catch (error) {
    console.warn('Nachrichten konnten nicht gelöscht werden:', error);
  }
};
