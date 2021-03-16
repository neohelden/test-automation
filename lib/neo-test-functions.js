() => {
  //!---------------------------------------!
  //WARNING: DO NOT EDIT THE CODE CODE BELOW
  //!---------------------------------------!

  // ------ FLOW COMPONENTS ------

  /**
   * Sends a message: Useful f.ex for text messages, commands(Beginning with /), re-prompts,...
   * @param {String} msg - to be send
   * @returns {Object} particle
   */
  const sendMessage = async (msg) => {
    particle = await sendRequest({
      type: 'message',
      message: msg,
      locale: locale,
    })
    return particle
  }

  /**
   * Send Reply
   * @param {String} msg - to be replied
   * @returns {Object} particle
   */
  const sendReply = async (msg) => {
    particle = await sendRequest({
      type: 'reply',
      message: msg,
      locale: locale,
      replyId: replyId ? replyId : '',
    })
    return particle
  }

  /**
   *
   * @param {String} action to be performed
   * @param {String} [data] Metadata of action requests (optional)
   * @returns {Object} particle
   */
  const sendAction = async (action, data) => {
    particle = await sendRequest({
      type: 'action',
      action: action,
      data: data ? data : '',
      locale: locale,
      replyId: replyId ? replyId : '',
    })
    return particle
  }

  /**
   * Send request to particle API Endpoint
   * @param {Object} payload to be send to the API endpoint
   * @returns {Object} particle
   */
  const sendRequest = async (payload) => {
    console.info('INFO: Payload for request:', payload)
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
          console.info('INFO: JSON response:', rspJson)
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
   * @param {String} [typeToCheck] of the re-prompt(Optional)
   * @param {String} [typeToCheck] to expect. One of: text, number, email, tel, color, date, month, password, time, url, hidden(Optional)
   * @param {String} [hintToCheck] for the re-prompt(Optional)
   * @param {String} [patternToCheck] of the re-prompt(Optional)
   */
  const isReprompt = ({ typeToCheck = null, hintToCheck = null, patternToCheck = null } = {}) => {
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
   * @param {String} contentType type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download
   * @param {Object} [particle] to check for(Optional)
   */
  const isContentType = (contentType, { customParticle = particle } = {}) => {
    const { content } = customParticle.response
    pm.test(`Check for content type ${contentType}`, () => {
      pm.expect(content.map((contentElem) => contentElem['type'])).includes(contentType)
    })
  }

  /**
   * Check adaptive card for Content
   * @param {String} adaptiveCardContent to expect in card
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsAdaptiveCard = (adaptiveCardContent, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('adaptivecard', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, adaptiveCardContent, 'card')
  }

  /**
   * Check download content type
   * @param {String} url to expect for download
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsDownload = (url, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('download', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, url, 'files')
  }

  /**
   * Check for expandable content
   * @param {String} [title] to expect in expandable(Optional)
   * @param {String} [html] to expect in expandable(Optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsExpandable = ({ title = null, html = null, elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('expandable', { particle: restrictedParticle })
    if (title) fuzzyDataSearchTest(restrictedParticle.response.content, title, 'title')
    if (html) fuzzyDataSearchTest(restrictedParticle.response.content, html, 'html')
  }

  /**
   * Check for expected html
   * @param {String} html to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsHtml = (html, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('html', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, html, 'html')
  }

  /**
   * Check expected image
   * @param {String} imageSource or url to expect for image
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsImage = (imageSource, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('image', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, imageSource, 'src')
  }

  /**
   * Check expected map
   * @param {String} [lat] to expect in map(Optional)
   * @param {String} [lng] to expect in map(Optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsMap = ({ lat = null, lng = null, elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('map', { particle: restrictedParticle })
    if (lat) fuzzyDataSearchTest(restrictedParticle.response.content, lat, 'lat')
    if (lng) fuzzyDataSearchTest(restrictedParticle.response.content, lng, 'lng')
  }

  /**
   * Check expected media
   * @param {String} mediaUrl to expect in card
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsMedia = (mediaUrl, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('media', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, mediaUrl, 'url')
  }

  /**
   * Check Plain node for expected text
   * @param {String} text to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const showsText = (text, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('plain', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, text, 'text')
  }

  // ------ NEO CONTROLS ------

  /**
   * Check for expected url to trigger audio from
   * @param {String} url to trigger the audio from
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersAudio = (url, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('audio', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, url, 'url')
  }

  /**
   * Check for camera triggering parameters
   * @param {String} target expected to trigger camera
   * @param {String} mode expected to use for uploading
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersCamera = ({ target = null, mode = null, elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('camera', { particle: restrictedParticle })
    if (target) fuzzyDataSearchTest(restrictedParticle.response.content, target, 'target')
    if (mode) fuzzyDataSearchTest(restrictedParticle.response.content, mode, 'mode')
  }

  const triggersStickyClear = (todo, { elementNumber = null } = {}) => {
    // TODO 'action' in request?
  }

  /**
   * Check for suggestion to contain specific attributes
   * @param {Object} particle to check
   * @param {String} [label] to expect(optional)
   * @param {String} [value] to expect(optional)
   * @param {String} [style] to expect. One of: default, good, warning, alert, highlight(Optional)
   */
  const triggersSuggestion = ({ label = null, value = null, style = null } = {}) => {
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
   * @param {String} target to expect when upload complete
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const triggersUpload = (target, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'content', elementNumber)
        : particle
    isContentType('upload', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content.data.target, target, 'target')
  }

  // ------ NEO DIRECTIVES ------

  /**
   * Check for directive
   * @param {String} directiveType type:url.open, email.compose, phone.call, clipboard.copy, audio.play
   * @param {Object} [particle] to check for(Optional)
   */
  const isDirective = (directiveType, { customParticle = particle } = {}) => {
    const { directives } = customParticle.response
    pm.test(`Check for directive ${directiveType}`, () => {
      pm.expect(directives.map((directive) => directive['type'])).includes(directiveType)
    })
  }

  /**
   * Check for audio to be player
   * @param {String} url to be expected to play
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesPlayAudio = (url, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('audio', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, url, 'url')
  }

  /**
   * Check for text copied to the clipboard
   * @param {String} text to expect in clipboard
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesCopyToClipboad = (text, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('clipboard.copy', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, text, 'text')
  }

  /**
   * Check for mail to be composed
   * @param {String} [recipients] to expect in mail(optional)
   * @param {String} [subject] to expect in mail(optional)
   * @param {String} [body] to expect in mail(optional)
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesComposeAnEmail = ({ recipients = null, subject = null, body = null, elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('email.compose', { particle: restrictedParticle })
    if (recipients) fuzzyDataSearchTest(restrictedParticle.response.directives, recipients, 'recipients')
    if (subject) fuzzyDataSearchTest(restrictedParticle.response.directives, subject, 'subject')
    if (body) fuzzyDataSearchTest(restrictedParticle.response.directives, body, 'body')
  }

  /**
   * Check for a number to be called
   * @param {String} number to expect as phone call
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesPhoneCall = (number, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('phone.call', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, number, 'number')
  }

  /**
   * Check for an url to be opened
   * @param {String} url to expect
   * @param {Number} [elementNumber] nth Element to check(Optional)
   */
  const doesOpenAnUrl = (url, { elementNumber = null } = {}) => {
    const restrictedParticle =
      elementNumber && Number.isInteger(elementNumber)
        ? adaptSearchRange(_.cloneDeep(particle), 'directives', elementNumber)
        : particle
    isDirective('url.open', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, url, 'url')
  }

  // ------ STICKY ------

  /**
   * Check for particle to contain specific sticky attributes
   * @param {String} [typeToCheckFor] for the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download(Optional)
   * @param {Object} [dataToCheckFor] for the sticky(Optional)
   */
  const isSticky = ({ typeToCheckFor = null, dataToCheckFor = null } = {}) => {
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
   * @param {String} intent to expect
   * @param {int} confidenceThreshold to at least have
   */
  const isIntent = (intent, confidenceThreshold) => {
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
   * Narrows search down to specific attribute
   * Supports nested objects with more complex structure
   * @param {Object} obj with data attribute to search in: content or directive
   * @param {String} searchTerm to fuzzy search
   * @param {String} attribute to narrow search to
   */
  const fuzzyDataSearchTest = (obj, searchTerm, attribute) => {
    // Map to the data attribute of the content or directive
    let data = obj.map((contentElem) => contentElem['data'])
    // From the data extract only the desired attribute to be checked
    data = data.reduce((attrFiltered, objToFilter) => {
      if (objToFilter[attribute]) attrFiltered.push(objToFilter[attribute])
      return attrFiltered
    }, [])

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

  // TODO ADD HERE CUSTOM FUNCTIONS

  return {
    sendMessage,
    sendReply,
    sendAction,
    sendRequest,
    isResponseOk,
    isReprompt,
    isContentType,
    showsAdaptiveCard,
    showsDownload,
    showsExpandable,
    showsHtml,
    showsImage,
    showsMap,
    showsMedia,
    showsText,
    triggersAudio,
    triggersCamera,
    triggersSuggestion,
    triggersUpload,
    isDirective,
    doesPlayAudio,
    doesCopyToClipboad,
    doesComposeAnEmail,
    doesPhoneCall,
    doesOpenAnUrl,
    isSticky,
    isIntent,
    getKeys,
    fuzzyDataSearchTest,
  }
}
