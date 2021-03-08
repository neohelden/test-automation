const token = pm.response.json().token
const locale = "de-DE"
let replyId = null

// TODO 1. INSERT WORKSPACE NAME HERE
const workspace = "[WORKSPACE_NAME]"

async function main() {
  let particle

  // TODO 2. ADD TEST CASES HERE

  return "Done"
}

//!---------------------------------------!
//WARNING: DO NOT EDIT THE CODE CODE BELOW
//!---------------------------------------!

/**
 * Sends a message: Useful f.ex for text messages, commands(Beginning with /), reprompts,...
 * @param {String} msg - to be send
 * @returns request for reply
 */
const message = async (msg) => {
  return sendRequest({
    type: "message",
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
    type: "reply",
    message: msg,
    locale: locale,
    replyId: replyId ? replyId : "",
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
    type: "action",
    action: action,
    data: data ? data : "",
    locale: locale,
  })
}

/**
 * Send request to particle API Endpoint
 * @param {Object} payload to be send to the API endpoint
 * @returns {JSON} response
 */
const sendRequest = async (payload) => {
  console.log("INFO Payload for request:", payload)
  replyId = null
  return new Promise((resolve, reject) => {
    pm.sendRequest(
      {
        method: "POST",
        url: `https://${workspace}.neohelden.com/api/v1/particle`,
        header: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: {
          mode: "raw",
          raw: JSON.stringify(payload),
        },
      },
      (err, response) => {
        if (err) {
          console.error("ERROR making the API request:", err)
          reject(err)
        }

        let rspJson = response.json()
        if (rspJson.response.replyId) {
          replyId = rspJson.response.replyId
        }
        console.log("INFO JSON response:", rspJson)
        resolve(rspJson)
      }
    )
  })
}

/**
 * Check that the response is ok
 */
const isResponseOk = () => {
  pm.test("Response should be okay to process", function () {
    pm.response.to.not.be.error
    pm.response.to.have.status(200)
  })
}

/**
 * Check for an expected content type in array of contents
 * @param {Object} particle to check for
 * @param {String} contentType type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download
 */
const isContentType = (particle, contentType) => {
  const { content } = particle.response
  pm.test(`Check for content type ${contentType}`, () => {
    expect(content.map((contentElem) => contentElem["type"])).includes(contentType)
  })
}

/**
 * Check for particle content to contain specific data
 * @param {Object} particle to check for
 * @param {Object} dataToCheck with key:values to check in the data response
 */
const containsContentData = (particle, dataToCheck) => {
  const { content } = particle.response
  pm.test(`Check content type data`, () => {
    expect(content.map((contentElem) => contentElem["data"])).includes(dataToCheck)
  })
}

/**
 * Check for directive
 * @param {Object} particle to check for
 * @param {String} directiveType type:url.open, email.compose, phone.call, clipboard.copy, audio.play
 */
const isDirective = (particle, directiveType) => {
  const { directives } = particle.response
  pm.test(`Check for directive ${directiveType}`, () => {
    expect(directives.map((directive) => directive["type"])).includes(directiveType)
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
    expect(directives.map((directive) => directive["data"])).includes(dataToCheck)
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
      expect(suggestions.map((suggestion) => suggestion["label"])).includes(label)
    }
    if (value) {
      expect(suggestions.map((suggestion) => suggestion["value"])).includes(value)
    }
    if (style) {
      expect(suggestions.map((suggestion) => suggestion["style"])).includes(style)
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
      expect(type).to.include(typeToCheck)
    }
    if (hintToCheck) {
      expect(hint).to.include(hintToCheck)
    }
    if (patternToCheck) {
      expect(pattern).to.include(patternToCheck)
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
      expect(type).to.include(typeToCheckFor)
    }
    if (dataToCheckFor) {
      expect(data).to.include(dataToCheckFor)
    }
  })
}

// Do not remove the lines down below; required for async tests
const interval = setTimeout(() => {}, 50000)
main().then(() => {
  console.log("Completely done! 🚀")
  clearTimeout(interval)
})
