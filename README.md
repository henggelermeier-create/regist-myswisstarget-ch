# mySwissTarget Registrierung

Separate Registrierungs-App für `registrierung.myswisstarget.ch`.

## Zweck
- offene Schiessanlässe vor Login anzeigen
- Verein mit SSV Vereinsnummer und eigener SSV Lizenznummer verknüpfen
- Anmeldung zum Schiessanlass bearbeiten
- Schützen aus SAT Admin übernehmen
- Rangierung mit Schützenhaus, Scheiben und freier Kapazität anzeigen
- Gruppeneinteilung optional führen
- Anmeldung definitiv absenden

## Start
```bash
npm install
npm run dev
```

## Docker
```bash
docker compose up -d --build
```

## Wichtige Integrationspunkte für Live-Betrieb
Diese ZIP enthält den vollständigen Frontend-Ablauf und vorbereitete API-Flächen.
Für den echten Live-Betrieb müssen angebunden werden:
- gemeinsame Login-Basis der Hauptapp
- SAT-Admin-Prüfung für Vereinsnummer und Lizenznummer
- produktive Registrierungstabellen in derselben Datenbank
- Übergabe an die Hauptapp nach definitiver Anmeldung
- Anlassfreigabe, Schützenhaus, Scheiben und Rangierungsdaten aus der Hauptapp
