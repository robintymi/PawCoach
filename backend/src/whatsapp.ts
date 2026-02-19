import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { addKnowledgeEntry, getKnowledge, deleteKnowledgeEntry } from './knowledge';
import { getTrainer, saveSystemPrompt } from './trainers';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Erlaubte Handynummer(n) – nur du darfst Wissen einspeisen
const ALLOWED_NUMBERS = (process.env.WHATSAPP_ALLOWED_NUMBERS || '')
  .split(',')
  .map(n => n.trim())
  .filter(Boolean);

// Twilio sendet Antwort als TwiML XML
const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const twiml = (msg: string) =>
  `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(msg)}</Message></Response>`;

// KI-Kategorisierung: Claude wählt die passende Kategorie
const CATEGORIES: { name: string; beschreibung: string }[] = [
  { name: 'Hundeverhalten & Körpersprache', beschreibung: 'Ethologie, Calming Signals, Ausdrucksverhalten, Kommunikation des Hundes, Stresszeichen, Beschwichtigungssignale' },
  { name: 'Lerntheorie & Trainingsmethoden', beschreibung: 'Operante/klassische Konditionierung, Clickertraining, positive Verstärkung, Markersignale, Trainingsaufbau, Timing' },
  { name: 'Leinenführigkeit & Freilauf', beschreibung: 'Leinentraining, lockere Leine, Schleppleine, Geschirr vs. Halsband, Freilauf-Management' },
  { name: 'Grundgehorsam & Signale', beschreibung: 'Sitz, Platz, Bleib, Fuß, Grundkommandos, Signalaufbau, Generalisierung' },
  { name: 'Rückruf & Impulskontrolle', beschreibung: 'Abruftraining, Impulskontrolle, Frustrationstoleranz, Abbruchsignal, Stopp-Signal' },
  { name: 'Welpen & Junghunde', beschreibung: 'Sozialisierungsphase, Welpenprägung, Stubenreinheit, Beißhemmung, Pubertät, altersgerechtes Training' },
  { name: 'Angst & Unsicherheit', beschreibung: 'Ängstliche Hunde, Geräuschempfindlichkeit, Silvester, Gewitter, Traumata, Desensibilisierung, Gegenkonditionierung' },
  { name: 'Aggression & Reaktivität', beschreibung: 'Leinenaggression, Ressourcenverteidigung, Territorialverhalten, reaktive Hunde, Beißvorfälle' },
  { name: 'Sozialverhalten & Hundebegegnungen', beschreibung: 'Hund-Hund-Interaktion, Spielverhalten, Gruppentraining, Mehrhundehaltung, Hundeplatz' },
  { name: 'Beschäftigung & Auslastung', beschreibung: 'Nasenarbeit, Mantrailing, Denkspiele, Futterspiele, Kopfarbeit, Schnüffelspiele, Apportieren' },
  { name: 'Ernährung & Gesundheit', beschreibung: 'BARF, Futterauswahl, Tierarztbesuche, Medical Training, Gewicht, Allergien, Zahnpflege' },
  { name: 'Mensch-Hund-Beziehung', beschreibung: 'Bindungsaufbau, Vertrauen, Teamwork, Beziehungspflege, Kommunikation Mensch-Hund' },
  { name: 'Alltagssituationen & Management', beschreibung: 'Autofahren, Besuch, Tierarzt, Restaurant, Büro, Kinder, Jogger, Radfahrer, Management im Alltag' },
  { name: 'Rassebesonderheiten', beschreibung: 'Rassespezifisches Verhalten, Hütehunde, Jagdhunde, Molosser, Terrier, rassbedingte Eigenschaften' },
  { name: 'Philosophie & Trainingsansatz', beschreibung: 'Eigene Haltung, Trainingsphilosophie, Ethik, Umgang mit Kunden, persönliche Überzeugungen zum Hundetraining' },
];

const CATEGORY_NAMES = CATEGORIES.map(c => c.name);

const categorize = async (text: string): Promise<string> => {
  const categoryList = CATEGORIES.map((c, i) =>
    `${i + 1}. ${c.name} – ${c.beschreibung}`
  ).join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `Du bist ein erfahrener Hundetrainer und sollst einen Wissenseintrag kategorisieren.

Lies den Text sorgfältig und überlege: Was ist das HAUPTTHEMA? Worum geht es im Kern?

Verfügbare Kategorien:
${categoryList}

Text des Eintrags:
"${text}"

Antworte AUSSCHLIESSLICH mit dem exakten Kategorienamen (z.B. "Angst & Unsicherheit"). Kein anderer Text.`,
      }],
    });

    const result = (response.content[0] as { text: string }).text.trim();
    return CATEGORY_NAMES.find(c => result.includes(c)) || 'Alltagssituationen & Management';
  } catch {
    return 'Alltagssituationen & Management';
  }
};

// Prompt-Generierung via WhatsApp (gleich wie Prompt Builder)
const generatePrompt = async (input: string): Promise<string> => {
  const trainer = await getTrainer();

  const metaPrompt = `Du bist Experte für das Erstellen von KI-System-Prompts für virtuelle Assistenten.

Ein Hundetrainer namens "${trainer.name}" (Schwerpunkt: ${trainer.specialty}) hat folgende Informationen gegeben:

---
${input.trim()}
---

Erstelle daraus einen präzisen System Prompt der:
1. Die KI instruiert, diesen Trainer EXAKT zu simulieren (erste Person, niemals als KI outen)
2. Den Kommunikationsstil und die Persönlichkeit des Trainers authentisch erfasst
3. Spezifische Methoden und Trainingsphilosophie einbettet
4. Auf Deutsch ist und sich natürlich anfühlt

Schreibe NUR den fertigen System Prompt. Beginne direkt mit "Du bist ${trainer.name}..."`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2048,
    messages: [{ role: 'user', content: metaPrompt }],
  });

  return (response.content[0] as { text: string }).text;
};

// POST /webhook/whatsapp – Twilio schickt eingehende Nachrichten hierher
router.post('/whatsapp', async (req: Request, res: Response) => {
  const from = req.body.From || '';   // z.B. "whatsapp:+491234567890"
  const body = (req.body.Body || '').trim();

  // Sicherheit: nur erlaubte Nummern
  if (ALLOWED_NUMBERS.length > 0) {
    const number = from.replace('whatsapp:', '');
    if (!ALLOWED_NUMBERS.includes(number)) {
      res.type('text/xml').send(twiml('Nicht autorisiert.'));
      return;
    }
  }

  if (!body) {
    res.type('text/xml').send(twiml('Leere Nachricht.'));
    return;
  }

  try {
    // Befehl: Liste
    if (body.toLowerCase() === 'liste') {
      const entries = await getKnowledge();
      if (entries.length === 0) {
        res.type('text/xml').send(twiml('Noch keine Einträge vorhanden.'));
        return;
      }
      const list = entries.slice(-10).map((e, i) =>
        `${e.id}. [${e.category}] ${e.content.substring(0, 60)}${e.content.length > 60 ? '...' : ''}`
      ).join('\n');
      res.type('text/xml').send(twiml(`Letzte Einträge:\n${list}`));
      return;
    }

    // Befehl: Löschen
    if (body.toLowerCase().startsWith('löschen:') || body.toLowerCase().startsWith('loeschen:')) {
      const id = parseInt(body.split(':')[1]?.trim());
      if (isNaN(id)) {
        res.type('text/xml').send(twiml('Format: Löschen: [ID]'));
        return;
      }
      await deleteKnowledgeEntry(id);
      res.type('text/xml').send(twiml(`Eintrag ${id} gelöscht.`));
      return;
    }

    // Befehl: Prompt generieren
    if (body.toLowerCase().startsWith('prompt:')) {
      const input = body.substring(7).trim();
      if (input.length < 30) {
        res.type('text/xml').send(twiml('Bitte mehr Text (min. 30 Zeichen) nach "Prompt:" schreiben.'));
        return;
      }
      const prompt = await generatePrompt(input);
      await saveSystemPrompt(prompt);
      const preview = prompt.substring(0, 300) + '...';
      res.type('text/xml').send(twiml(`System-Prompt gespeichert!\n\nVorschau:\n${preview}`));
      return;
    }

    // Befehl: Hilfe
    if (body.toLowerCase() === 'hilfe' || body.toLowerCase() === 'help') {
      res.type('text/xml').send(twiml(
        `PawCoach Befehle:\n\n` +
        `• Einfach schreiben → wird als Wissen gespeichert\n` +
        `• "Prompt: [Text]" → generiert System-Prompt\n` +
        `• "Liste" → zeigt letzte Einträge\n` +
        `• "Löschen: [ID]" → löscht Eintrag\n` +
        `• "Hilfe" → diese Info`
      ));
      return;
    }

    // Standard: Wissen speichern mit KI-Kategorisierung
    const category = await categorize(body);
    await addKnowledgeEntry(category, body);
    const count = (await getKnowledge()).length;

    res.type('text/xml').send(twiml(
      `Gespeichert unter: ${category}\n(${count} Einträge gesamt)`
    ));

  } catch (error) {
    console.error('WhatsApp Webhook Fehler:', error);
    res.type('text/xml').send(twiml('Fehler beim Verarbeiten.'));
  }
});

export default router;
