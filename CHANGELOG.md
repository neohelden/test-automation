# CHANGELOG

## v0.3.0

> Separate Validierung der speak Befehle und kleinere Fixes: [#2](https://github.com/neohelden/flow-testing-manual/pull/2)

- Fix: Der fuzzy search testet genau den gesuchten Attribut und nicht ob der gegebene Text allgemein Vorkommt
- Fix: Rename from `elementNumber` to `position`
- Feat: `says(text, [contentType])` Funktion um auf speak Attribut zu testen

## v0.2.0

> Vereinfachung des Particle Zustandsmanagement: Siehe [#1](https://github.com/neohelden/flow-testing-manual/pull/1)

- Feat: Nutzung eines Globalen `particle` Objekts
- Feat: Optionale Möglichkeit das Particle nach einer Anfrage zu verarbeiten
- BREAKING CHANGE:
  - Entfernen des Particles als Parameter der meisten Test-Hilfsfunktionen(Siehe API-Docs)
  - `isContentType` und `isDirectiveType` haben die Möglichkeit ein Particle als optionalen Parameter zu bekommen

## v0.1.0

- Feat: API Design
  - Anfragen mittels NEAP-API erstellen
  - Particle auswerten mittels Hilfsfunktionen
- Feat: Test und pre-Request Postman Templates
- Feat: Dokumentation
- Feat: Versionierung mittels `git tags`
