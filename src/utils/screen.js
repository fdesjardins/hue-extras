const screenshot = require('screenshot-desktop')

const api = require('./api')()
const config = require('../../config')
const utils = require('./utils')

const lamps = utils.getLamps(config, ['computer'])

if (!module.parent) {
  Promise.all(lamps.map(k => {
    console.log(k)
    return utils.setRGB(api, k.index, [255, 0, 0])
  })).then(() => {
    return screenshot().then(img => {
      console.log('done', img)
    })
  })
}
