# TODO – PawCoach 🐾

---

## Erledigt

- [x] Express Backend + SSE Streaming Chat
- [x] Railway Deployment (pawcoach-production.up.railway.app)
- [x] Supabase Datenbank (Knowledge + System Prompts)
- [x] WhatsApp-Integration (Twilio Sandbox, 15 Kategorien, Haiku-Kategorisierung)
- [x] Selektiver Wissensabruf (Haiku wählt relevante Kategorien pro Frage)
- [x] TwiML XML Escaping Fix
- [x] Mobile App auf Backend-API umgestellt (kein API-Key mehr in App)
- [x] EAS Build-Config (eas.json) + Bundle Identifiers
- [x] Wissensdatenbank komplett – 163 Einträge in 15 Kategorien
- [x] Analytics-System (Backend + Admin-Dashboard + Supabase-Tabelle)
- [x] **Security: Rate-Limiting** – 20 Anfragen/Min pro IP auf /api/chat
- [x] **Security: Analytics-Auth** – /api/analytics/* hinter Admin-Login
- [x] **Security: CORS** – Konfigurierbar via CORS_ORIGINS Env Var
- [x] **Security: WhatsApp Signatur** – Twilio Request Signature Validierung
- [x] **Security: Input-Sanitization** – XSS-Schutz, Input-Länge begrenzt
- [x] **Security: Timeout-Handling** – 60s Timeout für API-Calls
- [x] **App: Chat-Verlauf** – AsyncStorage Persistierung (letzte 50 Nachrichten)
- [x] **App: Offline-Erkennung** – Banner bei fehlender Verbindung
- [x] **App: Bewertungs-UI** – Sterne-Rating nach jeder Antwort
- [x] **App: Einstellungen** – Modal mit Verlauf löschen, Feedback, Version
- [x] **Web: Bewertungs-UI** – Sterne-Rating nach jeder Antwort
- [x] **Web: Chat-Verlauf** – localStorage mit "Neuer Chat" Button
- [x] **Admin: Wissen-Suche** – Textsuche + Kategorie-Filter im Dashboard
- [x] **Admin: Analytics-Filter** – Zeitraum (7/14/30 Tage) + CSV-Export
- [x] **Legal: Datenschutzerklärung** – DSGVO-konform unter /datenschutz.html
- [x] **Legal: Nutzungsbedingungen** – Unter /nutzungsbedingungen.html
- [x] **Cleanup** – Import-Scripts in scripts/, unused Components entfernt

---

## DU musst machen (Robin)

### Sofort:
- [ ] **API-Key rotieren** – Der alte Key war im Git-Verlauf sichtbar!
  - console.anthropic.com → neuen Key generieren
  - Alten Key deaktivieren
  - Neuen Key in Railway Environment Variables setzen
- [ ] **Admin-Passwort ändern** – In Railway Env Var `ADMIN_PASSWORD` setzen
- [ ] **Session-Secret ändern** – In Railway Env Var `SESSION_SECRET` setzen
- [ ] **WhatsApp ALLOWED_NUMBERS** – Deine Nummer in Railway Env Var setzen
- [ ] **Datenschutz ausfüllen** – Platzhalter in /datenschutz.html ersetzen:
  - `[Name des Betreibers]` → Dein Name/Firma
  - `[E-Mail-Adresse]` → Deine Kontakt-Email
- [ ] Optional: `CORS_ORIGINS` Env Var setzen (z.B. `https://pawcoach.de,https://pawcoach-production.up.railway.app`)

### Danach:
- [ ] **App testen** – Expo Go auf Handy, Chat + Rating + Offline testen
- [ ] **App-Icon** – 1024x1024 PNG → `PawCoach/assets/icon.png`
- [ ] **Apple Developer Account** – developer.apple.com (99$/Jahr)
- [ ] **Google Play Account** – play.google.com/console (25$ einmalig)
- [ ] **Supabase wach halten** – Free Tier pausiert nach 7 Tagen

---

## Nächste technische Schritte

### Monetarisierung:
- [ ] User-Authentifizierung (Supabase Auth)
- [ ] Abo-System (RevenueCat für iOS/Android)
- [ ] Nutzungslimits (Free-Tier vs. Premium)
- [ ] Multi-Trainer Support

### Store-Veröffentlichung:
- [ ] App-Beschreibung für Stores
- [ ] Screenshots erstellen
- [ ] `eas build --platform all`
- [ ] Beta-Test (TestFlight / Internal Track)
- [ ] Store-Einreichung

---

## Nice-to-Have (Zukunft)

- [ ] Push-Benachrichtigungen
- [ ] Spracheingabe/Sprachausgabe
- [ ] Bilder-Support im Chat
- [ ] Markdown-Formatierung in Antworten
- [ ] Konversationsliste (mehrere Chats)
- [ ] Prompt-Versionshistorie
- [ ] Supabase RLS absichern

---

## Aktueller Projekt-Status

| Bereich | Status | Bewertung |
|---------|--------|-----------|
| Backend API | Funktioniert + abgesichert | 9/10 |
| Wissensdatenbank | Komplett (163 Einträge) | 9/10 |
| Mobile App | Vollständig (Verlauf, Rating, Offline, Settings) | 8/10 |
| Web-Chat | Vollständig (Rating, Verlauf) | 9/10 |
| Admin-Panel | Vollständig (Suche, Analytics, Export) | 9/10 |
| WhatsApp | Funktioniert + Signatur-Check | 8/10 |
| Analytics | Live mit Zeitfilter + CSV | 9/10 |
| Sicherheit | Grundschutz implementiert | 6/10 |
| Legal | Datenschutz + Nutzungsbedingungen | 8/10 |
| **Production-Ready** | **Fast** | **7/10** |

> **Noch nötig für Go-Live:** API-Key rotieren, Admin-PW + Session-Secret ändern, Datenschutz-Platzhalter ausfüllen

---

_Zuletzt aktualisiert: 2026-03-04_
