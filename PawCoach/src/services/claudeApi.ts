import Anthropic from '@anthropic-ai/sdk';
import { Message, Trainer } from '../types';

// WICHTIG: In Produktion über ein Backend proxyen, niemals den API-Key
// direkt in der App speichern! Siehe backend/ Ordner.
const getApiKey = (): string => {
  // Für Entwicklung: In app.config.js oder .env setzen
  // In Produktion: Über Backend-API abrufen
  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('EXPO_PUBLIC_ANTHROPIC_API_KEY ist nicht gesetzt!');
  }
  return apiKey;
};

export const sendMessageToClaude = async (
  userMessage: string,
  conversationHistory: Message[],
  trainer: Trainer,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const client = new Anthropic({
    apiKey: getApiKey(),
    dangerouslyAllowBrowser: true, // Nur für Dev - in Prod über Backend!
  });

  // Conversation history für Claude aufbereiten
  const messages = conversationHistory
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

  // Aktuelle Nachricht hinzufügen
  messages.push({ role: 'user', content: userMessage });

  try {
    if (onChunk) {
      // Streaming-Modus für bessere UX
      let fullResponse = '';
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        system: trainer.systemPrompt,
        messages,
      });

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          fullResponse += chunk.delta.text;
          onChunk(chunk.delta.text);
        }
      }
      return fullResponse;
    } else {
      // Normaler Modus
      const response = await client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        system: trainer.systemPrompt,
        messages,
      });

      return response.content[0].type === 'text' ? response.content[0].text : '';
    }
  } catch (error) {
    console.error('Claude API Fehler:', error);
    throw new Error('Verbindung zum Hundetrainer fehlgeschlagen. Bitte versuche es erneut.');
  }
};
