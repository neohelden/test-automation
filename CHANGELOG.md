# CHANGELOG

## v0.2.0

1. Vereinfachung des Particle Zustandsmanagement: Siehe [#1](https://github.com/neohelden/flow-testing-manual/pull/1)
   - Nutzung eines Globalen `particle` Objekts
   - Optionale Möglichkeit das Particle nach einer Anfrage zu verarbeiten
   - BREAKING CHANGE:
     - Entfernen des Particles als Parameter der meisten Test-Hilfsfunktionen(Siehe API-Docs)
     - `isContentType` und `isDirectiveType` haben die Möglichkeit ein Particle als optionalen Parameter zu bekommen

## v0.1.0

1. API Design
   - Anfragen mittels NEAP-API erstellen
   - Particle auswerten mittels Hilfsfunktionen
2. Test und pre-Request Postman Templates
3. Dokumentation
4. Versionierung mittels `git tags`