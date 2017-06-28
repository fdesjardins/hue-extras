const k2rgb = require('kelvin-to-rgb')

const utils = require('../utils/utils')
const api = require('../utils/api')()
const log = require('../utils/log')()

const shiftDistribution = x => x < 0.5 ? 2 * x : 2 * (1 - x)

const sample = () => shiftDistribution(Math.random())

const fuels = {
  wood: {
    baseColor: 1300,
    baseBri: 30,
    energy: 50
  },
  coals: {
    baseColor: 1000,
    baseBri: 20,
    energy: 20
  },
  thermite: {
    baseColor: 3600,
    baseBri: 210,
    energy: 100
  },
  trimethylBorate: {
    baseColor: 1300,
    baseBri: 140,
    energy: 100,
    colorModifier: c => {
      c[0] = 0
      c[1] = 200 + sample() * 50
      return c
    }
  },
  strontiumCopper: {
    baseColor: 1300,
    baseBri: 20,
    energy: 20,
    colorModifier: c => {
      c[0] = 160 + sample() * 20
      c[1] = 50
      c[2] = 200 + sample() * 20
      return c
    }
  },
  lithium: {
    baseColor: 1300,
    baseBri: 70,
    energy: 50,
    colorModifier: c => {
      c[0] = 200 + sample() * 25
      c[1] = 70
      return c
    }
  },
  methanol: {
    baseColor: 1300,
    baseBri: 30,
    energy: 50,
    colorModifier: c => {
      c[0] = 40
      c[1] = 40
      c[2] = 150 + sample() * 25
      return c
    }
  }
}

const burnLamp = (lamp, fuelName) => {
  const fuel = fuels[fuelName]
  const energyReleased = sample() * fuel.energy

  let color = k2rgb(fuel.baseColor + energyReleased)
  if (fuel.colorModifier) {
    color = fuel.colorModifier(color)
  }

  const bri = fuel.baseBri + energyReleased * .5

  utils.setRGB(api, lamp, color, bri)
}

const burnHouse = (fuelName) => {
  utils.listLamps(api)
    .then(lamps => lamps.map(l => burnLamp(l.id, fuelName)))
}

// burn, baby, burn
exports.setLampOnFire = (lamp, fuel = 'wood') => setInterval(() => burnLamp(lamp, fuel), 750)
exports.setHouseOnFire = (fuel = 'wood') => setInterval(() => burnHouse(fuel), 750)
