## Functions

<dl>
<dt><a href="#sendMessage">sendMessage(msg)</a> ⇒</dt>
<dd><p>Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...</p>
</dd>
<dt><a href="#sendReply">sendReply(msg)</a> ⇒ <code>JSON</code></dt>
<dd><p>Send Reply</p>
</dd>
<dt><a href="#sendAction">sendAction(action, [data])</a> ⇒ <code>JSON</code></dt>
<dd></dd>
<dt><a href="#sendRequest">sendRequest(payload)</a> ⇒ <code>JSON</code></dt>
<dd><p>Send request to particle API Endpoint</p>
</dd>
<dt><a href="#isResponseOk">isResponseOk()</a></dt>
<dd><p>Check that the response is ok</p>
</dd>
<dt><a href="#isReprompt">isReprompt(particle, [typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])</a></dt>
<dd><p>Check for particle to contain specific re-prompt attributes</p>
</dd>
<dt><a href="#isContentType">isContentType(particle, contentType)</a></dt>
<dd><p>Check for an expected content type in array of contents</p>
</dd>
<dt><a href="#showsAdaptiveCard">showsAdaptiveCard(particle, adaptiveCardContent, [elementNumber])</a></dt>
<dd><p>Check adaptive card for Content</p>
</dd>
<dt><a href="#showsDownload">showsDownload(particle, url, [elementNumber])</a></dt>
<dd><p>Check download content type</p>
</dd>
<dt><a href="#showsExpandable">showsExpandable(particle, [title], [html], [elementNumber])</a></dt>
<dd><p>Check for expandable content</p>
</dd>
<dt><a href="#showsHtml">showsHtml(particle, html, [elementNumber])</a></dt>
<dd><p>Check for expected html</p>
</dd>
<dt><a href="#showsImage">showsImage(particle, imageSource, [elementNumber])</a></dt>
<dd><p>Check expected image</p>
</dd>
<dt><a href="#showsMap">showsMap(particle, [lat], [lng], [elementNumber])</a></dt>
<dd><p>Check expected map</p>
</dd>
<dt><a href="#showsMedia">showsMedia(particle, mediaUrl, [elementNumber])</a></dt>
<dd><p>Check expected media</p>
</dd>
<dt><a href="#showsText">showsText(particle, text, [elementNumber])</a></dt>
<dd><p>Check Plain node for expected text</p>
</dd>
<dt><a href="#triggersAudio">triggersAudio(particle, url, [elementNumber])</a></dt>
<dd><p>Check for expected url to trigger audio from</p>
</dd>
<dt><a href="#triggersCamera">triggersCamera(particle, target, mode, [elementNumber])</a></dt>
<dd><p>Check for camera triggering parameters</p>
</dd>
<dt><a href="#triggersSuggestion">triggersSuggestion(particle, [label], [value], [style])</a></dt>
<dd><p>Check for suggestion to contain specific attributes</p>
</dd>
<dt><a href="#triggersUpload">triggersUpload(particle, target, [elementNumber])</a></dt>
<dd><p>Check upload trigger</p>
</dd>
<dt><a href="#isDirective">isDirective(particle, directiveType)</a></dt>
<dd><p>Check for directive</p>
</dd>
<dt><a href="#doesPlayAudio">doesPlayAudio(particle, url, [elementNumber])</a></dt>
<dd><p>Check for audio to be player</p>
</dd>
<dt><a href="#doesCopyToClipboad">doesCopyToClipboad(particle, text, [elementNumber])</a></dt>
<dd><p>Check for text copied to the clipboard</p>
</dd>
<dt><a href="#doesComposeAnEmail">doesComposeAnEmail(particle, [recipients], [subject], [body], [elementNumber])</a></dt>
<dd><p>Check for mail to be composed</p>
</dd>
<dt><a href="#doesPhoneCall">doesPhoneCall(particle, number, [elementNumber])</a></dt>
<dd><p>Check for a number to be called</p>
</dd>
<dt><a href="#doesOpenAnUrl">doesOpenAnUrl(particle, url, [elementNumber])</a></dt>
<dd><p>Check for an url to be opened</p>
</dd>
<dt><a href="#isSticky">isSticky(particle, [typeToCheckFor], [dataToCheckFor])</a></dt>
<dd><p>Check for particle to contain specific sticky attributes</p>
</dd>
<dt><a href="#isIntent">isIntent(particle, intent, confidenceThreshold)</a></dt>
<dd><p>Check the expected Intent to have a minimal confidence</p>
</dd>
<dt><a href="#getKeys">getKeys(obj, val)</a> ⇒ <code>Array</code></dt>
<dd><p>Search value in nested object</p>
</dd>
<dt><a href="#fuzzyDataSearchTest">fuzzyDataSearchTest(obj, searchTerm)</a></dt>
<dd><p>Do a fuzzy object search on the data attribute of the content or directive response part
Supports nested objects with more complex structure</p>
</dd>
<dt><a href="#adaptSearchRange">adaptSearchRange(particle, typeToAdapt, elementToSearch)</a> ⇒</dt>
<dd><p>Adapt particle to search by removing all other elements</p>
</dd>
</dl>

<a name="sendMessage"></a>

## sendMessage(msg) ⇒
Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...

**Kind**: global function  
**Returns**: request for reply  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be send |

<a name="sendReply"></a>

## sendReply(msg) ⇒ <code>JSON</code>
Send Reply

**Kind**: global function  
**Returns**: <code>JSON</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be replied |

<a name="sendAction"></a>

## sendAction(action, [data]) ⇒ <code>JSON</code>
**Kind**: global function  
**Returns**: <code>JSON</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | to be performed |
| [data] | <code>String</code> | Metadata of action requests (optional) |

<a name="sendRequest"></a>

## sendRequest(payload) ⇒ <code>JSON</code>
Send request to particle API Endpoint

**Kind**: global function  
**Returns**: <code>JSON</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | to be send to the API endpoint |

<a name="isResponseOk"></a>

## isResponseOk()
Check that the response is ok

**Kind**: global function  
<a name="isReprompt"></a>

## isReprompt(particle, [typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])
Check for particle to contain specific re-prompt attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| [typeToCheck] | <code>String</code> | of the re-prompt(Optional) |
| [typeToCheck] | <code>String</code> | to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional) |
| [hintToCheck] | <code>String</code> | for the re-prompt(Optional) |
| [patternToCheck] | <code>String</code> | of the re-prompt(Optional) |

<a name="isContentType"></a>

## isContentType(particle, contentType)
Check for an expected content type in array of contents

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| contentType | <code>String</code> | type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download |

<a name="showsAdaptiveCard"></a>

## showsAdaptiveCard(particle, adaptiveCardContent, [elementNumber])
Check adaptive card for Content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| adaptiveCardContent | <code>String</code> | to expect in card |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsDownload"></a>

## showsDownload(particle, url, [elementNumber])
Check download content type

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| url | <code>String</code> | to expect for download |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsExpandable"></a>

## showsExpandable(particle, [title], [html], [elementNumber])
Check for expandable content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| [title] | <code>String</code> | to expect in expandable(Optional) |
| [html] | <code>String</code> | to expect in expandable(Optional) |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsHtml"></a>

## showsHtml(particle, html, [elementNumber])
Check for expected html

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| html | <code>String</code> | to expect |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsImage"></a>

## showsImage(particle, imageSource, [elementNumber])
Check expected image

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| imageSource | <code>String</code> | or url to expect for image |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsMap"></a>

## showsMap(particle, [lat], [lng], [elementNumber])
Check expected map

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| [lat] | <code>String</code> | to expect in map(Optional) |
| [lng] | <code>String</code> | to expect in map(Optional) |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsMedia"></a>

## showsMedia(particle, mediaUrl, [elementNumber])
Check expected media

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| mediaUrl | <code>String</code> | to expect in card |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="showsText"></a>

## showsText(particle, text, [elementNumber])
Check Plain node for expected text

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| text | <code>String</code> | to expect |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="triggersAudio"></a>

## triggersAudio(particle, url, [elementNumber])
Check for expected url to trigger audio from

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| url | <code>String</code> | to trigger the audio from |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="triggersCamera"></a>

## triggersCamera(particle, target, mode, [elementNumber])
Check for camera triggering parameters

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| target | <code>String</code> | expected to trigger camera |
| mode | <code>String</code> | expected to use for uploading |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="triggersSuggestion"></a>

## triggersSuggestion(particle, [label], [value], [style])
Check for suggestion to contain specific attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check |
| [label] | <code>String</code> | to expect(optional) |
| [value] | <code>String</code> | to expect(optional) |
| [style] | <code>String</code> | to expect. One of: default, good, warning, alert, highlight(Optional) |

<a name="triggersUpload"></a>

## triggersUpload(particle, target, [elementNumber])
Check upload trigger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| target | <code>String</code> | to expect when upload complete |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="isDirective"></a>

## isDirective(particle, directiveType)
Check for directive

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| directiveType | <code>String</code> | type:url.open, email.compose, phone.call, clipboard.copy, audio.play |

<a name="doesPlayAudio"></a>

## doesPlayAudio(particle, url, [elementNumber])
Check for audio to be player

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| url | <code>String</code> | to be expected to play |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="doesCopyToClipboad"></a>

## doesCopyToClipboad(particle, text, [elementNumber])
Check for text copied to the clipboard

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| text | <code>String</code> | to expect in clipboard |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="doesComposeAnEmail"></a>

## doesComposeAnEmail(particle, [recipients], [subject], [body], [elementNumber])
Check for mail to be composed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| [recipients] | <code>String</code> | to expect in mail(optional) |
| [subject] | <code>String</code> | to expect in mail(optional) |
| [body] | <code>String</code> | to expect in mail(optional) |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="doesPhoneCall"></a>

## doesPhoneCall(particle, number, [elementNumber])
Check for a number to be called

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| number | <code>String</code> | to expect as phone call |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="doesOpenAnUrl"></a>

## doesOpenAnUrl(particle, url, [elementNumber])
Check for an url to be opened

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| url | <code>String</code> | to expect |
| [elementNumber] | <code>Number</code> | nth Element to check(Optional) |

<a name="isSticky"></a>

## isSticky(particle, [typeToCheckFor], [dataToCheckFor])
Check for particle to contain specific sticky attributes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| [typeToCheckFor] | <code>String</code> | for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional) |
| [dataToCheckFor] | <code>Object</code> | for the sticky(Optional) |

<a name="isIntent"></a>

## isIntent(particle, intent, confidenceThreshold)
Check the expected Intent to have a minimal confidence

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| intent | <code>String</code> | to expect |
| confidenceThreshold | <code>int</code> | to at least have |

<a name="getKeys"></a>

## getKeys(obj, val) ⇒ <code>Array</code>
Search value in nested object

**Kind**: global function  
**Returns**: <code>Array</code> - of keys that match certain value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | to search values in |
| val | <code>String</code> | to search |

<a name="fuzzyDataSearchTest"></a>

## fuzzyDataSearchTest(obj, searchTerm)
Do a fuzzy object search on the data attribute of the content or directive response part
Supports nested objects with more complex structure

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | with data attribute to search in: content or directive |
| searchTerm | <code>String</code> | to fuzzy search |

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

