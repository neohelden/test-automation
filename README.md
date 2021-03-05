# flow-testing-manual mit Postman 🧪

> Beschreibung und Vorlagen für das Flow testing mit Postman

Mithilfe der [NEAP-API](https://docs.neohelden.com/neap-api-docs/ref), kann man tests auf den Flows ausführen.  
Dafür wird [Postman](https://neohelden.postman.co/) genutzt.

- [flow-testing-manual mit Postman 🧪](#flow-testing-manual-mit-postman-)
  - [Test auf Postman erstellen](#test-auf-postman-erstellen)
  - [Test cases erstellen](#test-cases-erstellen)
    - [Flow request machen](#flow-request-machen)
      - [1. Messages](#1-messages)
      - [2. Reply](#2-reply)
      - [3. Action](#3-action)
    - [Flow response testen](#flow-response-testen)
  - [Nützliche links 🔗](#nützliche-links-)

## Test auf Postman erstellen

Um einen neuen Test anlegen:

1. In der `NEAP-Testing` collection eine neue Request erstellen: `New -> Request`
2. Hier `POST` als HTTP Methode auswählen
3. Ziel-URL ergänzen: `https://[WORSPACE].neohelden.com/auth`
4. Wenn es kein `anonymous` workspace ist, müssen die Anmeldedaten hinzugefügt werden. Dafür im Workspace ein neuen App-User erstellen und in Postman unter dem `Body` tab:

```json
{
    "username": "[USERNAME]",
    "password": "[PASSWORD]"
}
```

5. Unter `Tests` den Inhalt der [Testvorlage](./test-template.js)(In `test-template.js` Datei).
6. Werte in Vorlage abändern und Tests hinzufügen

## Test cases erstellen

### Flow request machen

Es gibt 3 Möglichkeiten Anfragen zu machen:

#### 1. Messages

> Messages können genutzt werden um Bspw. Intents auszulösen, commands zu triggern,...

```js
const particle = await message('Ein Intent auslösen')
...
const particle = await message('/commandAuslösen')
```

#### 2. Reply

> Mit `reply()` kann man mit replies 

```js
const particle = await reply('Text der als reply kommen soll')
```

#### 3. Action

> Die Action kann Bspw. für den Handshake oder um mit Adaptive Cards zu interagieren genutzt werden

```js
const particle = await action('Handshake')
...
const particle = await action('ButtonInAdaptiveCard')
```

### Flow response testen

Für die Testcases kann man alle response Attribute des Particles nutzen. Diese kann man im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) nachlesen. Oder auch in den [docs](https://docs.neohelden.com/de/particle).
## Nützliche links 🔗

- <https://docs.neohelden.com/neap-api-docs/ref>
- <https://docs.neohelden.com/de/neap-api-http>
- <https://docs.neohelden.com/de>