;() => {
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
   * Sends an action
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
   * Send adaptive card action with data attribute
   * Useful f.ex for actions like Button clicks on adaptive cards
   * @param {String} action to select for the adaptive card
   * @param {Number} [position] of Adaptive Card to check(Optional).
   * Default: Search all messages in particle
   * @param {Number} [actionIndex] of action to check(Optional). Useful, when there are multiple actions with the same name in the Messages.
   * Default: Use the data of the first action found
   * @returns {Object} particle
   */
  const sendAdaptiveCardAction = async (action = null, { position = null, actionIndex = 0 } = {}) => {
    const restrictedParticle = narrowParticle(position, 'content')
    const hasAdaptiveCard = restrictedParticle.response.content
      .map((contentElem) => contentElem['type'])
      .includes('adaptivecard')

    // Form validation: Check, that we have at least one adaptive card
    if (!hasAdaptiveCard || !action) {
      pm.test(`Send adaptive card with data for action ${action}`, () => {
        pm.expect.fail(`No adaptive card found or no action provided!`)
      })
      return
    }

    // Process:
    // 1. Search path to action object and respective AC if there are more than one
    // 2. Evaluate value at path(Action contents)
    // 3. Send actual action with data contents
    try {
      // Search for path to action
      // As default, we take the first value found = actionIndex
      const { key, path } = getKeys(restrictedParticle.response.content, action, { exact: true })[actionIndex]
      // Get the index of the AC
      // This is the case with multiple ACs
      let adaptiveCardIndex = 0
      if (Number.isInteger(parseInt(path[0]))) {
        adaptiveCardIndex = path.shift()
      }

      // Construct path to action
      const dataPath = `restrictedParticle.response.content[${adaptiveCardIndex}].${path.join('.')}`
      const data = eval(dataPath)

      // Make query
      particle = await sendAction(action, data)
      return particle
    } catch (error) {
      console.error(error)
      pm.test(`Send adaptive card with data for action ${action}`, () => {
        pm.expect.fail(`Action ${action} at action position ${actionIndex} probably not found.\n${error}`)
      })
      return
    }
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
      if (typeToCheck && isValidInput(typeToCheck)) {
        pm.expect(type).to.include(typeToCheck)
      }
      if (hintToCheck && isValidInput(hintToCheck)) {
        pm.expect(hint).to.include(hintToCheck)
      }
      if (patternToCheck && isValidInput(patternToCheck)) {
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
    if (!isValidInput(contentType)) return
    const { content } = customParticle.response
    pm.test(`Check for content type ${contentType}`, () => {
      pm.expect(content.map((contentElem) => contentElem['type'])).includes(contentType)
    })
  }

  /**
   * Check adaptive card for Content
   * @param {String} adaptiveCardContent to expect in card
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsAdaptiveCard = (adaptiveCardContent, { position = null } = {}) => {
    if (!isValidInput(adaptiveCardContent)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('adaptivecard', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, adaptiveCardContent, 'card')
  }

  /**
   * Check download content type
   * @param {String} url to expect for download
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsDownload = (url, { position = null } = {}) => {
    if (!isValidInput(url)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('download', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, url, 'files')
  }

  /**
   * Check for expandable content
   * @param {String} [title] to expect in expandable(Optional)
   * @param {String} [html] to expect in expandable(Optional)
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsExpandable = ({ title = null, html = null, position = null } = {}) => {
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('expandable', { particle: restrictedParticle })
    if (title && isValidInput(title)) fuzzyDataSearchTest(restrictedParticle.response.content, title, 'title')
    if (html && isValidInput(html)) fuzzyDataSearchTest(restrictedParticle.response.content, html, 'html')
  }

  /**
   * Check for expected html
   * @param {String} html to expect
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages..
   */
  const showsHtml = (html, { position = null } = {}) => {
    if (!isValidInput(html)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('html', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, html, 'html')
  }

  /**
   * Check expected image
   * @param {String} imageSource or url to expect for image
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsImage = (imageSource, { position = null } = {}) => {
    if (!isValidInput(imageSource)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('image', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, imageSource, 'src')
  }

  /**
   * Check expected map
   * @param {String} [lat] to expect in map(Optional)
   * @param {String} [lng] to expect in map(Optional)
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsMap = ({ lat = null, lng = null, position = null } = {}) => {
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('map', { particle: restrictedParticle })
    if (lat && isValidInput(lat)) fuzzyDataSearchTest(restrictedParticle.response.content, lat, 'lat')
    if (lng && isValidInput(lng)) fuzzyDataSearchTest(restrictedParticle.response.content, lng, 'lng')
  }

  /**
   * Check expected media
   * @param {String} mediaUrl to expect in card
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsMedia = (mediaUrl, { position = null } = {}) => {
    if (!isValidInput(mediaUrl)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('media', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, mediaUrl, 'url')
  }

  /**
   * Check Plain node for expected text
   * @param {String} text to expect
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const showsText = (text, { position = null } = {}) => {
    if (!isValidInput(text)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('plain', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, text, 'text')
  }

  // ------ NEO CONTROLS ------

  /**
   * Check whether sticky was cleared
   */
  const triggersStickyClear = () => {
    const { sticky } = particle.response
    pm.test(`Check for cleared sticky value`, () => {
      pm.expect(sticky).to.be.false
    })
  }

  /**
   * Check for audio recorder
   * @param {String} target expected to trigger audio recorder(Optional)
   * @param {String} metadata expected metadata for the audio recorder(Optional)
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const triggersAudioRecorder = ({ target = null, metadata = null, position = null } = {}) => {
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('audio.recorder', { particle: restrictedParticle })
    if (target && isValidInput(target)) fuzzyDataSearchTest(restrictedParticle.response.content, target, 'target')
    if (metadata && isValidInput(metadata))
      fuzzyDataSearchTest(restrictedParticle.response.content, metadata, 'metadata')
  }

  /**
   * Check for camera triggering parameters
   * @param {String} [target] expected to trigger camera(Optional)
   * @param {String} [mode] expected to use for uploading(Optional)
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const triggersCamera = ({ target = null, mode = null, position = null } = {}) => {
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('camera', { particle: restrictedParticle })
    if (target && isValidInput(target)) fuzzyDataSearchTest(restrictedParticle.response.content, target, 'target')
    if (mode && isValidInput(mode)) fuzzyDataSearchTest(restrictedParticle.response.content, mode, 'mode')
  }

  /**
   * Check for suggestion to contain specific attributes
   * @param {String} [label] to expect(optional)
   * @param {String} [value] to expect(optional)
   * @param {String} [style] to expect. One of: default, good, warning, alert, highlight(Optional)
   */
  const triggersSuggestion = ({ label = null, value = null, style = null } = {}) => {
    const { suggestions } = particle.response
    pm.test(`Check for suggestion label`, () => {
      if (label && isValidInput(label)) {
        pm.expect(suggestions.map((suggestion) => suggestion['label'])).includes(label)
      }
    })
    pm.test(`Check for suggestion value`, () => {
      if (value && isValidInput(value)) {
        pm.expect(suggestions.map((suggestion) => suggestion['value'])).includes(value)
      }
    })
    pm.test(`Check for suggestion style`, () => {
      if (style && isValidInput(style)) {
        pm.expect(suggestions.map((suggestion) => suggestion['style'])).includes(style)
      }
    })
  }

  /**
   * Check upload trigger
   * @param {String} target to expect when upload complete
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const triggersUpload = (target, { position = null } = {}) => {
    if (!isValidInput(target)) return
    const restrictedParticle = narrowParticle(position, 'content')
    isContentType('upload', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, target, 'target')
  }

  // ------ NEO DIRECTIVES ------

  /**
   * Check for directive
   * @param {String} directiveType type:url.open, email.compose, phone.call, clipboard.copy, audio.play
   * @param {Object} [particle] to check for(Optional)
   */
  const isDirective = (directiveType, { customParticle = particle } = {}) => {
    if (!isValidInput(directiveType)) return
    const { directives } = customParticle.response
    pm.test(`Check for directive ${directiveType}`, () => {
      pm.expect(directives.map((directive) => directive['type'])).includes(directiveType)
    })
  }

  /**
   * Check for audio to be player
   * @param {String} url to be expected to play
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const doesPlayAudio = (url, { position = null } = {}) => {
    if (!isValidInput(url)) return
    const restrictedParticle = narrowParticle(position, 'directives')
    isDirective('audio', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, url, 'url')
  }

  /**
   * Check for text copied to the clipboard
   * @param {String} text to expect in clipboard
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const doesCopyToClipboard = (text, { position = null } = {}) => {
    if (!isValidInput(text)) return
    const restrictedParticle = narrowParticle(position, 'directives')
    isDirective('clipboard.copy', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, text, 'text')
  }

  /**
   * Check for mail to be composed
   * @param {String} [recipients] to expect in mail(optional)
   * @param {String} [subject] to expect in mail(optional)
   * @param {String} [body] to expect in mail(optional)
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const doesComposeAnEmail = ({ recipients = null, subject = null, body = null, position = null } = {}) => {
    const restrictedParticle = narrowParticle(position, 'directives')
    isDirective('email.compose', { particle: restrictedParticle })
    if (recipients && isValidInput(recipients))
      fuzzyDataSearchTest(restrictedParticle.response.directives, recipients, 'recipients')
    if (subject && isValidInput(subject))
      fuzzyDataSearchTest(restrictedParticle.response.directives, subject, 'subject')
    if (body && isValidInput(body)) fuzzyDataSearchTest(restrictedParticle.response.directives, body, 'body')
  }

  /**
   * Check for a number to be called
   * @param {String} number to expect as phone call
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const doesPhoneCall = (number, { position = null } = {}) => {
    if (!isValidInput(number)) return
    const restrictedParticle = narrowParticle(position, 'directives')
    isDirective('phone.call', { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.directives, number, 'number')
  }

  /**
   * Check for an url to be opened
   * @param {String} url to expect
   * @param {Number} [position] nth Element to check(Optional). Default: Search whether a content type with the attribute exists in all messages.
   */
  const doesOpenAnUrl = (url, { position = null } = {}) => {
    if (!isValidInput(url)) return
    const restrictedParticle = narrowParticle(position, 'directives')
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
      if (typeToCheckFor && isValidInput(typeToCheckFor)) {
        pm.expect(type).to.include(typeToCheckFor)
      }
      if (dataToCheckFor && isValidInput(dataToCheckFor)) {
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
    if (!isValidInput(intent)) return
    if (!isValidInput(confidenceThreshold)) return
    const { name, confidence } = particle.request.intent

    pm.test(`Check for expected intent: ${intent} with confidence: ${confidenceThreshold}`, () => {
      pm.expect(name).to.eql(intent)
      pm.expect(confidence).to.be.at.least(confidenceThreshold, 'Confidence too low')
    })
  }

  // ------ SAYS ------

  /**
   *
   * @param {String} text expected to be said
   * @param {String} [contentType] that should say the text(optional)
   * Content types with speak attributes: adaptivecard, plain, html, media, map, expandable, image, download
   * @param {String} [position] of the element that says the text(optional)
   */
  const says = (text, { contentType = null, position = null } = {}) => {
    if (!isValidInput(text)) return
    const speakContentTypes = ['adaptivecard', 'plain', 'html', 'media', 'map', 'expandable', 'image', 'download']
    const restrictedParticle = narrowParticle(position, 'content')
    const { content } = particle.response

    // TODO This is due to API Inconsistencies with the speak attribute
    // See: https://app.asana.com/0/931187879943971/1200073445394197/f
    const hasSpeakInconsistencies = content.reduce((pValue, currentContent) => {
      return currentContent.speak ? true : false
    }, false)

    if (hasSpeakInconsistencies) {
      // Move speak attribute down to the data object
      content.map((contentObj, index) => {
        restrictedParticle.response.content[index].data.speak = contentObj.speak
        delete restrictedParticle.response.content[index].speak
      })
    }
    if (speakContentTypes.includes(contentType)) isContentType(contentType, { particle: restrictedParticle })
    fuzzyDataSearchTest(restrictedParticle.response.content, text, 'speak')
  }

  // ------ HELPERS ------

  /**
   * Search key for value in nested object
   * Acknowledgment: https://gist.github.com/YagoLopez/1c2fe87d255fc64d5f1bf6a920b67484#gistcomment-3422131
   * @param {Object} obj to search values in
   * @param {String} val to search the key to
   * @param {String} path to the key. Used in recursion
   * @param {Boolean} [exact] to search for an exact match of the given value(Optional). Default is fuzzy search
   * @returns {Array} with the key for the value and the path to the key
   */
  const getKeys = (obj, val, { exact = null, path = [] } = {}) => {
    var objects = []
    for (const prop in obj) {
      // Clone path
      const newPath = path.slice()
      if (!obj.hasOwnProperty(prop)) continue // Check for edge cases
      if (typeof obj[prop] == 'object') {
        // Construct path:
        // Number -> Index of Array
        if (Number.isInteger(parseInt(prop)) && newPath.length > 0) {
          newPath[newPath.length - 1] = `${newPath[newPath.length - 1]}[${prop}]`
        } else {
          // Object, Array or first index
          newPath.push(prop)
        }
        objects = objects.concat(getKeys(obj[prop], val, { path: newPath, exact: exact })) // Recursive call
      } else if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        // From MDN itself: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        const escapedString = `${val}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const searchAsRegEx = new RegExp(`${escapedString}`, 'gi')
        const searchResult = exact ? obj[prop].toString().localeCompare(val) : searchAsRegEx.test(obj[prop].toString())

        const isExactMatch = searchResult === 0
        const isFuzzySearchMatch = searchResult === true
        if (isExactMatch || isFuzzySearchMatch) {
          // Fuzzy search
          objects.push({ key: prop, path: newPath })
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

    pm.test(`Fuzzy search for ${searchTerm} and attribute ${attribute}`, () => {
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

  /**
   * Narrow a particle down to a message at a specific position
   * F.ex narrow the particle down to only have the second message as content/directive
   * @param {String} position of message to narrow particle down
   * @param {String} type of message to narrow particle down. Either content or directives.
   * @returns {Object} particle
   */
  const narrowParticle = (position, type) =>
    position && Number.isInteger(position) ? adaptSearchRange(_.cloneDeep(particle), type, position) : particle

  /**
   * Checks the form validation for the input
   * Should be either String or number
   * @param input to be checked
   * @returns {boolean} whether it is valid or not
   */
  const isValidInput = (input) => {
    if (typeof input === 'string' || typeof input === 'Number') {
      return true
    }
    pm.test(`Input form validation`, () => {
      pm.expect.fail(`${input} is not a valid input of type string or number`)
    })
    return false
  }

  // TODO ADD HERE CUSTOM FUNCTIONS

  return {
    sendMessage,
    sendReply,
    sendAdaptiveCardAction,
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
    triggersStickyClear,
    triggersAudioRecorder,
    triggersCamera,
    triggersSuggestion,
    triggersUpload,
    isDirective,
    doesPlayAudio,
    doesCopyToClipboard,
    doesComposeAnEmail,
    doesPhoneCall,
    doesOpenAnUrl,
    isSticky,
    isIntent,
    getKeys,
    fuzzyDataSearchTest,
    says,
  }
}
