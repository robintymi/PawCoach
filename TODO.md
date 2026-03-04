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

---

## DU musst machen (Robin)

### Jetzt:
- [ ] **Wissen einspeisen** – Per WhatsApp persönliches Trainerwissen einpflegen
  - Schreib einfach an die Twilio-Nummer, wird automatisch kategorisiert
  - Tipp: Pro Nachricht ein klares Thema, nicht zu viel mischen
  - Ziel: mindestens 30-50 Einträge für gute Chat-Qualität
- [ ] **System Prompt generieren** – Wenn genug Wissen drin ist:
  - Per WhatsApp: `Prompt: Ich bin [Name], Hundetrainer mit Schwerpunkt [X]. Mein Stil ist [Y]...`
  - Oder über Admin-Panel: pawcoach-production.up.railway.app/admin/login

### Danach:
- [ ] **App testen** – Expo Go auf Handy, Chat-Qualität prüfen
- [ ] **App-Icon** – Eigenes Logo erstellen/erstellen lassen (1024x1024 PNG)
  - Ablegen in `PawCoach/assets/icon.png` + `adaptive-icon.png`
- [ ] **Apple Developer Account** – developer.apple.com (99$/Jahr)
- [ ] **Google Play Account** – play.google.com/console (25$ einmalig)
- [ ] **Supabase wach halten** – Free Tier pausiert nach 7 Tagen Inaktivität!
  - Option A: Regelmäßig nutzen
  - Option B: Upgrade auf Pro ($25/Monat)

---

## Nächste technische Schritte (Claude macht)

- [ ] Rate-Limiting im Backend (Schutz vor Missbrauch)
- [ ] Supabase RLS absichern (aktuell allow-all)
- [ ] Chat-Verlauf in App speichern (AsyncStorage)
- [ ] Offline-Erkennung in der App
- [ ] User-Auth (Supabase Auth) für Abo-Modell
- [ ] Abo-System (RevenueCat für iOS/Android)

---

## Store-Veröffentlichung

- [ ] Datenschutzerklärung schreiben
- [ ] Nutzungsbedingungen schreiben
- [ ] App-Beschreibung + Screenshots
- [ ] `eas build --platform all`
- [ ] Beta-Test via TestFlight / Internal Track
- [ ] Store-Einreichung

---

_Zuletzt aktualisiert: 2026-03-04_
