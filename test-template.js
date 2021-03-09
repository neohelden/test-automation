const token = pm.response.json().token
const locale = 'de-DE'
let replyId = null

// TODO 1. INSERT WORKSPACE NAME HERE
const workspace = '[WORKSPACE_NAME]'

async function main() {
  let particle

  // TODO 2. ADD TEST CASES HERE

  return 'Done'
}

//!---------------------------------------!
//WARNING: DO NOT EDIT THE CODE CODE BELOW
//!---------------------------------------!

// ------ FLOW COMPONENTS ------

/**
 * Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...
 * @param {String} msg - to be send
 * @returns request for reply
 */
const message = async (msg) => {
  return sendRequest({
    type: 'message',
    message: msg,
    locale: locale,
  })
}

/**
 * Send Reply
 * @param {String} msg - to be replied
 * @returns {JSON} response
 */
const reply = async (msg) => {
  return sendRequest({
    type: 'reply',
    message: msg,
    locale: locale,
    replyId: replyId ? replyId : '',
  })
}

/**
 *
 * @param {String} action to be performed
 * @param {String} [data] Metadata of action requests (optional)
 * @returns {JSON} response
 */
const action = async (action, data) => {
  return sendRequest({
    type: 'action',
    action: action,
    data: data ? data : '',
    locale: locale,
  })
}

/**
 * Send request to particle API Endpoint
 * @param {Object} payload to be send to the API endpoint
 * @returns {JSON} response
 */
const sendRequest = async (payload) => {
  console.log('INFO Payload for request:', payload)
  replyId = null
  return new Promise((resolve, reject) => {
    pm.sendRequest(
      {
        method: 'POST',
        url: `https://${workspace}.neohelden.com/api/v1/particle`,
        header: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify(payload),
        },
      },
      (err, response) => {
        if (err) {
          console.error('ERROR making the API request:', err)
          reject(err)
        }

        let rspJson = response.json()
        if (rspJson.response.replyId) {
          replyId = rspJson.response.replyId
        }
        console.log('INFO JSON response:', rspJson)
        resolve(rspJson)
      }
    )
  })
}

/**
 * Check that the response is ok
 */
const isResponseOk = () => {
  pm.test('Response should be okay to process', function () {
    pm.response.to.not.be.error
    pm.response.to.have.status(200)
  })
}

// ------ NEO CONTENTS ------

/**
 * Check for an expected content type in array of contents
 * @param {Object} particle to check for
 * @param {String} contentType type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download
 */
const isContentType = (particle, contentType) => {
  const { content } = particle.response
  pm.test(`Check for content type ${contentType}`, () => {
    pm.expect(content.map((contentElem) => contentElem['type'])).includes(contentType)
  })
}

/**
 * Check adaptive card for Content
 * @param {Object} particle to check for
 * @param {String} adaptiveCardContent to expect in card
 */
const showsAdaptiveCard = (particle, adaptiveCardContent) => {
  isContentType(particle, 'adaptivecard')
  fuzzyDataSearchTest(particle.response.content, adaptiveCardContent)
}

/**
 * Check download content type
 * @param {Object} particle to check for
 * @param {String} url to expect for download
 */
const showsDownload = (particle, url) => {
  isContentType(particle, 'download')
  fuzzyDataSearchTest(particle.response.content, url)
}

/**
 * Check for expandable content
 * @param {Object} particle to check for
 * @param {String} title to expect in expandable
 * @param {String} html to expect in expandable
 */
const showsExpandable = (particle, title, html) => {
  isContentType(particle, 'expandable')
  simpleDataSearchTest(particle.response.content, title)
  simpleDataSearchTest(particle.response.content, html)
}

/**
 * Check for expected html
 * @param {Object} particle to check for
 * @param {String} html to expect
 */
const showsHtml = (particle, html) => {
  isContentType(particle, 'html')
  simpleDataSearchTest(particle.response.content, html)
}

/**
 * Check expected image
 * @param {Object} particle to check for
 * @param {String} imageSource or url to expect for image
 */
const showsImage = (particle, imageSource) => {
  isContentType(particle, 'image')
  simpleDataSearchTest(particle.response.content, imageSource)
}

/**
 * Check expected map
 * @param {Object} particle to check for
 * @param {String} lat to expect in map
 * @param {String} lng to expect in map
 */
const showsMap = (particle, lat, lng) => {
  isContentType(particle, 'map')
  simpleDataSearchTest(particle.response.content, lat)
  simpleDataSearchTest(particle.response.content, lng)
}

/**
 * Check expected media
 * @param {Object} particle to check for
 * @param {String} mediaUrl to expect in card
 */
const showsMedia = (particle, mediaUrl) => {
  isContentType(particle, 'media')
  simpleDataSearchTest(particle.response.content, mediaUrl)
}

/**
 * Check Plain node for expected text
 * @param {Object} particle to check for
 * @param {String} text to expect
 */
const showsPlain = (particle, text) => {
  isContentType(particle, plain)
  simpleDataSearchTest(particle.response.content, text)
}

// ------ NEO CONTROLS ------

// ------ NEO DIRECTIVES ------

/**
 * Check for directive
 * @param {Object} particle to check for
 * @param {String} directiveType type:url.open, email.compose, phone.call, clipboard.copy, audio.play
 */
const isDirective = (particle, directiveType) => {
  const { directives } = particle.response
  pm.test(`Check for directive ${directiveType}`, () => {
    pm.expect(directives.map((directive) => directive['type'])).includes(directiveType)
  })
}

/**
 * Check for directive to contain specific data
 * @param {Object} particle to check for
 * @param {Object} dataToCheck with key:values to check in the data response
 */
const containsDirectiveData = (particle, dataToCheck) => {
  const { directives } = particle.response
  pm.test(`Check directive data`, () => {
    pm.expect(directives.map((directive) => directive['data'])).includes(dataToCheck)
  })
}

/**
 * Check for particle to contain specific suggestion attributes
 * @param {Object} particle to check
 * @param {String} [label] to expect(optional)
 * @param {String} [value] to expect(optional)
 * @param {String} [style] to expect. One of: default, good, warning, alert, highlight(Optional)
 */
const containsSuggestion = (particle, label = null, value = null, style = null) => {
  const { suggestions } = particle.response
  pm.test(`Check for suggestion values.`, () => {
    if (label) {
      pm.expect(suggestions.map((suggestion) => suggestion['label'])).includes(label)
    }
    if (value) {
      pm.expect(suggestions.map((suggestion) => suggestion['value'])).includes(value)
    }
    if (style) {
      pm.expect(suggestions.map((suggestion) => suggestion['style'])).includes(style)
    }
  })
}

/**
 * Check for particle to contain specific re-prompt attributes
 * @param {Object} particle to check for
 * @param {String} [typeToCheck] of the re-prompt(Optional)
 * @param {String} [typeToCheck] to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional)
 * @param {String} [hintToCheck] for the re-prompt(Optional)
 * @param {String} [patternToCheck] of the re-prompt(Optional)
 */
const containsReprompt = (particle, typeToCheck = null, hintToCheck = null, patternToCheck = null) => {
  const { type, hint, pattern } = particle.response.reprompt
  pm.test(`Check for re-prompt values.`, () => {
    if (typeToCheck) {
      pm.expect(type).to.include(typeToCheck)
    }
    if (hintToCheck) {
      pm.expect(hint).to.include(hintToCheck)
    }
    if (patternToCheck) {
      pm.expect(pattern).to.include(patternToCheck)
    }
  })
}

/**
 * Check for particle to contain specific sticky attributes
 * @param {Object} particle to check for
 * @param {String} [typeToCheckFor] for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional)
 * @param {Object} [dataToCheckFor] for the sticky(Optional)
 */
const containsSticky = (particle, typeToCheckFor = null, dataToCheckFor = null) => {
  const { type, data } = particle.response.sticky
  pm.test(`Check for sticky values.`, () => {
    if (typeToCheckFor) {
      pm.expect(type).to.include(typeToCheckFor)
    }
    if (dataToCheckFor) {
      pm.expect(data).to.include(dataToCheckFor)
    }
  })
}

// ------ INTENTS ------

/**
 * Check the expected Intent to have a minimal confidence
 * @param {Object} particle to check for
 * @param {String} intent to expect
 * @param {int} confidenceThreshold to at least have
 */
const isIntent = (particle, intent, confidenceThreshold) => {
  const { name, confidence } = particle.request.intent

  pm.test(`Check for expected intent: ${intent} with confidence: ${confidenceThreshold}`, () => {
    pm.expect(name).to.eql(intent)
    pm.expect(confidence).to.be.at.least(confidenceThreshold, 'Confidence too low')
  })
}

// ------ HELPERS ------

/**
 * Search value in nested object
 * @param {Object} obj to search values in
 * @param {String} val to search
 * @returns {Array} of keys that match certain value
 */
const getKeys = (obj, val) => {
  var objects = []
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) continue // Check for edge cases
    if (typeof obj[prop] == 'object') {
      objects = objects.concat(getKeys(obj[prop], val)) // Recursive call
    } else if (obj[prop] == val) {
      objects.push(prop)
    }
  }
  return objects
}

/**
 * Do a fuzzy search on the data attribute of the content or directive response part
 * @param {Object} obj with data attribute to search in: content or directive
 * @param {String} searchTerm to fuzzy search
 */
const fuzzyDataSearchTest = (obj, searchTerm) => {
  const data = obj.map((contentElem) => contentElem['data'])
  pm.test(`Fuzzy search for ${searchTerm}`, () => {
    pm.expect(getKeys(data, searchTerm)).not.be.empty
  })
}

/**
 * Do a fuzzy object search on the data attribute of the content or directive response part
 * Supports nested objects with more complex structure
 * @param {Object} obj with data attribute to search in: content or directive
 * @param {String} searchTerm to fuzzy search
 */
const fuzzyDataSearchTest = (obj, searchTerm) => {
  const data = obj.map((contentElem) => contentElem['data'])
  pm.test(`Fuzzy search for ${searchTerm}`, () => {
    pm.expect(getKeys(data, searchTerm)).not.be.empty
  })
}

/**
 * Check for data in simple, not further nested object attributes
 * @param {Object} obj to search in
 * @param {Object} dataToSearch to search in
 */
const simpleDataSearchTest = (obj, dataToSearch) => {
  pm.test(`Search ${dataToSearch} in given object`, () => {
    pm.expect(obj.map((contentElem) => contentElem['data'])).includes(dataToSearch)
  })
}

// Do not remove the lines down below; required for async tests
const interval = setTimeout(() => {}, 50000)
main().then(() => {
  console.log('Completely done! 🚀')
  clearTimeout(interval)
})
