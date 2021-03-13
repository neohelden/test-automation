// NOTE: THIS IS JUST A COPY FROM THE TEST FUNCTIONS TO GENERATE THE DOCS

  //!---------------------------------------!
  //WARNING: DO NOT EDIT THE CODE CODE BELOW
  //!---------------------------------------!

  // ------ FLOW COMPONENTS ------

  /**
   * Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...
   * @param {String} msg - to be send
   * @returns request for reply
   */
  const sendMessage = async (msg) => {
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
  const sendReply = async (msg) => {
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
  const sendAction = async (action, data) => {
    return sendRequest({
      type: 'action',
      action: action,
      data: data ? data : '',
      locale: locale,
      replyId: replyId ? replyId : '',
    })
  }

  /**
   * Send request to particle API Endpoint
   * @param {Object} payload to be send to the API endpoint
   * @returns {JSON} response
   */
  const sendRequest = async (payload) => {
    console.log('INFO: Payload for request:', payload)
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
          console.log('INFO: JSON response:', rspJson)
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

  // ------ NEO REPROMPT ------

  /**
   * Check for particle to contain specific re-prompt attributes
   * @param {Object} particle to check for
   * @param {String} [typeToCheck] of the re-prompt(Optional)
   * @param {String} [typeToCheck] to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional)
   * @param {String} [hintToCheck] for the re-prompt(Optional)
   * @param {String} [patternToCheck] of the re-prompt(Optional)
   */
  const isReprompt = (particle, { typeToCheck = null, hintToCheck = null, patternToCheck = null } = {}) => {
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
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsAdaptiveCard = (particle, adaptiveCardContent, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'adaptivecard')
    fuzzyDataSearchTest(particle.response.content, adaptiveCardContent)
  }

  /**
   * Check download content type
   * @param {Object} particle to check for
   * @param {String} url to expect for download
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsDownload = (particle, url, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'download')
    fuzzyDataSearchTest(particle.response.content, url)
  }

  /**
   * Check for expandable content
   * @param {Object} particle to check for
   * @param {String} [title] to expect in expandable(Optional)
   * @param {String} [html] to expect in expandable(Optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsExpandable = (particle, { title = null, html = null, elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'expandable')
    if (title) fuzzyDataSearchTest(particle.response.content, title)
    if (html) fuzzyDataSearchTest(particle.response.content, html)
  }

  /**
   * Check for expected html
   * @param {Object} particle to check for
   * @param {String} html to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsHtml = (particle, html, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'html')
    fuzzyDataSearchTest(particle.response.content, html)
  }

  /**
   * Check expected image
   * @param {Object} particle to check for
   * @param {String} imageSource or url to expect for image
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsImage = (particle, imageSource, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'image')
    fuzzyDataSearchTest(particle.response.content, imageSource)
  }

  /**
   * Check expected map
   * @param {Object} particle to check for
   * @param {String} [lat] to expect in map(Optional)
   * @param {String} [lng] to expect in map(Optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsMap = (particle, { lat = null, lng = null, elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'map')
    if (lat) fuzzyDataSearchTest(particle.response.content, lat)
    if (lng) fuzzyDataSearchTest(particle.response.content, lng)
  }

  /**
   * Check expected media
   * @param {Object} particle to check for
   * @param {String} mediaUrl to expect in card
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsMedia = (particle, mediaUrl, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'media')
    fuzzyDataSearchTest(particle.response.content, mediaUrl)
  }

  /**
   * Check Plain node for expected text
   * @param {Object} particle to check for
   * @param {String} text to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsText = (particle, text, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'plain')
    fuzzyDataSearchTest(particle.response.content, text)
  }

  // ------ NEO CONTROLS ------

  /**
   * Check for expected url to trigger audio from
   * @param {Object} particle to check for
   * @param {String} url to trigger the audio from
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersAudio = (particle, url, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'audio.play')
    fuzzyDataSearchTest(particle.response.directives, url)
  }

  /**
   * Check for camera triggering parameters
   * @param {Object} particle to check for
   * @param {String} target expected to trigger camera
   * @param {String} mode expected to use for uploading
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersCamera = (particle, { target = null, mode = null, elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'camera')
    if (target) fuzzyDataSearchTest(particle.response.content, target)
    if (mode) fuzzyDataSearchTest(particle.response.content)
  }

  const triggersStickyClear = (particle, todo, { elementNumber = null } = {}) => {
    // TODO 'action' in request?
  }

  /**
   * Check for suggestion to contain specific attributes
   * @param {Object} particle to check
   * @param {String} [label] to expect(optional)
   * @param {String} [value] to expect(optional)
   * @param {String} [style] to expect. One of: default, good, warning, alert, highlight(Optional)
   */
  const triggersSuggestion = (particle, { label = null, value = null, style = null } = {}) => {
    const { suggestions } = particle.response
    pm.test(`Check for suggestion label`, () => {
      if (label) {
        pm.expect(suggestions.map((suggestion) => suggestion['label'])).includes(label)
      }
    })
    pm.test(`Check for suggestion value`, () => {
      if (value) {
        pm.expect(suggestions.map((suggestion) => suggestion['value'])).includes(value)
      }
    })
    pm.test(`Check for suggestion style`, () => {
      if (style) {
        pm.expect(suggestions.map((suggestion) => suggestion['style'])).includes(style)
      }
    })
  }

  /**
   * Check upload trigger
   * @param {Object} particle to check for
   * @param {String} target to expect when upload complete
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersUpload = (particle, target, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType(particle, 'upload')
    fuzzyDataSearchTest(particle.response.content, target)
  }

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
   * Check for audio to be player
   * @param {Object} particle to check for
   * @param {String} url to be expected to play
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesPlayAudio = (particle, url, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'audio.play')
    fuzzyDataSearchTest(particle.response.directives, url)
  }

  /**
   * Check for text copied to the clipboard
   * @param {Object} particle to check for
   * @param {String} text to expect in clipboard
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesCopyToClipboad = (particle, text, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'clipboard.copy')
    fuzzyDataSearchTest(particle.response.directives, text)
  }

  /**
   * Check for mail to be composed
   * @param {Object} particle to check for
   * @param {String} [recipients] to expect in mail(optional)
   * @param {String} [subject] to expect in mail(optional)
   * @param {String} [body] to expect in mail(optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesComposeAnEmail = (
    particle,
    { recipients = null, subject = null, body = null, elementNumber = null } = {}
  ) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'email.compose')
    if (recipients) fuzzyDataSearchTest(particle.response.directives, recipients)
    if (subject) fuzzyDataSearchTest(particle.response.directives, subject)
    if (body) fuzzyDataSearchTest(particle.response.directives, body)
  }

  /**
   * Check for a number to be called
   * @param {Object} particle to check for
   * @param {String} number to expect as phone call
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesPhoneCall = (particle, number, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'phone.call')
    fuzzyDataSearchTest(particle.response.directives, number)
  }

  /**
   * Check for an url to be opened
   * @param {Object} particle to check for
   * @param {String} url to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesOpenAnUrl = (particle, url, { elementNumber = null } = {}) => {
    particle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective(particle, 'url.open')
    fuzzyDataSearchTest(particle.response.directives, url)
  }

  // ------ STICKY ------

  /**
   * Check for particle to contain specific sticky attributes
   * @param {Object} particle to check for
   * @param {String} [typeToCheckFor] for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional)
   * @param {Object} [dataToCheckFor] for the sticky(Optional)
   */
  const isSticky = (particle, { typeToCheckFor = null, dataToCheckFor = null } = {}) => {
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
      } else if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        let searchAsRegEx = new RegExp(`${val}`, 'gi')
        if (obj[prop].toString().match(searchAsRegEx)) {
          // Fuzzy search
          objects.push(prop)
        }
      }
    }
    return objects
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
   * Adapt particle to search by removing all other elements
   * @param {Object} particle to adapt search to
   * @param {String} typeToAdapt search query to
   * @param {String} elementToSearch and adapt search for
   * @returns adapted Particle
   */
  const adaptSearchRange = (particle, typeToAdapt, elementToSearch) => {
    // Form validation
    if (typeToAdapt != 'content' && typeToAdapt != 'directives') {
      console.error('ERROR: wrong typed passed to adapt search')
      return
    }

    // Filter/Adapt particle
    // The elem to search start's counting at 1...
    const path = `particle.response.${typeToAdapt}.slice(${elementToSearch - 1}, ${elementToSearch})`
    particle.response.content = eval(path)

    return particle
  }