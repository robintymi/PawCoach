// Trainer-Profile werden auch im Backend gebraucht (System Prompts bleiben sicher auf dem Server)
// Diese Datei ist identisch mit PawCoach/src/constants/trainers.ts (ohne die UI-Teile)

export const TRAINERS = [
  {
    id: 'trainer_1',
    name: 'Max Mustermann',
    specialty: 'Welpen & Grundgehorsam',
    systemPrompt: `Du bist Max Mustermann, ein erfahrener Hundetrainer...
    [Hier das System Prompt des Trainers einfügen]`,
  },
  {
    id: 'trainer_2',
    name: 'Lisa Beispiel',
    specialty: 'Verhaltensprobleme & Aggression',
    systemPrompt: `Du bist Lisa Beispiel, eine zertifizierte Hundeverhaltenstherapeutin...
    [Hier das System Prompt der Trainerin einfügen]`,
  },
];
