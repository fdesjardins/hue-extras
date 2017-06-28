const hue = require('node-hue-api')
const k2rgb = require('kelvin-to-rgb')
const log = require('./log')()

exports.setTempK = (api, lamp, tempK, brightness) => {
  log.debug(`setTempK:lamp ${lamp}:tempK ${tempK}:brightness ${brightness}`)
  const state = hue.lightState.create()
    .on()
    .rgb(...k2rgb(tempK))

  if (brightness) {
    state.bri(brightness)
  }

  state.transitiontime(5)

  return api.setLightState(lamp, state)
}

exports.setRGB = (api, lamp, rgb, brightness = 255) => {
  log.debug(`setTempK:lamp ${lamp}:rgb ${rgb}:brightness ${brightness}`)
  const state = hue.lightState.create()
    .on()
    .rgb(...rgb)
    .bri(brightness)
    .transitiontime(5)

  return Promise.resolve(api.setLightState(lamp, state).done())
}

exports.setBrightness = (api, lamp, brightness = 255) => {
  const state = hue.lightState.create()
    .on()
    .bri(brightness)
    .transitiontime(5)

  return api.setLightState(lamp, state).done()
}

exports.listLamps = api => {
  return api.lights().then(lamps => {
    return lamps.lights
  })
}

exports.getLamps = (config, names) => {
  return Object.keys(config.hue.lamps).map(k => {
    if (names.indexOf(k) > -1) {
      return config.hue.lamps[k]
    }
  }).filter(x => !!x)
}
