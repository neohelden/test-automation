# Test-Automatisierung mit Postman 🧪

Mithilfe der [NEAP-API](https://docs.neohelden.com/neap-api-docs/ref), können Testfälle für bestehende Flows geschrieben und ausgeführt werden.  
Dafür wird [Postman](https://neohelden.postman.co/) 👨‍🚀 genutzt.

## Einrichtung in Postman

Um einen neuen Test zu erstellen, sind folgende Schritte notwendig:

1. Auf Postman einen neuen [Request](https://learning.postman.com/docs/getting-started/creating-the-first-collection/#:~:text=To%20create%20a%20new%20request,enter%20a%20new%20request%20name.) erstellen
2. Den Request Namen setzen, die HTTP Methode auf POST setzen und die Ziel URL auf `https://[WORSPACE].neohelden.com/auth` setzen. Wobei `[WORKSPACE]` das Ziel Workspace ist.
3. Das Pre-Request Template(In `./lib/postman-templates/pre-request.js`) kopieren und in der _Pre-request Script_ Leiste des Postman Requests einfügen
4. Das Test Template(In `./lib/postman-templates/test-template.js`) kopieren und in der _Tests_ Leiste des Postman Requests einfügen
5. In der Testvorlage aus Schritt 4. die `TODO`'s mit den fehlenden Daten ergänzen
6. Wenn es kein `Anonymous` Workspace ist, müssen die Anmeldedaten hinzugefügt werden. Siehe dazu den nächsten Abschnitt _Authentifizierung_.

## Schnelleinstieg (Beispiel)

```js
// Wir beginnen den Test mit einem "Handshake"
//
// Wir benutzen "await", um auf die Antwort von Neo zu warten
await sendAction('handshake')

// Neo antwortet nun mit einem gesprochenen Text ("says")
// und zeigt mehrere AdaptiveCard-Inhalte an
//
// Die Antwort überprüfen wir mithilfe der Hilfsfunktionen
says('Guten Tag, was kann ich für dich tun?') 
showsAdaptiveCard('Hier eine Auswahl unserer Möglichkeiten', {
  position: 2, // hier prüfen wir bewusst, die 2. Position der Antwort
})
showsAdaptiveCard('Weitere Optionen', { position: 3 })

// Nun senden wir eine normale Nachricht
// Neo antwortet mit einer Text-Nachricht
await sendMessage('Ich möchte ein Zimmer buchen')
showsText('Welche Stadt?')

// Wir nutzen `sendReply`, um den Kontext der Konversation zu behalten
await sendReply('Karlsruhe')
showsText('Welches Datum?')

await sendReply('1. April 2020')
showsText('Vielen Dank für die Buchung.')

// Wir können mithilfe von sendMessage auch Commands auslösen
await sendMessage('/map')
isContentType('map')

await sendMessage('Zeige mir ein Video von den Neohelden' )
showsMedia('https://youtu.be/I2waThpOfrc')

return 'Done'
```

## Authentifizierung und Umgang mit Zugangsdaten

Wenn es sich nicht um ein Workspace mit `anonymous`-Authentifizierung handelt, müssen die folgenden Schritte zur Authentifizierung durchgeführt werden:

1. Erstelle einen neuen App-User für den Workspace über die Benutzerverwaltung
2. Im _Body_-Tab der Postman-Anfrage den `Username` des App-Users und `Password` einfügen:

```json
{
  "username": "[USERNAME]",
  "password": "[PASSWORD]"
}
```

3. **Sicherheitshinweis:** Synchronisierte Testfälle sollten die Zugangsdaten für den Workspace nicht im Klartext speichern. Die Zugangsdaten sollten separat über einen Passwort-Manager ausgetauscht werden. Die gespeicherten und synchronisierten Testfälle sollten mit Platzhaltern (s. Beispiel oben) arbeiten.

## Anfrage-Arten (`Request-Type`)

Um die Funktionstüchtigkeit des Assistenten sicherzustellen, gibt es unterschiedliche Anfrage-Arten (`request-types`), die als Anwender ausgelöst werden können. Je nach Art der Anfrage können dabei zusätzliche Daten übermittelt werden.

### 1. Messages / Nachrichten

Eine `Message` beinhaltet einen Text, der von der Plattform weiterverarbeitet wird. Beginnt die Nachricht mit einem `/` (Slash), wird die Nachricht als `Command` verarbeitet. Alle anderen Nachrichten werden mithilfe der NLU auf Intents und Slots geprüft.

```js
// Sendet eine beliebige Nachricht ab
await sendMessage('Ein Intent auslösen')

// Löst ein Kommando aus (aufgrund des beginnenden Slash)
await sendMessage('/kommando')

// Löst ein Kommando mit Argumenten aus (aufgrund des beginnenden Slash)
await sendMessage('/resetUser Seraph')
```

### 2. Reply / Antwort

Eine `Reply` bezieht sich immer auf die vorhergehende Nachricht und stellt bspw. eine Antwort auf eine Rückfrage dar. Flows, die einen `Reprompt` einsetzen, erfordern im Testfall des Einsatz von `sendReply`. Auch eine `Reply` wird mithilfe der NLU verarbeitet und beinhaltet in der Antwort die Metadaten über die erkannten Intents und Slots.

```js
// Keine Antwort ohne vorhergehende Nachricht
// Daher begrüßen wir Neo vorab
await sendMessage('Hallo Neo')

// Neo antwortet: Hallo, wie geht es dir?
// Im Flow wird hier nun ein Reprompt eingesetzt

await sendReply('Gut und wie geht es dir?')
```

### 3. Action / Aktionen

Eine `Action` wird über unterschiedliche Komponenten ausgelöst. Das kann bspw. der initiale (digitale) `handshake` sein. Die AdaptiveCard-, Camera- oder Upload-Komponenten lösen ebenfalls `Action`-Anfragen aus.

```js
// Löst die Handshake-Action aus
await sendAction('handshake')

// Optional können auch Daten als Payload (data-Attribut) mitgesendet werden
await sendAction('processForm', {
  foo: 'bar',
})
```

#### 3.1 sendAdaptiveCardAction Methode

Es ist zudem möglich, eine Action auszuführen und dabei das `data` Attribut einer AdaptiveCard zu nutzen. Durch diese Methode ist es möglich, einen "Button in einer AdaptiveCard auszuführen". Mit der `sendAdaptiveCardAction` werden die Daten aus der AdaptiveCard als `Action`-Anfrage gesendet. Somit kann ein bestimmter Kontext beim interagieren mit einer AdaptiveCard erhalten bleiben.

```js
// Mache eine Action Anfrage mit der "dieAction" Action und den dazugehörigen Daten
await sendAdaptiveCardAction('processForm')

// Optional kann die Position der AdaptiveCard definiert werden
await sendAdaptiveCardAction('processForm', 2)
```

## Antwort auswerten

Zur Auswertung der erwarteten Antwort können alle Bestandteile des Particles und der Antwort (`response`) verwendet werden. Diese können im [Particle Schema](https://cypher.neohelden.com/api/v1/docs/#/) oder in den [Docs](https://docs.neohelden.com/de/particle) nachgelesen werden.

### Test-Funktionen

Um das Testen des Particle Response so einfach wie möglich zu gestalten, gibt es eine Reihe von Hilfsfunktionen. Diese erleichtern die Überprüfung einzelner Inhalte mithilfe einer einfachen Syntax. Die Einzelfunktionen können dabei auch aufeinanderfolgen und unterschiedliche Aspekte der Antwort validieren.

Eine Liste aller vorhandenen Funktionen gibt es in der [ausführlichen Test-API Dokumentation](./docs/js-doc.md). In der Template-Datei ist eine Kurzversion der gängisten Funktionen hinterlegt:

```js
// Tipp: Man kann diese Referenzen am Editor "einklappen" :)
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

#### Beispiele mit Hilfsfunktionen

Hinweis: Die Werte in geschweifter Klammer sind _optionale Parameter_. Mehr dazu im nächsten Abschnitt.

1. Auf **Reprompt** testen:

```js
isReprompt({ hintToCheck: 'Ein Hint' })
```

2. **Inhaltstypen (Contents)**: Auf Merkmal in einer AdaptiveCard oder Text testen:

> Inhaltstypen haben ein `shows` Präfix

```js
showsAdaptiveCard('Ein Text in einer Adaptive Card')
// ...
showsText('Ein text in einer plain node')
```

3. **Bedienungselemente (Controls)**: Auf Audio URL testen:

> Bedienungselemente haben ein `triggers` Präfix

```js
triggersSuggestion({ label: 'Suggestion label', value: 'Suggestion value' })
```

4. **Directives**: Auf E-mail erstellen testen:

> Directives haben ein `does` Präfix

```js
doesComposeAnEmail({ recipients: 'hello@neohelden.com', subject: 'Flow test Docs' })
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

#### Optionale Parameter

Viele Funktionen haben optionale Parameter. Zum Beispiel kann mit `position` auf eine bestimmte Nachricht getestet werden, wenn wir mehrere Nachrichten erwarten.
Die Liste der optionalen Parameter für die jeweilige Funktion, kann in den [JS Docs](https://jsdoc.app/) nachgelesen werden: [ausführliche Dokumentation](./docs/js-doc.md). Hier werden optionale Parameter mit eckigen Klammern dargestellt(`[]`). Beispiel von Doku und Anwendung im Test:

```js
// ... Hier anfrage
// Jetzt verarbeiten/test
// jsdoc: triggersSuggestion([label], [value], [style])
triggersSuggestion({ label: 'Ein Label einer Suggestion' })
```

Wenn kein Pflichtparameter (Nicht in eckigen Klammern) existiert, wird bei leerer Parameterübergabe lediglich getestet, ob es sich um den jeweiligen Content type oder Direktive handelt.

▶️💡: Die Syntax für die optionalen Parameter basiert auf simulierten named Parametern in Javascript. Hier ist eine gute Quelle dazu: [Named Parameters in Javascript](https://exploringjs.com/impatient-js/ch_callables.html#named-parameters)

##### Eine bestimmte Nachricht auswählen

Werden mehrere Nachrichten bei einer Antwort verschickt, kann man auf eine bestimmte Nachricht testen. Der optionale Parameter `position` ermöglicht einen solchen Test. Dieser gibt an, welche Nachricht ausgewählt werden soll. Ein Beispiel, mit Erklärungen in den Kommentaren:

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

### Spezielle Tests schreiben

Generell, kann man folgendermaßen jeden Eintrag im Particle Testen:

```js
pm.test('[TEST-BESCHREIBUNG]', () => {
  pm.expect(particle.response[RESPONSE_PART]).to.contain('[ERWARTERTER-INHALT]')
})
```

Siehe die [Postman Dokumentation](https://learning.postman.com/docs/writing-scripts/test-scripts/). Die Assertions basieren auf dem [ChaiJS Framework](https://www.chaijs.com/api/bdd/).

### Das Particle

Es ist nicht nötig den Particle zu verarbeiten. Wenn dies jedoch gewünscht ist, kann über den Rückgabewert darauf zugegriffen werden.

```js
const particle = await sendMessage('Ein Intent auslösen')
// Particle verarbeiten
```

## Versionierung

Zur Versionierung kommt [Semantische Versionierung](https://docs.npmjs.com/about-semantic-versioning) zum Einsatz.  
Die einzelnen Versionen werden mittels [Git Tags](https://stackoverflow.com/questions/35979642/what-is-git-tag-how-to-create-tags-how-to-checkout-git-remote-tags) gesammelt und können über Postman zugegriffen werden.

- [Release erstellen](https://docs.npmjs.com/cli/v7/commands/npm-version): `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]`

### Von Postman auf spezielle Version der Hilfsfunktionen zugreifen

Um von Postman bestimmte Hilfsfunktionen von einer bestimmten Version zu bekommen wird auf die `raw` Version der Funktionsdatei verlinkt.  
Dies funktioniert folgendermaßen:

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

