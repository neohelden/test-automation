const token = pm.response.json().token
let replyId = null
const { getTestingFunctions, looseJsonParse } = eval(environment.neoTestingTools)()
getTestingFunctions()
  .then((res) => {
    let neoTestingFunctions = looseJsonParse(res)
    // Neo hilfsfunktionen:
    // TIPP: Man kann diese links am editor "einklappen" :)
    const {
      message,
      reply,
      action,
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
      showsPlainText,
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
    } = neoTestingFunctions

    // TODO 0. OPTIONAL: LOCALE ÄNDERN
    const locale = 'de-DE'
    // TODO 1. INSERT WORKSPACE NAME HERE
    const workspace = '[WORKSPACE_NAME]'

    async function main() {
      let particle

      // TODO 2. ADD TEST CASES HERE

      return 'Done'
    }

    // Do not remove the lines down below; required for async tests
    const interval = setTimeout(() => {}, 50000)
    main().then(() => {
      console.log('Completely done! 🚀')
      clearTimeout(interval)
    })
  })
  .catch((err) => console.error(err))
