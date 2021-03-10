# Flow testing mit Postman 🧪

> Beschreibung und Vorlagen für das Flow testing mit Postman

Mithilfe der [NEAP-API](https://docs.neohelden.com/neap-api-docs/ref), kann man tests auf den Flows ausführen.  
Dafür wird [Postman](https://neohelden.postman.co/) 👨‍🚀 genutzt.

- [Flow testing mit Postman 🧪](#flow-testing-mit-postman-)
  - [Test auf Postman erstellen](#test-auf-postman-erstellen)
  - [Test cases erstellen](#test-cases-erstellen)
    - [Anfrage](#anfrage)
      - [1. Messages](#1-messages)
      - [2. Reply](#2-reply)
      - [3. Action](#3-action)
    - [Particle response auswerten](#particle-response-auswerten)
      - [Neo testing Helfer](#neo-testing-helfer)
        - [Particle](#particle)
        - [Optionale Parameter](#optionale-parameter)
        - [Beispiele mit Hilfsfunktionen](#beispiele-mit-hilfsfunktionen)
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

1. Anfrage(`request`)
2. Auswerten der Antwort(=`particle`)

### Anfrage

Es gibt 3 Möglichkeiten Anfragen zu machen:

#### 1. Messages

> Messages können genutzt werden um Bspw. **Intents auszulösen, commands zu triggern, auf re-prompts zu antworten,...**

```js
const particle = await message('Ein Intent auslösen')
// ...
const particle = await message('/commandAuslösen')
```

#### 2. Reply

> Mit `reply()` kann man auf replies antworten

```js
const particle = await reply('Text der als reply kommen soll')
```

#### 3. Action

> Die Action kann man Bspw. für den Handshake nutzen oder um mit Adaptive Cards zu interagieren.

```js
const particle = await action('Handshake')
// ...
const particle = await action('ButtonInAdaptiveCard')
```

### Particle response auswerten

Um das erwartete Particle auszuwerten,kann man alle response Attribute des Particles nutzen. Diese kann man im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) nachlesen. Oder auch in den [docs](https://docs.neohelden.com/de/particle).

Generell, kann man folgendermaßen jeden Eintrag im Particle Testen:

```js
pm.test('[TEST-BESCHREIBUNG]', () => {
  pm.expect(particle.response[RESPONSE_PART]).to.contain('[ERWARTERTER-INHALT]')
})
```

Siehe die [Postman Dokumentation](https://learning.postman.com/docs/writing-scripts/test-scripts/). Die Assertions basieren auf das [ChaiJS Framework](https://www.chaijs.com/api/bdd/).

#### Neo testing Helfer

Um das Testen der Particle Antwort so einfach wie möglich zu machen, gibt es Hilfsfunktionen. Diese kann man einfach aufrufen um den Antwort Particle auf Bspw. einer Adaptive Card zu testen. Man kann mehrere dieser Funktionen nutzen um die genauigkeit des Tests zu erhöhen.

Eine Liste aller vorhandenen Methoden findet sich hier: [Ausführliche Dokumentation](./docs/js-doc.md) 👨‍🎓.  
Im folgenden ein paar Anmerkungen und Beispiele wie man diese nutzen kann.

##### Particle

Der `particle` parameter ist immer eine Referenz auf den zurückgegebenen Particle des requests(Siehe oben Part _Flow request machen_)

##### Optionale Parameter

Bei Hilfsfunktionen, die mehr als einen Parameter haben wird außer dem Particle nur ein zusätzlicher gebraucht. Alle anderen sind optional.  
Bspw. um einen Reprompt zu testen ist die Hilfsfunktion folgendermaßen definiert:

`isReprompt(particle, [typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])`

Dabei wird **mindestens ein geklammerter Parameter** gebraucht. Um speziell bspw. nur auf einen Hint zu testen, würde man folgendes aufrufen:

```js
isReprompt(particle, { hintToCheck: 'ein Hint' })
```

💡: Die Syntax für die Optionale Parameter basiert auf simulierte named Parameter in Javascript. Hier ein gute Quelle diesbezüglich: [Named Parameters in Javascript](https://exploringjs.com/impatient-js/ch_callables.html#named-parameters)

##### Beispiele mit Hilfsfunktionen

Im Folgenden jeweils ein Beispiel für die verschiedenen Möglichkeiten die Hilfsfunktionen zu nutzen:

- Anmerkung: Das Particle entstammt aus einer Anfrage(Siehe _Anfrage_ Part ⏫).

1. Auf **Reprompt** testen:

```js
isReprompt(particle, { hintToCheck: 'Ein Hint' })
```

2. **Contents**: Auf Merkmal in Adaptive Card testen:

> Contents haben ein `shows` Prefix

```js
showsAdaptiveCard(particle, "Ein Text in einer Adaptive Card")
// ...
showsPlainText(particle, "Ein text in einer plain node")
```

3. **Controls**: Auf Audio url testen:

> Controls haben ein `triggers` Prefix

```js
triggersAudio(particle, "www.audio.de/mp3")
```

4. **Directives**: Auf Email erstellen testen:

> Directives haben ein `does` Prefix

```js
doesComposeAnEmail(particle, {recipients: "daniel@neohelden.com", subject: "Flow test Docs"})
```

5. **Sticky** testen:

```js
isSticky(particle, "Ein text in einer Sticky")
```

6. **Intent** confidence testen:

- **ANMERKUNG:** Dies ist die einzige Methode, bei dem die Regel bezüglich optionaler Parameter nicht gilt. Es müssen alle Parameter angegeben werden(Also `intent` und `confidenceThreshold`)

```js
// confidence für neo.hello muss mindestens 0.79 betragen
isIntent(particle, "neo.hello", 0.79)
```

Hiebei sei nochmal auf die Liste aller vorhandenen Methoden verwiesen 😉 [Ausführliche Dokumentation](./docs/js-doc.md) ‍.

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
3. Open PR & assign me(@daniel@neohelden.com or someone else to review)
