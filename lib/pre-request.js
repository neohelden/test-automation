postman.setEnvironmentVariable('neoTestingTools', () => {
  /**
   * Get the Neo testing functions
   * @returns {String} Neo testing helper functions as String
   */
  const getTestingFunctions = async () => {
    return new Promise((res, rej) => {
      // Example with a plain string URL
      pm.sendRequest(
        'https://raw.githubusercontent.com/neohelden/flow-testing-manual/main/lib/neo-test-func-obj.js?token=AGXSWVDPITJ7TCHBCTIY47LAKPICU',
        (error, response) => {
          if (error) {
            rej(error)
          } else {
            res(response.text())
          }
        }
      )
    })
  }

  /**
   * Convert code as String into executable JS
   * @param {String} obj as String to be converted
   * @returns {Object} converted from String representation
   */
  function looseJsonParse(obj) {
    return eval('(' + obj + ')')
  }

  return {
    getTestingFunctions: getTestingFunctions,
    looseJsonParse: looseJsonParse,
  }
})
