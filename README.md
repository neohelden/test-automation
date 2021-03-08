# flow-testing-manual mit Postman 🧪

> Beschreibung und Vorlagen für das Flow testing mit Postman

Mithilfe der [NEAP-API](https://docs.neohelden.com/neap-api-docs/ref), kann man tests auf den Flows ausführen.  
Dafür wird [Postman](https://neohelden.postman.co/) 👨‍🚀 genutzt.

- [flow-testing-manual mit Postman 🧪](#flow-testing-manual-mit-postman-)
  - [Test auf Postman erstellen](#test-auf-postman-erstellen)
  - [Test cases erstellen](#test-cases-erstellen)
    - [Flow request machen](#flow-request-machen)
      - [1. Messages](#1-messages)
      - [2. Reply](#2-reply)
      - [3. Action](#3-action)
    - [Particle response auswerten](#particle-response-auswerten)
      - [Neo testing Helfer](#neo-testing-helfer)
      - [Ausführliche Helfer Dokumentation 📖](#ausführliche-helfer-dokumentation-)
  - [Nützliche links 🔗](#nützliche-links-)
  - [Contribute 😄 👨‍💻 👩‍💻](#contribute---)

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

Ein Test besteht aus 2 Bestandteile:

1. Anfrage einer `request`
2. Auswerten des ausgewerteten `particles`

### Flow request machen

Es gibt 3 Möglichkeiten Anfragen zu machen:

#### 1. Messages

> Messages können genutzt werden um Bspw. Intents auszulösen, commands zu triggern, auf re-prompts zu antworten, ...

```js
const particle = await message('Ein Intent auslösen')
...
const particle = await message('/commandAuslösen')
```

#### 2. Reply

> Mit `reply()` kann man mit replies antworten

```js
const particle = await reply("Text der als reply kommen soll")
```

#### 3. Action

> Die Action kann man Bspw. für den Handshake nutzen oder um mit Adaptive Cards zu interagieren.

```js
const particle = await action('Handshake')
...
const particle = await action('ButtonInAdaptiveCard')
```

### Particle response auswerten

Um das erwartete Particle auszuwerten,kann man alle response Attribute des Particles nutzen. Diese kann man im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) nachlesen. Oder auch in den [docs](https://docs.neohelden.com/de/particle).

Generell, kann man folgendermaßen jeden Eintrag im Particle Testen:

```js
pm.test("[TEST-BESCHREIBUNG]", () => {
  pm.expect(particle.response[RESPONSE_PART]).to.contain("[ERWARTERTER-INHALT]")
})
```

Siehe die [Postman Dokumentation](https://learning.postman.com/docs/writing-scripts/test-scripts/). Die Assertion basieren auf das [ChaiJS Framework](https://www.chaijs.com/api/bdd/).

#### Neo testing Helfer

Um das Testen der Particle Antwort so einfach wie möglich zu machen, gibt es Hilfsfunktionen. Diese kann man einfach aufrufen um den Antwort Particle auf Bspw. einer Adaptive Card zu testen. Man kann mehrere dieser Funktionen nutzen um die genauigkeit des Tests zu erhöhen.

Beispiele mit den Hilfsfunktionen:

- Der `particle` parameter ist immer eine Referenz auf den zurückgegebenen Particle des requests(Siehe oben Part _Flow request machen_)

1. Schauen ob Response im allgemeinen ok:

```js
isResponseOk()
```

2. Auf ein Content type testen:

```js
isContentType(particle, "adaptivecard")
```

3. Spezifische Daten im Content type testen(In dem Fall `PlainData`):

```js
containsContentData(particle, { text: "Ein text", speak: "Etwas gesprochen" })
```

4. Eine Direktive testen:

```js
isDirective(particle, "clipboard.copy")
```

5. Bestimmte Daten einer Direktive testen(In dem Fall `UrlOpendata`):

```js
containsDirectiveData(particle, { url: "https://neohelden.com" })
```

6. Suggestions testen:

```js
containsSuggestion(particle, "Ein label", "Eine Suggestions", "good")
```

7. Reprompt testen:

```js
containsReprompt(particle, "email", "Ein Hint der angezeigt wird", "email")
```

8. Sticky testen:

```js
containsSticky(particle, "plain", "ein text")
```

#### Ausführliche Helfer Dokumentation 📖

Um eine ausführliche Information über Parameter & co siehe die [Ausführliche Dokumentation](./docs/js-doc.md) 👨‍🎓

## Nützliche links 🔗

1. API:
   - <https://docs.neohelden.com/neap-api-docs/ref>
   - <https://docs.neohelden.com/de/neap-api-http>
   - <https://docs.neohelden.com/de>
2. Particle:

- Swagger Dokumentation: <https://cypher.neohelden.com/api/v1/docs/#/>
- <https://docs.neohelden.com/de/particle>

## Contribute 😄 👨‍💻 👩‍💻

1. Generate JSDoc: `npm run doc`
2. Pls. test changes in Postman :-D
