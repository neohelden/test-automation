# Flow Testing mit Postman 🧪

> Beschreibung und Vorlagen für das Flow Testing mit Postman

Mithilfe der [NEAP-API](https://docs.neohelden.com/neap-api-docs/ref), kann man Tests auf den Flows ausführen.  
Dafür wird [Postman](https://neohelden.postman.co/) 👨‍🚀 genutzt.

- [Flow Testing mit Postman 🧪](#flow-testing-mit-postman-)
  - [Test auf Postman erstellen](#test-auf-postman-erstellen)
  - [Authentifizierung und Umgang mit Zugangsdaten](#authentifizierung-und-umgang-mit-zugangsdaten)
  - [Test Cases erstellen](#test-cases-erstellen)
    - [Anfrage machen](#anfrage-machen)
      - [1. Messages](#1-messages)
      - [2. Reply](#2-reply)
      - [3. Action](#3-action)
        - [3.1 sendAdaptiveCardAction Methode](#31-sendadaptivecardaction-methode)
    - [Antwort auswerten](#antwort-auswerten)
      - [Neo Testing Helfer](#neo-testing-helfer)
        - [Beispiele mit Hilfsfunktionen](#beispiele-mit-hilfsfunktionen)
        - [Optionale Parameter](#optionale-parameter)
          - [Eine bestimmte Nachricht auswählen](#eine-bestimmte-nachricht-auswählen)
      - [Spezielle Tests schreiben](#spezielle-tests-schreiben)
      - [Das Particle](#das-particle)
  - [Versionierung](#versionierung)
    - [Von Postman auf spezielle Version der Hilfsfunktionen zugreifen](#von-postman-auf-spezielle-version-der-hilfsfunktionen-zugreifen)
    - [Eigene Hilfsfunktionen hinzufügen](#eigene-hilfsfunktionen-hinzufügen)
  - [Nützliche links 🔗](#nützliche-links-)
  - [Contribute 😄 👨‍💻 👩‍💻 & Entwicklungshinweise](#contribute-----entwicklungshinweise)

## Test auf Postman erstellen

Folgende Schritte sind notwendig um einen neuen Test anzulegen:

1. In der `Templates` Collection das `[PROECT-NAME]` Template duplizieren.
2. In die `NEAP Testing` Collections verschieben
3. `[PROECT-NAME]` und Ziel URL `https://[WORSPACE].neohelden.com/auth` abändern
4. Wenn es kein `Anonymous` Workspace ist, müssen die Anmeldedaten hinzugefügt werden. Siehe dazu den nächsten Abschnitt _Authentifizierung_.
5. Unter `Tests` in der Testvorlage die `TODO`'s ergänzen
6. OPTIONAL: Falls abweichende Test Funktionen genutzt werden, den GitHub Link zu der Datei/Version im `Pre-Request`-Tab verändern:
   - Siehe Pre-Request code: [pre-request.js](./lib/pre-request.js)
   - Siehe Abschnitt _Test Funktionen hinzufügen_

## Authentifizierung und Umgang mit Zugangsdaten

Wenn es sich nicht um ein `Anonymous` Workspace handelt, sollten die folgenden Schritte um Bezug auf Authentifizierung gemacht werden:

1. Falls nicht vorhanden App-User im Workspace erstellen
2. Im _Body_-Tab des Postman Requests den `Username` des App-Users und `Password` im JSON einfügen:

```json
{
  "username": "[USERNAME]",
  "password": "[PASSWORD]"
}
```

3. **WICHTIG:** Nach dem Ausführen der Tests, die Anmeldedaten aus dem `Body`-Tab wieder entfernen. Somit wird sichergestellt, dass keine Anmeldeinformationen im Klartext zurückbleiben. Nach dem Entfernen, Testfall abspeichern

## Test Cases erstellen

Ein Test besteht aus 2 Bestandteile:

1. Anfrage(`request`)
2. Auswerten der Antwort bzw. des `particle`

### Anfrage machen

Es gibt 3 Möglichkeiten Anfragen zu machen. Diese werden im Folgenden gezeigt werden.

#### 1. Messages

> Messages können genutzt werden um Bspw.:

1. Intents auszulösen
2. Commands zu triggern
3. Suggestions auszulösen
4. ...

```js
await sendMessage('Ein Intent auslösen')
// ...
await sendMessage('/commandAuslösen')
```

#### 2. Reply

> Mit `sendReply()` kann man auf Replies antworten. Hier wird die `replyId` berücksichtigt.

```js
await sendReply('Text der als Reply kommen soll')
```

#### 3. Action

> Die Action kann man Bspw. Für den Handshake nutzen oder um mit Adaptive Cards zu interagieren.

```js
await sendAction('handshake')
// ...
await sendAction('ButtonInAdaptiveCard')
```

##### 3.1 sendAdaptiveCardAction Methode

Außer der einfachen Action gibt es noch die Möglichkeit eine Action auszuführen und dabei das `data` Attribut einer Adaptive Card zu nutzen. Dies ist nützlich, wenn man Bspw. Mittels Buttons in einer Adaptive Card Actions ausführen möchten.

```js
// Mache eine Action Anfrage mit der "dieAction" Action und dem dazugehörigen Daten
await sendAdaptiveCardAction('dieAction')
```

### Antwort auswerten

Um das erwartete Particle auszuwerten, kann man alle Response Attribute des Particles nutzen. Diese kann man im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) nachlesen. Oder auch in den [Docs](https://docs.neohelden.com/de/particle).

#### Neo Testing Helfer

Um das Testen der Particle Antwort so einfach wie möglich zu machen gibt es Hilfsfunktionen. Diese kann man einfach aufrufen um den Antwort Particle auf Bspw. Einer Adaptive Card zu testen. Man kann mehrere dieser Funktionen nutzen, um die Genauigkeit des Tests zu erhöhen.

Eine Liste aller vorhandenen Funktionen findet sich hier: [ausführliche Dokumentation](./docs/js-doc.md) 👨‍🎓. Dabei wird [JS Doc](https://jsdoc.app/) Syntax verwendet.
Die Kurzversion kann man auch beim Importieren ganz oben in der Template-Datei sehen:

```js
// Neo Hilfsfunktionen:
// TIPP: Man kann diese links am  Editor "einklappen" :)
const {
  sendMessage,
  sendReply,
  sendReply,
  sendRequest,
  isResponseOk,
  isReprompt,
  isContentType,
  showsAdaptiveCard,
  //... -> Siehe Postman Template Import
```

Im Folgenden ein paar Anmerkungen und Beispiele wie man diese nutzen kann.

##### Beispiele mit Hilfsfunktionen

Im Folgenden jeweils ein Beispiel für die verschiedenen Möglichkeiten die Hilfsfunktionen zu nutzen:

- Hierbei sei nochmal auf die Liste aller vorhandenen Funktionen verwiesen die auf JS Doc basiert 😉: [ausführliche Dokumentation](./docs/js-doc.md) ‍.
- Die Werte in geschweifter Klammer sind _optionale Parameter_. Mehr dazu im nächsten Abschnitt.

1. Auf **Reprompt** testen:

```js
isReprompt({ hintToCheck: 'Ein Hint' })
```

2. **Contents**: Auf Merkmal in Adaptive Card oder Text testen:

> Contents haben ein `shows` Präfix

```js
showsAdaptiveCard('Ein Text in einer Adaptive Card')
// ...
showsText('Ein text in einer plain node')
```

3. **Controls**: Auf Audio URL testen:

> Controls haben ein `triggers` Präfix

```js
triggersAudio('www.audio.de/music.mp3')
```

4. **Directives**: Auf E-mail erstellen testen:

> Directives haben ein `does` Präfix

```js
doesComposeAnEmail({ recipients: 'daniel@neohelden.com', subject: 'Flow test Docs' })
```

5. **Sticky** testen:

```js
isSticky({ dataToCheckFor: 'Ein text in einer Sticky' })
```

6. **Intent** confidence testen:

```js
// confidence für neo.hello muss mindestens 0.79 betragen
isIntent('neo.hello', 0.79)
```

##### Optionale Parameter

Die meisten Funktionen haben optionale Parameter. Ein solcher ist Bspw. `position`. Damit kann man, falls mehrere Nachrichten zurückgegeben werden, auf eine bestimmte testen. Mehr dazu im nächsten Abschnitt.  
Die Liste der optionale Parameter für die jeweilige Funktion, kann man am besten in den [JS Docs](https://jsdoc.app/) nachlesen: [ausführliche Dokumentation](./docs/js-doc.md). Hier werden optionale Parameter mit eckigen Klammern dargestellt(`[]`). Beispiel von Doku und Anwendung im Test:

```js
// ... Hier anfrage
// Jetzt verarbeiten/test
// jsdoc: triggersSuggestion([label], [value], [style])
triggersSuggestion({ label: 'Ein Label einer Suggestion' })
```

Wenn im oberen Fall, kein Pflichtparameter(Nicht in eckigen Klammern) existiert wird bei leerer Parameterübergabe lediglich getestet ob es sich um den jeweiligen Content type oder Direktive handelt.

▶️💡: Die Syntax für die optionalen Parameter basiert auf simulierte named Parameter in Javascript. Hier eine gute Quelle diesbezüglich: [Named Parameters in Javascript](https://exploringjs.com/impatient-js/ch_callables.html#named-parameters)

###### Eine bestimmte Nachricht auswählen

Werden mehrere Nachrichten bei einer Antwort verschickt, kann man auf eine bestimmte Nachricht testen. Dies wird durch einen optionalen Parameter `position` ermöglicht. Dieser gibt an, welche Nachricht ausgewählt werden soll. Ein Beispiel, mit Erklärungen in den Kommentaren:

```js
await sendAction('handshake')
// Die erste Nachricht soll ein Text sein
showsText('Wie kann ich dir helfen', { position: 1 })
// Die Zweite Nachricht soll eine Adaptive Card sein
showsAdaptiveCard('Tests für den letzten Release', {
  position: 2,
})
// Die Dritte Nachricht soll eine Adaptive Card sein
showsAdaptiveCard('Alle Tests', { position: 3 })
```

#### Spezielle Tests schreiben

Generell, kann man folgendermaßen jeden Eintrag im Particle Testen:

```js
pm.test('[TEST-BESCHREIBUNG]', () => {
  pm.expect(particle.response[RESPONSE_PART]).to.contain('[ERWARTERTER-INHALT]')
})
```

Siehe die [Postman Dokumentation](https://learning.postman.com/docs/writing-scripts/test-scripts/). Die Assertions basieren auf das [ChaiJS Framework](https://www.chaijs.com/api/bdd/).

#### Das Particle

Es ist nicht nötig den Particle zu verarbeiten. Wenn dies jedoch gewollt ist, kann man auf diesen durch den Rückgabewert zugreifen.

```js
const particle = await sendMessage('Ein Intent auslösen')
// Particle verarbeiten
```

## Versionierung

Zur Versionierung kommt [Semantische Versionierung](https://docs.npmjs.com/about-semantic-versioning) zum Einsatz.  
Die einzelnen Versionen werden mittels [Git Tags](https://stackoverflow.com/questions/35979642/what-is-git-tag-how-to-create-tags-how-to-checkout-git-remote-tags) gesammelt und können dann von Postman zugegriffen werden.

- [Release erstellen](https://docs.npmjs.com/cli/v7/commands/npm-version): `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]`

### Von Postman auf spezielle Version der Hilfsfunktionen zugreifen

Um von Postman bestimmte Hilfsfunktionen von einer bestimmten Version zu bekommen wird auf die `raw` Version der Funktionsdatei verlinkt.  
Dies Funktioniert folgendermaßen:

1. Auf GitHub die `raw` Version der Funktionsdatei(In `./lib`, bspw. `./lib/neo-test-functions.js`) holen.
2. URL der `raw` Datei kopieren
3. In Postman im `Pre-Request` Tab beim Request als Ziel URL einsetzen:

Siehe in `./lib/pre-request.js`:

```js
// ...
    return new Promise((res, rej) => {
      pm.sendRequest('[RAW_NEO_TESTING_LINK]', (error, response) => {
        if (error) {
// ...
```

### Eigene Hilfsfunktionen hinzufügen

Falls weitere Hilfsfunktionen zum Testen gebraucht werden, kann man die bestehenden Funktionen erweitern. Dies ist Hilfreich, wenn man Testfunktionen braucht die für spezielle Use-Cases hilfreich sind und nicht generell bei allen Flows genutzt werden(Bspw. _Twilio_ Test Funktionen). Diese kann man dann in Postman auch in mehreren Workspaces/Tests nutzen. Ein paar andere Vorteile sind unter anderem Code duplication zu vermeiden und die Übersichtlichkeit zu verbessern.  
Folgendermaßen kann man eigene Funktionen hinzufügen:

1. Funktion erstmal _lokal_ in Postman testen und auf Richtigkeit überprüfen
2. In diesem Repository einen [neuen Branch erstellen](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository)
3. Im neuen Branch, die `./lib/neo-test-functions.js` duplizieren und passend benennen
4. In der duplizierten Datei, die Funktion ganz unten bei dem 'TODO` Kommentar einfügen:

```js
  }

  // TODO ADD HERE CUSTOM FUNCTIONS

  return {
    // TODO NAME DER FUNKTION EINFÜGEN
```

5. Funktionsname im `return` Objekt einfügen
6. Alles in Git [commiten und pushen](https://docs.github.com/en/github/managing-files-in-a-repository/adding-a-file-to-a-repository-using-the-command-line)
7. Auf GitHub für den Branch ein [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review) öffnen
8. Jemand aus dem Neohelden Team [assignen](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review)

Um in Postman auf die erstellte Version der Hilfsfunktion zugreifen zu können, siehe letzten Abschnitt: _Von Postman auf Versionierte Version zugreifen_. Außerdem muss man die neuen Methoden im Test Tab noch unter den Funktionsimporten angeben.

## Nützliche links 🔗

1. API:
   - <https://docs.neohelden.com/neap-api-docs/ref>
   - <https://docs.neohelden.com/de/neap-api-http>
   - <https://docs.neohelden.com/de>
2. Particle:
   - Swagger Dokumentation: <https://cypher.neohelden.com/api/v1/docs/#/>
   - <https://docs.neohelden.com/de/particle>
3. Postman: <https://learning.postman.com/docs/writing-scripts/test-scripts/>
4. ChaiJS: <https://www.chaijs.com/api/bdd/>

## Contribute 😄 👨‍💻 👩‍💻 & Entwicklungshinweise

1. JS Doc generieren: `npm run doc`
2. Änderungen in Postman testen
3. PR aufmachen & Neoheld zur review assignen

Ordner Struktur:

```txt
flow-testing-manual
├── README.md
├── docs
│   ├── docs-neo-test-functions.js
│   └── js-doc.md -> JSDOC
├── lib
│   ├── neo-test-functions.js -> DEFAULT TEST FUNCTIONS
│   └── postman-templates
│       ├── pre-request.js -> POSTMAN PRE-REQUEST TEMPLATE
│       └── test-template.js -> POSTMAN TEST TEMPLATE
├── package-lock.json
└── package.json
```
