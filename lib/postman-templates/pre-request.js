postman.setEnvironmentVariable('neoTestingTools', () => {
  /**
   * Query the neo testing functions
   * See: https://github.com/neohelden/flow-testing-manual
   * @returns Neo testing functions in plain text
   */
  const getNeoTestingTools = async () => {
    return new Promise((res, rej) => {
      pm.sendRequest('[RAW_NEO_TESTING_LINK]', (error, response) => {
        if (error) {
          rej(error)
        } else {
          res(response.text())
        }
      })
    })
  }
  return {
    getNeoTestingTools,
  }
})
