const bunyan = require('bunyan')
const defaultConfig = require('./config')()

module.exports = (config = defaultConfig) => {
  return bunyan.createLogger({
    name: config.log.name,
    level: config.log.level
  })
}
