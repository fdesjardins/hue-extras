const api = require('./api')()
const config = require('./config')
const setRGB = require('./utils').setRGB

api.lightStatusWithRGB(config.hue.lamps.computer.index)
  .then(status => {
    const rgb = [].concat(...status.state.rgb)
    rgb[2] += 100
    setRGB(api, config.hue.lamps.computer.index, rgb, status.state.bri)
    setTimeout(() => {
      setRGB(api, config.hue.lamps.computer.index, status.state.rgb, status.state.bri)
    }, 1000)
  })
