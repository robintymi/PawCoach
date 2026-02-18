# TODO – PawCoach 🐾

Entwicklungs-Roadmap und offene Aufgaben.

---

## 🔴 Sofort (vor erstem Test)

- [ ] **Trainer-Profil ausfüllen** – Namen + Spezialgebiet in `backend/src/trainers.ts` eintragen

- [ ] **Prompt Builder nutzen** – Admin → Prompt Builder → Wissen und Persönlichkeit einspeisen
  - Öffne: http://localhost:3000/admin/login (Passwort: `admin123`)
  - Freestyle, Situationen oder Interview-Modus wählen
  - Claude generiert daraus den System-Prompt

- [ ] **Chat testen** – http://localhost:3000/ → Fragen stellen und Qualität prüfen

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

## 📱 WhatsApp-Integration – Wissen per WhatsApp einspeisen

**Ziel:** Trainer schreibt unterwegs per WhatsApp → wird automatisch als Wissenseintrag gespeichert.

### Schritte:

- [ ] **1. Backend deployen** (Voraussetzung – öffentliche URL nötig für Webhooks)
  - Railway.app empfohlen: kostenloses Tier, einfaches Setup
  - `railway login` → `railway init` → `railway up`
  - Umgebungsvariablen im Dashboard setzen (`ANTHROPIC_API_KEY`, `SESSION_SECRET`)

- [ ] **2. Twilio Account anlegen**
  - Kostenlos auf [twilio.com](https://twilio.com) registrieren
  - WhatsApp Sandbox aktivieren (kein Business-Account nötig zum Testen)
  - Später: echte WhatsApp-Nummer kaufen (~1$/Monat)

- [ ] **3. Twilio npm-Paket installieren**
  ```bash
  cd backend && npm install twilio
  ```

- [ ] **4. Webhook-Endpunkt im Backend bauen** (`backend/src/whatsapp.ts`)
  - `POST /webhook/whatsapp` empfängt eingehende Nachrichten
  - Nur Nachrichten von deiner Handynummer werden akzeptiert (Sicherheit)
  - Nachricht wird automatisch als Wissenseintrag gespeichert
  - Bestätigungs-Reply: "✅ Gespeichert unter Kategorie: Methoden & Techniken"

- [ ] **5. KI-Kategorisierung** – Claude analysiert deine Nachricht und wählt passende Kategorie
  - Einfaches Format: einfach drauflosschreiben
  - Oder mit Prefix: `"Leine: Wenn der Hund zieht..."` → Kategorie wird erkannt

- [ ] **6. Webhook-URL in Twilio eintragen**
  - Twilio Dashboard → WhatsApp → Webhook URL: `https://deine-app.railway.app/webhook/whatsapp`

- [ ] **7. Testen**
  - WhatsApp an Twilio-Nummer: `"join [sandbox-code]"` (einmalig)
  - Erste Nachricht schicken → Wissenseintrag im Dashboard prüfen

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
