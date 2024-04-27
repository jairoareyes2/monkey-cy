
module.exports = (on, config) => {
      on('file:preprocessor', async (file) => {
            if (file.filePath.includes('cypress/support/index.js')) {
                  const configFile = path.resolve('config.json')
                  const configOverrides = await fs.readJson(configFile)
                  config.env = Object.assign({}, config.env, configOverrides)
                }
                return file
              })
            }
            