import { API_BASE_URL } from '../config';
import { Message, Trainer } from '../types';

// Chat läuft jetzt über das Backend – kein API-Key in der App nötig.
// Das Backend nutzt den System Prompt + Wissen aus Supabase automatisch.

export interface ChatResponse {
  text: string;
  chatId?: number;
}

export const sendMessageToClaude = async (
  userMessage: string,
  conversationHistory: Message[],
  _trainer: Trainer,
  onChunk?: (chunk: string) => void
): Promise<ChatResponse> => {
  const history = conversationHistory
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({ role: msg.role, content: msg.content }));

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/chat`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let fullResponse = '';
    let chatId: number | undefined;
    let lastProcessed = 0;

    xhr.onprogress = () => {
      const newData = xhr.responseText.substring(lastProcessed);
      lastProcessed = xhr.responseText.length;

      const lines = newData.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(parsed.error));
            return;
          }
          if (parsed.chatId !== undefined) {
            chatId = parsed.chatId;
          }
          if (parsed.text && onChunk) {
            fullResponse += parsed.text;
            onChunk(parsed.text);
          }
        } catch {
          // Unvollständige JSON-Zeile, ignorieren
        }
      }
    };

    xhr.onload = () => {
      if (xhr.status === 429) {
        reject(new Error('Du hast dein tägliches Fragelimit erreicht. Morgen kannst du wieder Fragen stellen!'));
        return;
      }
      resolve({ text: fullResponse, chatId });
    };
    xhr.onerror = () =>
      reject(new Error('Verbindung zum Server fehlgeschlagen. Bitte prüfe deine Internetverbindung.'));
    xhr.ontimeout = () =>
      reject(new Error('Zeitüberschreitung. Bitte versuche es erneut.'));
    xhr.timeout = 60000;

    xhr.send(JSON.stringify({ message: userMessage, history }));
  });
};

// Free-Tier: Nutzung abfragen
export interface UsageInfo {
  used: number;
  limit: number;
  remaining: number;
}

export const getUsage = async (): Promise<UsageInfo> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/usage`);
    if (!res.ok) return { used: 0, limit: 3, remaining: 3 };
    return await res.json();
  } catch {
    return { used: 0, limit: 3, remaining: 3 };
  }
};

export const submitRating = async (chatId: number, rating: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, rating }),
    });
    if (!response.ok) {
      throw new Error('Rating fehlgeschlagen');
    }
  } catch (error) {
    console.warn('Rating konnte nicht gesendet werden:', error);
    throw error;
  }
};
