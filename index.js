#!/home/forrest/.nvm/versions/node/v7.7.2/bin/node

const yargs = require('yargs')

const fire = require('./src/effects/fire')
const brightness = require('./src/utils/brightness')

const config = require('./config')()

const argv = yargs.argv
if (argv.v) {
  config.log.level = 'debug'
}

const cmd = argv._[0]

/**
 * Fire Command
 */

if (cmd === 'fire') {
  const fuel = argv.f
  const lamps = argv.l
  const wholeHouse = argv.a
  if (wholeHouse) {
    fire.setHouseOnFire(fuel)
  }
  if (lamps) {
    const lampsList = lamps.toString().split(',')
    if (lampsList.length > 0) {
      lampsList.map(l => fire.setLampOnFire(l, fuel))
    }
  }
}

/**
 * Brightness Command
 */

if (cmd === 'brightness') {
  const brightnessDirection = argv.d
  const wholeHouse = argv.a
  if (wholeHouse) {
    if (brightnessDirection === 'u') {
      brightness('bu')
    }
    if (brightnessDirection === 'd') {
      brightness('bd')
    }
  }
}

/**
 * Redshift Command
 */

if (cmd === 'redshift') {
  const shiftDirection = argv.d
  const wholeHouse = argv.a
  if (wholeHouse) {
    if (shiftDirection === 'u') {
      brightness('ru')
    }
    if (shiftDirection === 'd') {
      brightness('rd')
    }
  }
}
