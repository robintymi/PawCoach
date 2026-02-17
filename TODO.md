# TODO – PawCoach 🐾

Entwicklungs-Roadmap und offene Aufgaben.

---

## 🔴 Sofort (vor erstem Test)

- [ ] **Trainer 1 profil ausfüllen** – `PawCoach/src/constants/trainers.ts`
  - Echten Namen eintragen
  - Trainingsphilosophie beschreiben
  - Typische Methoden und Phrasen einfügen
  - Spezialgebiete definieren

- [ ] **Trainer 2 Profil ausfüllen** – `PawCoach/src/constants/trainers.ts`
  - Echten Namen eintragen
  - Trainingsphilosophie beschreiben
  - Typische Methoden und Phrasen einfügen

- [ ] **API-Key einrichten**
  ```bash
  cd PawCoach
  cp .env.example .env
  # EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-... eintragen
  ```

- [ ] **Expo Go App installieren** auf Test-Handy (iOS oder Android)

---

## 🟡 Phase 1 – MVP (erste funktionierende Version)

- [ ] App auf echtem Gerät testen (iOS + Android)
- [ ] Trainer-Antwortqualität prüfen und System Prompts verfeinern
- [ ] Fehlerbehandlung testen (kein Internet, falscher API-Key)
- [ ] App-Icon anpassen (eigenes Logo in `assets/`)
- [ ] Splash Screen anpassen
- [ ] App-Name in `app.json` finalisieren

---

## 🟠 Phase 2 – Backend & Sicherheit

- [ ] **Backend deployen** (z.B. Railway, Render, Fly.io)
  ```bash
  cd backend
  npm install
  # ANTHROPIC_API_KEY im Hosting-Dashboard setzen
  ```
- [ ] Mobile App auf Backend-URL umstellen (statt direktem Claude-Aufruf)
- [ ] `dangerouslyAllowBrowser: true` aus `claudeApi.ts` entfernen
- [ ] Rate-Limiting im Backend hinzufügen (zu viele Anfragen pro User)
- [ ] Einfache Authentifizierung für API-Endpunkt

---

## 🟢 Phase 3 – Features & UX

- [ ] **Chat-Verlauf speichern** (AsyncStorage – Gespräche bleiben erhalten)
- [ ] **Mehrere Chat-Sessions** (neues Gespräch starten ohne App-Restart)
- [ ] **Trainer-Profilseite** (Foto, Bio, Kontaktdaten)
- [ ] **Feedback-Funktion** (Daumen hoch/runter für Antworten)
- [ ] **Offline-Meldung** wenn kein Internet vorhanden
- [ ] **Dark Mode** Support
- [ ] **Push-Notifications** für neue Trainer-Tipps
- [ ] Mehrsprachigkeit (DE / EN)

---

## 🔵 Phase 4 – Veröffentlichung

- [ ] **App Store Account** anlegen (Apple Developer Program – 99$/Jahr)
- [ ] **Google Play Account** anlegen (25$ einmalig)
- [ ] Datenschutzerklärung schreiben
- [ ] Nutzungsbedingungen schreiben
- [ ] App-Beschreibung für die Stores
- [ ] Screenshots für App Store / Play Store
- [ ] **EAS Build** einrichten für Store-Builds:
  ```bash
  npm install -g eas-cli
  eas build --platform all
  ```
- [ ] Beta-Test mit Expo TestFlight / Internal Track

---

## 💡 Ideen (Backlog)

- Buchungssystem direkt in der App (Termin beim echten Trainer buchen)
- Video-Tipps der Trainer einbetten
- Community-Forum / Q&A
- Hundetagebuch (Fortschritt dokumentieren)
- Rassen-spezifische Tipps
- Notfall-Hotline Button

---

## 🐛 Bekannte Probleme

> Hier bekannte Bugs eintragen

| # | Problem | Status |
|---|---|---|
| – | noch keine Bugs gemeldet | – |

---

_Zuletzt aktualisiert: 2026-02-17_
