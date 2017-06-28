const defaultConfig = require('./config')()
const hue = require("node-hue-api")

module.exports = (config = defaultConfig) => {
  return new hue.HueApi(config.hue.host, config.hue.username)
}
