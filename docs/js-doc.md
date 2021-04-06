## Functions

<dl>
<dt><a href="#sendMessage">sendMessage(msg)</a> ⇒ <code>Object</code></dt>
<dd><p>Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...</p>
</dd>
<dt><a href="#sendReply">sendReply(msg)</a> ⇒ <code>Object</code></dt>
<dd><p>Send Reply</p>
</dd>
<dt><a href="#sendAction">sendAction(action, [data])</a> ⇒ <code>Object</code></dt>
<dd><p>Sends an action</p>
</dd>
<dt><a href="#sendAdaptiveCardAction">sendAdaptiveCardAction(action, [position], [actionIndex])</a> ⇒ <code>Object</code></dt>
<dd><p>Send adaptive card action with data attribute
Useful f.ex for actions like Button clicks on adaptive cards</p>
</dd>
<dt><a href="#sendRequest">sendRequest(payload)</a> ⇒ <code>Object</code></dt>
<dd><p>Send request to particle API Endpoint</p>
</dd>
<dt><a href="#isResponseOk">isResponseOk()</a></dt>
<dd><p>Check that the response is ok</p>
</dd>
<dt><a href="#isReprompt">isReprompt([typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])</a></dt>
<dd><p>Check for particle to contain specific re-prompt attributes</p>
</dd>
<dt><a href="#isContentType">isContentType(contentType, [particle])</a></dt>
<dd><p>Check for an expected content type in array of contents</p>
</dd>
<dt><a href="#showsAdaptiveCard">showsAdaptiveCard(adaptiveCardContent, [position])</a></dt>
<dd><p>Check adaptive card for Content</p>
</dd>
<dt><a href="#showsDownload">showsDownload(url, [position])</a></dt>
<dd><p>Check download content type</p>
</dd>
<dt><a href="#showsExpandable">showsExpandable([title], [html], [position])</a></dt>
<dd><p>Check for expandable content</p>
</dd>
<dt><a href="#showsHtml">showsHtml(html, [position])</a></dt>
<dd><p>Check for expected html</p>
</dd>
<dt><a href="#showsImage">showsImage(imageSource, [position])</a></dt>
<dd><p>Check expected image</p>
</dd>
<dt><a href="#showsMap">showsMap([lat], [lng], [position])</a></dt>
<dd><p>Check expected map</p>
</dd>
<dt><a href="#showsMedia">showsMedia(mediaUrl, [position])</a></dt>
<dd><p>Check expected media</p>
</dd>
<dt><a href="#showsText">showsText(text, [position])</a></dt>
<dd><p>Check Plain node for expected text</p>
</dd>
<dt><a href="#triggersStickyClear">triggersStickyClear()</a></dt>
<dd><p>Check whether sticky was cleared</p>
</dd>
<dt><a href="#triggersAudioRecorder">triggersAudioRecorder(target, metadata, [position])</a></dt>
<dd><p>Check for audio recorder</p>
</dd>
<dt><a href="#triggersCamera">triggersCamera([target], [mode], [position])</a></dt>
<dd><p>Check for camera triggering parameters</p>
</dd>
<dt><a href="#triggersSuggestion">triggersSuggestion([label], [value], [style])</a></dt>
<dd><p>Check for suggestion to contain specific attributes</p>
</dd>
<dt><a href="#triggersUpload">triggersUpload(target, [position])</a></dt>
<dd><p>Check upload trigger</p>
</dd>
<dt><a href="#isDirective">isDirective(directiveType, [particle])</a></dt>
<dd><p>Check for directive</p>
</dd>
<dt><a href="#doesPlayAudio">doesPlayAudio(url, [position])</a></dt>
<dd><p>Check for audio to be player</p>
</dd>
<dt><a href="#doesCopyToClipboad">doesCopyToClipboad(text, [position])</a></dt>
<dd><p>Check for text copied to the clipboard</p>
</dd>
<dt><a href="#doesComposeAnEmail">doesComposeAnEmail([recipients], [subject], [body], [position])</a></dt>
<dd><p>Check for mail to be composed</p>
</dd>
<dt><a href="#doesPhoneCall">doesPhoneCall(number, [position])</a></dt>
<dd><p>Check for a number to be called</p>
</dd>
<dt><a href="#doesOpenAnUrl">doesOpenAnUrl(url, [position])</a></dt>
<dd><p>Check for an url to be opened</p>
</dd>
<dt><a href="#isSticky">isSticky([typeToCheckFor], [dataToCheckFor])</a></dt>
<dd><p>Check for particle to contain specific sticky attributes</p>
</dd>
<dt><a href="#isIntent">isIntent(intent, confidenceThreshold)</a></dt>
<dd><p>Check the expected Intent to have a minimal confidence</p>
</dd>
<dt><a href="#says">says(text, [contentType], [position])</a></dt>
<dd></dd>
<dt><a href="#getKeys">getKeys(obj, val, path, [exact])</a> ⇒ <code>Array</code></dt>
<dd><p>Search key for value in nested object
Acknowledgment: <a href="https://gist.github.com/YagoLopez/1c2fe87d255fc64d5f1bf6a920b67484#gistcomment-3422131">https://gist.github.com/YagoLopez/1c2fe87d255fc64d5f1bf6a920b67484#gistcomment-3422131</a></p>
</dd>
<dt><a href="#fuzzyDataSearchTest">fuzzyDataSearchTest(obj, searchTerm, attribute)</a></dt>
<dd><p>Do a fuzzy object search on the data attribute of the content or directive response part
Narrows search down to specific attribute
Supports nested objects with more complex structure</p>
</dd>
<dt><a href="#adaptSearchRange">adaptSearchRange(particle, typeToAdapt, elementToSearch)</a> ⇒</dt>
<dd><p>Adapt particle to search by removing all other elements</p>
</dd>
<dt><a href="#narrowParticle">narrowParticle(position, type)</a> ⇒ <code>Object</code></dt>
<dd><p>Narrow a particle down to a message at a specific position
F.ex narrow the particle down to only have the second message as content/directive</p>
</dd>
<dt><a href="#isValidInput">isValidInput(input)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks the form validation for the input
Should be either String or number</p>
</dd>
</dl>

<a name="sendMessage"></a>

## sendMessage(msg) ⇒ <code>Object</code>
Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be send |

<a name="sendReply"></a>

## sendReply(msg) ⇒ <code>Object</code>
Send Reply

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be replied |

<a name="sendAction"></a>

## sendAction(action, [data]) ⇒ <code>Object</code>
Sends an action

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | to be performed |
| [data] | <code>String</code> | Metadata of action requests (optional) |

<a name="sendAdaptiveCardAction"></a>

## sendAdaptiveCardAction(action, [position], [actionIndex]) ⇒ <code>Object</code>
Send adaptive card action with data attribute
Useful f.ex for actions like Button clicks on adaptive cards

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| action | <code>String</code> | <code></code> | to select for the adaptive card |
| [position] | <code>Number</code> |  | of Adaptive Card to check(Optional). Default: Search all messages in particle |
| [actionIndex] | <code>Number</code> |  | of action to check(Optional). Useful, when there are multiple actions with the same name in the Messages. Default: Use the data of the first action found |

<a name="sendRequest"></a>

## sendRequest(payload) ⇒ <code>Object</code>
Send request to particle API Endpoint

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | to be send to the API endpoint |

<a name="isResponseOk"></a>

## isResponseOk()
Check that the response is ok

**Kind**: global function  
<a name="isReprompt"></a>

## isReprompt([typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])
Check for particle to contain specific re-prompt attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [typeToCheck] | <code>String</code> | of the re-prompt(Optional) |
| [typeToCheck] | <code>String</code> | to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional) |
| [hintToCheck] | <code>String</code> | for the re-prompt(Optional) |
| [patternToCheck] | <code>String</code> | of the re-prompt(Optional) |

<a name="isContentType"></a>

## isContentType(contentType, [particle])
Check for an expected content type in array of contents

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| contentType | <code>String</code> | type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download |
| [particle] | <code>Object</code> | to check for(Optional) |

<a name="showsAdaptiveCard"></a>

## showsAdaptiveCard(adaptiveCardContent, [position])
Check adaptive card for Content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adaptiveCardContent | <code>String</code> | to expect in card |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsDownload"></a>

## showsDownload(url, [position])
Check download content type

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | to expect for download |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsExpandable"></a>

## showsExpandable([title], [html], [position])
Check for expandable content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>String</code> | to expect in expandable(Optional) |
| [html] | <code>String</code> | to expect in expandable(Optional) |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsHtml"></a>

## showsHtml(html, [position])
Check for expected html

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | to expect |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.. |

<a name="showsImage"></a>

## showsImage(imageSource, [position])
Check expected image

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| imageSource | <code>String</code> | or url to expect for image |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsMap"></a>

## showsMap([lat], [lng], [position])
Check expected map

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [lat] | <code>String</code> | to expect in map(Optional) |
| [lng] | <code>String</code> | to expect in map(Optional) |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsMedia"></a>

## showsMedia(mediaUrl, [position])
Check expected media

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| mediaUrl | <code>String</code> | to expect in card |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="showsText"></a>

## showsText(text, [position])
Check Plain node for expected text

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | to expect |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="triggersStickyClear"></a>

## triggersStickyClear()
Check whether sticky was cleared

**Kind**: global function  
<a name="triggersAudioRecorder"></a>

## triggersAudioRecorder(target, metadata, [position])
Check for audio recorder

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> | expected to trigger audio recorder(Optional) |
| metadata | <code>String</code> | expected metadata for the audio recorder(Optional) |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="triggersCamera"></a>

## triggersCamera([target], [mode], [position])
Check for camera triggering parameters

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>String</code> | expected to trigger camera(Optional) |
| [mode] | <code>String</code> | expected to use for uploading(Optional) |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="triggersSuggestion"></a>

## triggersSuggestion([label], [value], [style])
Check for suggestion to contain specific attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [label] | <code>String</code> | to expect(optional) |
| [value] | <code>String</code> | to expect(optional) |
| [style] | <code>String</code> | to expect. One of: default, good, warning, alert, highlight(Optional) |

<a name="triggersUpload"></a>

## triggersUpload(target, [position])
Check upload trigger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> | to expect when upload complete |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="isDirective"></a>

## isDirective(directiveType, [particle])
Check for directive

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| directiveType | <code>String</code> | type:url.open, email.compose, phone.call, clipboard.copy, audio.play |
| [particle] | <code>Object</code> | to check for(Optional) |

<a name="doesPlayAudio"></a>

## doesPlayAudio(url, [position])
Check for audio to be player

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | to be expected to play |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="doesCopyToClipboad"></a>

## doesCopyToClipboad(text, [position])
Check for text copied to the clipboard

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | to expect in clipboard |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="doesComposeAnEmail"></a>

## doesComposeAnEmail([recipients], [subject], [body], [position])
Check for mail to be composed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [recipients] | <code>String</code> | to expect in mail(optional) |
| [subject] | <code>String</code> | to expect in mail(optional) |
| [body] | <code>String</code> | to expect in mail(optional) |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="doesPhoneCall"></a>

## doesPhoneCall(number, [position])
Check for a number to be called

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>String</code> | to expect as phone call |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="doesOpenAnUrl"></a>

## doesOpenAnUrl(url, [position])
Check for an url to be opened

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | to expect |
| [position] | <code>Number</code> | nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages. |

<a name="isSticky"></a>

## isSticky([typeToCheckFor], [dataToCheckFor])
Check for particle to contain specific sticky attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [typeToCheckFor] | <code>String</code> | for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional) |
| [dataToCheckFor] | <code>Object</code> | for the sticky(Optional) |

<a name="isIntent"></a>

## isIntent(intent, confidenceThreshold)
Check the expected Intent to have a minimal confidence

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | to expect |
| confidenceThreshold | <code>int</code> | to at least have |

<a name="says"></a>

## says(text, [contentType], [position])
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | expected to be said |
| [contentType] | <code>String</code> | that should say the text(optional) Content types with speak attributes: adaptivecard, plain, html, media, map, expandable, image, download |
| [position] | <code>String</code> | of the element that says the text(optional) |

<a name="getKeys"></a>

## getKeys(obj, val, path, [exact]) ⇒ <code>Array</code>
Search key for value in nested object
Acknowledgment: https://gist.github.com/YagoLopez/1c2fe87d255fc64d5f1bf6a920b67484#gistcomment-3422131

**Kind**: global function  
**Returns**: <code>Array</code> - with the key for the value and the path to the key  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | to search values in |
| val | <code>String</code> | to search the key to |
| path | <code>String</code> | to the key. Used in recursion |
| [exact] | <code>Boolean</code> | to search for an exact match of the given value(Optional). Default is fuzzy search |

<a name="fuzzyDataSearchTest"></a>

## fuzzyDataSearchTest(obj, searchTerm, attribute)
Do a fuzzy object search on the data attribute of the content or directive response part
Narrows search down to specific attribute
Supports nested objects with more complex structure

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | with data attribute to search in: content or directive |
| searchTerm | <code>String</code> | to fuzzy search |
| attribute | <code>String</code> | to narrow search to |

<a name="adaptSearchRange"></a>

## adaptSearchRange(particle, typeToAdapt, elementToSearch) ⇒
Adapt particle to search by removing all other elements

**Kind**: global function  
**Returns**: adapted Particle  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to adapt search to |
| typeToAdapt | <code>String</code> | search query to |
| elementToSearch | <code>String</code> | and adapt search for |

<a name="narrowParticle"></a>

## narrowParticle(position, type) ⇒ <code>Object</code>
Narrow a particle down to a message at a specific position
F.ex narrow the particle down to only have the second message as content/directive

**Kind**: global function  
**Returns**: <code>Object</code> - particle  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>String</code> | of message to narrow particle down |
| type | <code>String</code> | of message to narrow particle down. Either content or directives. |

<a name="isValidInput"></a>

## isValidInput(input) ⇒ <code>boolean</code>
Checks the form validation for the input
Should be either String or number

**Kind**: global function  
**Returns**: <code>boolean</code> - whether it is valid or not  

| Param | Description |
| --- | --- |
| input | to be checked |

