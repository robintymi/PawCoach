# PawCoach 🐾

KI-gestützte Hundetrainer-App – Kunden können ihre Fragen stellen und erhalten Antworten im Stil deiner echten Hundetrainer, powered by Claude AI.

## Projektstruktur

```
DogtrainerAi/
├── PawCoach/          # Mobile App (Expo / React Native)
│   ├── src/
│   │   ├── screens/   # App-Screens (Chat)
│   │   ├── components/# UI-Komponenten
│   │   ├── services/  # Claude API Integration
│   │   ├── constants/ # Trainer-Profile & System Prompts
│   │   └── types/     # TypeScript Types
│   └── App.tsx
└── backend/           # Node.js Backend (für Produktion)
    └── src/
        └── index.ts
```

## Setup

### 1. Trainer-Profile anpassen

Öffne `PawCoach/src/constants/trainers.ts` und füge die echten Daten deiner Trainer ein:
- Name und Spezialgebiet
- Trainingsphilosophie und Methoden
- Typische Aussagen und Kommunikationsstil

Je mehr Details du einfügst, desto authentischer klingen die Antworten!

### 2. Claude API Key einrichten

```bash
cp PawCoach/.env.example PawCoach/.env
# Dann deinen API Key eintragen: https://console.anthropic.com/
```

### 3. App starten

```bash
cd PawCoach
npm install
npm start
```

Dann Expo Go App auf dem Handy installieren und QR-Code scannen.

### 4. Für Produktion: Backend nutzen

```bash
cd backend
npm install
cp .env.example .env  # API Key eintragen
npm run dev
```

## Wie funktioniert es?

1. **System Prompt** – Jeder Trainer hat ein detailliertes Profil, das Claude instruiert, genau wie der echte Trainer zu antworten
2. **Chat** – Kunden stellen Fragen in der App
3. **Claude AI** – Verarbeitet die Frage mit dem Trainer-Profil und gibt eine passende Antwort
4. **Streaming** – Antworten erscheinen live, Wort für Wort

## Sicherheitshinweis

Für die Produktion den API-Key **niemals** direkt in der App speichern. Das `backend/` Verzeichnis enthält einen sicheren Proxy-Server, der den Key serverseitig hält.
