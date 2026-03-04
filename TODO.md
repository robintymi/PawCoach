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
- [x] **Wissensdatenbank komplett** – 163 Einträge in 15 Kategorien
  - Alle 20 Sektionen der Wissenslandkarte abgedeckt
  - Trainingsmethoden, Verhaltensprobleme, Rassen, Gesundheit, Welpen, Spezialtraining, Alltag, Tierschutz, Senioren, Equipment, Recht, u.v.m.
- [x] **Analytics-System** – Code fertig (Backend + Admin-Dashboard)
  - Chat-Logging mit Quelle (web/app/whatsapp)
  - Sternebewertung (1-5) + Freitext-Feedback
  - Admin-Dashboard: /admin/analytics.html
  - API-Endpunkte: /api/analytics/summary, /questions, /low-rated
  - Tagesstatistiken, Kategorie-Nutzung, schlecht bewertete Antworten

---

## DU musst machen (Robin)

### Jetzt:
- [ ] **Analytics-Tabelle in Supabase erstellen** – SQL im Supabase SQL Editor ausführen (siehe unten)
- [ ] **System Prompt generieren** – Wenn noch nicht geschehen:
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

### SQL für Analytics-Tabelle:
```sql
CREATE TABLE IF NOT EXISTS chat_analytics (
  id BIGSERIAL PRIMARY KEY,
  user_question TEXT NOT NULL,
  assistant_response TEXT,
  categories_used TEXT[] DEFAULT '{}',
  response_length INTEGER DEFAULT 0,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  source VARCHAR(20) DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_analytics_created ON chat_analytics(created_at DESC);
CREATE INDEX idx_chat_analytics_rating ON chat_analytics(rating) WHERE rating IS NOT NULL;
CREATE INDEX idx_chat_analytics_source ON chat_analytics(source);

ALTER TABLE chat_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON chat_analytics FOR ALL USING (true) WITH CHECK (true);
```

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
