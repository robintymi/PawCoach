# AI Coding Rules – PawCoach 🐾

Regeln für KI-Assistenten (Claude, Copilot, etc.) beim Arbeiten an diesem Projekt.

---

## Sprache & Kommunikation

- Code-Kommentare auf **Deutsch**
- Variablen- und Funktionsnamen auf **Englisch**
- Commit-Messages auf **Englisch**
- Antworten an den Entwickler auf **Deutsch**

---

## Tech Stack (nicht ändern ohne Rückfrage)

| Bereich | Technologie |
|---|---|
| Mobile App | Expo (React Native) + TypeScript |
| KI | Anthropic Claude (`claude-sonnet-4-5-20250929`) |
| Backend | Node.js + Express + TypeScript |
| Styling | React Native StyleSheet (kein Tailwind, kein Styled Components) |

---

## Code-Konventionen

### TypeScript
- Immer strikte Typen verwenden – kein `any`
- Interfaces für Props und Datenstrukturen (siehe `src/types/index.ts`)
- Keine `var`, immer `const` oder `let`

### React Native / Expo
- Funktionale Komponenten mit `React.FC<Props>`
- Styles immer am Ende der Datei mit `StyleSheet.create()`
- `SafeAreaView` für alle Screen-Komponenten verwenden
- Keine inline-Styles

### Dateistruktur
```
src/
├── components/   # Wiederverwendbare UI-Komponenten (keine Logik)
├── screens/      # Screen-Komponenten (enthalten Logik)
├── services/     # API-Aufrufe und externe Dienste
├── constants/    # Statische Daten (Trainer-Profile, Farben, etc.)
└── types/        # Alle TypeScript-Typen und Interfaces
```

### Komponenten-Regeln
- Eine Komponente pro Datei
- Props-Interface direkt über der Komponente definieren
- Callbacks immer mit `useCallback` wrappen
- State-Updates nie direkt mutieren

---

## Claude API Regeln

- Modell: **`claude-sonnet-4-5-20250929`** (nicht downgraden)
- `max_tokens`: maximal **1024** für Chat-Antworten
- Immer **Streaming** verwenden für bessere UX (`onChunk` Callback)
- System Prompt kommt **ausschließlich** aus `constants/trainers.ts`
- API-Key **niemals** hardcoden – immer über `process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY`
- In Produktion: API-Aufrufe **nur** über das Backend (`/backend`) machen

---

## Sicherheitsregeln

- `.env` ist in `.gitignore` – niemals committen
- API-Keys nie in Code, Kommentare oder Logs schreiben
- `dangerouslyAllowBrowser: true` nur für Entwicklung – in Produktion entfernen
- User-Eingaben validieren bevor sie an Claude gesendet werden
- Max. Nachrichtenlänge: 500 Zeichen (bereits im TextInput gesetzt)

---

## Trainer-Profile

- Trainer-Profile in `PawCoach/src/constants/trainers.ts` **und** `backend/src/trainers.ts`
- System Prompts so detailliert wie möglich (Methoden, Sprache, Phrasen)
- Beide Dateien synchron halten wenn Änderungen gemacht werden
- Keine KI-spezifische Sprache im System Prompt – immer aus Trainer-Perspektive schreiben

---

## Was KI NICHT tun soll

- Keine unnötigen Dependencies hinzufügen
- Keine Abstraktion für einmalige Operationen erstellen
- Kein `console.log` in Production-Code lassen
- Kein Code kommentieren der selbsterklärend ist
- Nicht refactoren was nicht kaputt ist
- Kein `.env` oder Secrets committen
- Keine force-pushes auf `master`/`main`
