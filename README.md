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
      - [Spezielle Tests schreiben](#spezielle-tests-schreiben)
  - [Nützliche links 🔗](#nützliche-links-)
  - [Contribute 😄 👨‍💻 👩‍💻 & Dev notes](#contribute-----dev-notes)

## Test auf Postman erstellen

Um einen neuen Test anlegen:

1. In der `Templates` collection den `[PROECT-NAME]` Template duplizieren.
2. In die `NEAP Testing` collections verschieben
3. `[PROECT-NAME]`, Ziel URL `https://[WORSPACE].neohelden.com/auth` abändern
4. Wenn es kein `anonymous` workspace ist, müssen die Anmeldedaten hinzugefügt werden. Dafür im Workspace ein neuen App-User erstellen und in Postman unter dem `Body` tab:

```json
{
  "username": "[USERNAME]",
  "password": "[PASSWORD]"
}
```

5. Unter `Tests` in der Testvorlage die `TODO`'s ergänzen

## Test cases erstellen

Ein Test besteht aus 2 Bestandteile:

1. Anfrage(`request`)
2. Auswerten der Antwort bzw. des `particle`

### Anfrage

Es gibt 3 Möglichkeiten Anfragen zu machen:

#### 1. Messages

> Messages können genutzt werden um Bspw. **Intents auszulösen, commands zu triggern,...**

```js
const particle = await sendMessage('Ein Intent auslösen')
// ...
const particle = await sendMessage('/commandAuslösen')
```

#### 2. Reply

> Mit `sendReply()` kann man auf replies antworten. Hier wird die `replyId` berücksichtigt.

```js
const particle = await sendReply('Text der als reply kommen soll')
```

#### 3. Action

> Die Action kann man Bspw. für den Handshake nutzen oder um mit Adaptive Cards zu interagieren.

```js
const particle = await sendAction('handshake')
// ...
const particle = await sendAction('ButtonInAdaptiveCard')
```

### Particle response auswerten

Um das erwartete Particle auszuwerten, kann man alle response Attribute des Particles nutzen. Diese kann man im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) nachlesen. Oder auch in den [docs](https://docs.neohelden.com/de/particle).

#### Neo testing Helfer

Um das Testen der Particle Antwort so einfach wie möglich zu machen, gibt es Hilfsfunktionen. Diese kann man einfach aufrufen um den Antwort Particle auf Bspw. einer Adaptive Card zu testen. Man kann mehrere dieser Funktionen nutzen um die genauigkeit des Tests zu erhöhen.

Eine Liste aller vorhandenen Funktionen findet sich hier: [Ausführliche Dokumentation](./docs/js-doc.md) 👨‍🎓.  
Die Kurzversion, kann man auch beim Importieren ganz oben in der Template Datei sehen:

```js
// Neo hilfsfunktionen:
// TIPP: Man kann diese links am editor "einklappen" :)
const {
  message,
  reply,
  action,
  sendRequest,
  isResponseOk,
  isReprompt,
  isContentType,
  showsAdaptiveCard,
  //... -> Siehe Postman Template Import
```

Im folgenden ein paar Anmerkungen und Beispiele wie man diese nutzen kann.

##### Particle

Der `particle` parameter ist immer eine Referenz auf den zurückgegebenen Particle des requests(Siehe oben Part _Flow request machen_)

##### Optionale Parameter

Bei Hilfsfunktionen, die mehr als einen Parameter haben wird außer dem Particle nur ein zusätzlicher Parameter gebraucht. Alle anderen sind optional.  
Bspw. um einen Reprompt zu testen ist die Hilfsfunktion folgendermaßen definiert:

```js
const isReprompt = (particle, { typeToCheck = null, hintToCheck = null, patternToCheck = null } = {}) => { //...
```

Dabei wird **mindestens ein geklammerter Parameter** gebraucht. Um speziell bspw. nur auf einen Hint zu testen, würde man folgendes aufrufen:

```js
isReprompt(particle, { hintToCheck: 'ein Hint' })
```

▶️💡: Die Syntax für die Optionale Parameter basiert auf simulierte named Parameter in Javascript. Hier ein gute Quelle diesbezüglich: [Named Parameters in Javascript](https://exploringjs.com/impatient-js/ch_callables.html#named-parameters)

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
showsAdaptiveCard(particle, 'Ein Text in einer Adaptive Card')
// ...
showsText(particle, 'Ein text in einer plain node')
```

3. **Controls**: Auf Audio url testen:

> Controls haben ein `triggers` Prefix

```js
triggersAudio(particle, 'www.audio.de/mp3')
```

4. **Directives**: Auf Email erstellen testen:

> Directives haben ein `does` Prefix

```js
doesComposeAnEmail(particle, { recipients: 'daniel@neohelden.com', subject: 'Flow test Docs' })
```

5. **Sticky** testen:

```js
isSticky(particle, 'Ein text in einer Sticky')
```

6. **Intent** confidence testen:

- **ANMERKUNG:** Dies ist die einzige Methode, bei dem die Regel bezüglich optionaler Parameter nicht gilt. Es müssen alle Parameter angegeben werden(Also `intent` und `confidenceThreshold`)

```js
// confidence für neo.hello muss mindestens 0.79 betragen
isIntent(particle, 'neo.hello', 0.79)
```

---

Hiebei sei nochmal auf die Liste aller vorhandenen Funktionen verwiesen die auf JSDoc basiert 😉: [Ausführliche Dokumentation](./docs/js-doc.md) ‍.

#### Spezielle Tests schreiben

Generell, kann man folgendermaßen jeden Eintrag im Particle Testen:

```js
pm.test('[TEST-BESCHREIBUNG]', () => {
  pm.expect(particle.response[RESPONSE_PART]).to.contain('[ERWARTERTER-INHALT]')
})
```

Siehe die [Postman Dokumentation](https://learning.postman.com/docs/writing-scripts/test-scripts/). Die Assertions basieren auf das [ChaiJS Framework](https://www.chaijs.com/api/bdd/).

## Nützliche links 🔗

1. API:
   - <https://docs.neohelden.com/neap-api-docs/ref>
   - <https://docs.neohelden.com/de/neap-api-http>
   - <https://docs.neohelden.com/de>
2. Particle:
   - Swagger Dokumentation: <https://cypher.neohelden.com/api/v1/docs/#/>
   - <https://docs.neohelden.com/de/particle>
3. Postman<https://learning.postman.com/docs/writing-scripts/test-scripts/>
4. ChaiJS: <https://www.chaijs.com/api/bdd/>

## Contribute 😄 👨‍💻 👩‍💻 & Dev notes

1. JSDoc generieren: `npm run doc`
2. Pls. changes in Postman testen :-D
3. PR aufmachen & mir(@daniel@neohelden.com) oder jemand anderes assignen

Folder Structure:

```txt
flow-testing-manual
├── README.md
├── docs
│   └── js-doc.md -> JSDoc
├── lib
│   ├── full-test-template.js -> All functions together with the tests to use without function dependency
│   └── neo-test-functions.js -> Neo test helper functions
├── package-lock.json
├── package.json
└── test-template.js -> Test template used in Postman with function dependencies
```
