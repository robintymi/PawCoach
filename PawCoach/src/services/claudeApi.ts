import { API_BASE_URL } from '../config';
import { Message, Trainer } from '../types';

// Chat läuft jetzt über das Backend – kein API-Key in der App nötig.
// Das Backend nutzt den System Prompt + Wissen aus Supabase automatisch.

export const sendMessageToClaude = async (
  userMessage: string,
  conversationHistory: Message[],
  _trainer: Trainer,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const history = conversationHistory
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({ role: msg.role, content: msg.content }));

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/chat`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let fullResponse = '';
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
          if (parsed.text && onChunk) {
            fullResponse += parsed.text;
            onChunk(parsed.text);
          }
        } catch {
          // Unvollständige JSON-Zeile, ignorieren
        }
      }
    };

    xhr.onload = () => resolve(fullResponse);
    xhr.onerror = () =>
      reject(new Error('Verbindung zum Server fehlgeschlagen. Bitte prüfe deine Internetverbindung.'));
    xhr.ontimeout = () =>
      reject(new Error('Zeitüberschreitung. Bitte versuche es erneut.'));
    xhr.timeout = 60000;

    xhr.send(JSON.stringify({ message: userMessage, history }));
  });
};
