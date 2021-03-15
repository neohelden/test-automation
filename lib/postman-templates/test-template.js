const token = pm.response.json().token
const { getNeoTestingTools } = eval(environment.neoTestingTools)()
let particle, replyId = null

// TODO 0. OPTIONAL: LOCALE ÄNDERN
const locale = 'de-DE'
// TODO 1. INSERT WORKSPACE NAME HERE
const workspace = '[WORKSPACE_NAME]'

async function main() {
  const neoTestingTools = await getNeoTestingTools()
  // Neo hilfsfunktionen:
  // TIPP: Man kann diese links am editor "einklappen" :)
  const {
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
  } = eval(neoTestingTools)()

  // TODO 2. TEST ERSTELLEN.
  // SIEHE: https://github.com/neohelden/flow-testing-manual

  return 'Done'
}

// Do not remove the lines down below; required for async tests
const interval = setTimeout(() => {}, 50000)
main().then(() => {
  console.log('Completely done! 🚀')
  clearTimeout(interval)
})