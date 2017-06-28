const _ = require('lodash')
const SunCalc = require('suncalc')
const lerp = require('lerp')
const Promise = require('bluebird')
const execSync = require('child_process').execSync
const moment = require('moment')

const api = require('../utils/api')()
const config = require('../../config')
const setTempK = require('../utils/utils').setTempK

// SunCalc.getPosition(new Date(), 60, -150)
const percentDayRemaining = () => {
  const times = SunCalc.getTimes(new Date(), 60, -150)
  const now = moment()
  const sunrise = moment(times.sunrise).subtract(2, 'hours')
  const sunset = moment(times.sunset).add(2, 'hours')
  return Math.min(100, Math.max(0, 100 * (1 - now.diff(sunrise) / sunset.diff(sunrise))))
}

const lamps = _.merge({}, config.hue.lamps, {
  bedroom: {
    min: {
      tempK: 2000,
      brightness: 100
    },
    max: {
      tempK: 4000,
      brightness: 150
    }
  },
  computer: {
    min: {
      tempK: 4200,
      brightness: 100
    },
    max: {
      tempK: 7400,
      brightness: 255
    }
  },
  kitchen: {
    min: {
      tempK: 3200,
      brightness: 0
    },
    max: {
      tempK: 6000,
      brightness: 255
    }
  },
  kitchen2: {
    min: {
      tempK: 3200,
      brightness: 60
    },
    max: {
      tempK: 6000,
      brightness: 255
    }
  }
})

const rad2deg = r => r * (180 / Math.PI)

const lerpAltitude = (altitude, min, max) => {
  return lerp(min, max, Math.max(0, rad2deg(altitude)) / 90)
}

console.log('%', percentDayRemaining())

process.on('unhandledRejection', (error, promise) => {
  console.error(error)
  process.exit(1)
})
process.on('uncaughtException', (error) => {
  console.error(error)
  process.exit(1)
})

const dayLerp = (min, max) => {
  const magnitude = Math.sin(Math.PI * (1 - percentDayRemaining() / 100))
  console.log(magnitude)
  return lerp(min, max, magnitude)
}

Promise.all(Object.keys(lamps).map(k => {
  const lamp = lamps[k]
  const tempK = dayLerp(lamp.min.tempK, lamp.max.tempK)
  const brightness = dayLerp(lamp.min.brightness, lamp.max.brightness)
  return setTempK(api, lamp.index, tempK, brightness)
})).then(() => {
  // console.log('%', percentDayRemaining() / 100 / 2)
  const tempK = dayLerp(2200, 6400)
  const brightness = dayLerp(.6, .9)
  console.log(tempK, brightness)
  execSync(`redshift -O ${tempK} -b ${brightness}`)
})
