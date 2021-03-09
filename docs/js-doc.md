## Functions

<dl>
<dt><a href="#message">message(msg)</a> ⇒</dt>
<dd><p>Sends a message: Useful f.ex for text messages, commands(Beginning with /), reprompts,...</p>
</dd>
<dt><a href="#reply">reply(msg)</a> ⇒ <code>JSON</code></dt>
<dd><p>Send Reply</p>
</dd>
<dt><a href="#action">action(action, [data])</a> ⇒ <code>JSON</code></dt>
<dd></dd>
<dt><a href="#sendRequest">sendRequest(payload)</a> ⇒ <code>JSON</code></dt>
<dd><p>Send request to particle API Endpoint</p>
</dd>
<dt><a href="#isResponseOk">isResponseOk()</a></dt>
<dd><p>Check that the response is ok</p>
</dd>
<dt><a href="#isContentType">isContentType(particle, contentType)</a></dt>
<dd><p>Check for an expected content type in array of contents</p>
</dd>
<dt><a href="#containsContentData">containsContentData(particle, dataToCheck)</a></dt>
<dd><p>Check for particle content to contain specific data</p>
</dd>
<dt><a href="#adaptiveCardContains">adaptiveCardContains(particle, textToCheck)</a></dt>
<dd><p>Check for a Text to be in an adaptive card</p>
</dd>
<dt><a href="#getKeys">getKeys(obj, val)</a> ⇒ <code>Array</code></dt>
<dd><p>Search value in nested object</p>
</dd>
<dt><a href="#isDirective">isDirective(particle, directiveType)</a></dt>
<dd><p>Check for directive</p>
</dd>
<dt><a href="#containsDirectiveData">containsDirectiveData(particle, dataToCheck)</a></dt>
<dd><p>Check for directive to contain specific data</p>
</dd>
<dt><a href="#containsSuggestion">containsSuggestion(particle, [label], [value], [style])</a></dt>
<dd><p>Check for particle to contain specific suggestion attributes</p>
</dd>
<dt><a href="#containsReprompt">containsReprompt(particle, [typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])</a></dt>
<dd><p>Check for particle to contain specific re-prompt attributes</p>
</dd>
<dt><a href="#containsSticky">containsSticky(particle, [typeToCheckFor], [dataToCheckFor])</a></dt>
<dd><p>Check for particle to contain specific sticky attributes</p>
</dd>
</dl>

<a name="message"></a>

## message(msg) ⇒
Sends a message: Useful f.ex for text messages, commands(Beginning with /), reprompts,...

**Kind**: global function  
**Returns**: request for reply  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be send |

<a name="reply"></a>

## reply(msg) ⇒ <code>JSON</code>
Send Reply

**Kind**: global function  
**Returns**: <code>JSON</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | to be replied |

<a name="action"></a>

## action(action, [data]) ⇒ <code>JSON</code>
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
<a name="isContentType"></a>

## isContentType(particle, contentType)
Check for an expected content type in array of contents

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| contentType | <code>String</code> | type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download |

<a name="containsContentData"></a>

## containsContentData(particle, dataToCheck)
Check for particle content to contain specific data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| dataToCheck | <code>Object</code> | with key:values to check in the data response |

<a name="adaptiveCardContains"></a>

## adaptiveCardContains(particle, textToCheck)
Check for a Text to be in an adaptive card

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| textToCheck | <code>String</code> | in adaptive card |

<a name="getKeys"></a>

## getKeys(obj, val) ⇒ <code>Array</code>
Search value in nested object

**Kind**: global function  
**Returns**: <code>Array</code> - of keys that match certain value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | to search values in |
| val | <code>String</code> | to search |

<a name="isDirective"></a>

## isDirective(particle, directiveType)
Check for directive

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| directiveType | <code>String</code> | type:url.open, email.compose, phone.call, clipboard.copy, audio.play |

<a name="containsDirectiveData"></a>

## containsDirectiveData(particle, dataToCheck)
Check for directive to contain specific data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| particle | <code>Object</code> | to check for |
| dataToCheck | <code>Object</code> | with key:values to check in the data response |

<a name="containsSuggestion"></a>

## containsSuggestion(particle, [label], [value], [style])
Check for particle to contain specific suggestion attributes

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| particle | <code>Object</code> |  | to check |
| [label] | <code>String</code> | <code></code> | to expect(optional) |
| [value] | <code>String</code> | <code></code> | to expect(optional) |
| [style] | <code>String</code> | <code></code> | to expect. One of: default, good, warning, alert, highlight(Optional) |

<a name="containsReprompt"></a>

## containsReprompt(particle, [typeToCheck], [typeToCheck], [hintToCheck], [patternToCheck])
Check for particle to contain specific re-prompt attributes

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| particle | <code>Object</code> |  | to check for |
| [typeToCheck] | <code>String</code> | <code></code> | of the re-prompt(Optional) |
| [typeToCheck] | <code>String</code> |  | to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional) |
| [hintToCheck] | <code>String</code> |  | for the re-prompt(Optional) |
| [patternToCheck] | <code>String</code> |  | of the re-prompt(Optional) |

<a name="containsSticky"></a>

## containsSticky(particle, [typeToCheckFor], [dataToCheckFor])
Check for particle to contain specific sticky attributes

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| particle | <code>Object</code> |  | to check for |
| [typeToCheckFor] | <code>String</code> | <code></code> | for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional) |
| [dataToCheckFor] | <code>Object</code> | <code></code> | for the sticky(Optional) |

