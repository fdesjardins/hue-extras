const fs = require('fs')
const execSync = require('child_process').execSync

const hue = {
  api: require('./api')(),
  utils: require('./utils')
}

const defaultPath = '/tmp/hue:brightness'

const initialState = {
  brightness: 0.75,
  tempK: 3200
}

const saveState = (state, f = defaultPath) => {
  fs.writeFileSync(f, JSON.stringify(state, null, 2))
}

const loadState = (f = defaultPath) => {
  let state
  try {
    state = JSON.parse(fs.readFileSync(f))
  } catch (err) {}

  if (!state) {
    state = Object.assign({}, initialState)
    saveState(state)
  }
  return state
}

let currentState = loadState()

const getBrightness = () => {
  const b = execSync(`echo $(xrandr --verbose | grep -i brightness | awk -n '{ print $2; }')`)
    .toString()
    .trim()
  return parseFloat(b)
}

const setState = state => {

  state.brightness = Math.max(Math.min(state.brightness, 1.0), 0.0)

  Object.assign(currentState, state)
  saveState(currentState)
  execSync(`redshift -O ${currentState.tempK} -b ${state.brightness}`)

  console.log('set', state)
}

const adjustBrightness = (amount = 0) => {
  setState(Object.assign({}, currentState, { brightness: currentState.brightness + amount }))
}

const adjustRedShift = (amount = 0) => {
  setState(Object.assign({}, currentState, { tempK: currentState.tempK + amount }))
}

const adjustLampsBrightness = (amount = 0) => {
  hue.utils.listLamps(hue.api).then(lamps => {
    lamps.map(l => {
      console.log(l)
      hue.utils.setBrightness(hue.api, l.id, currentState.brightness * 254)
    })
  })
}

const adjustLampsTempK = (amount = 0) => {
  hue.utils.listLamps(hue.api).then(lamps => {
    lamps.map(l => {
      console.log(l)
      hue.utils.setTempK(hue.api, l.id, currentState.tempK)
    })
  })
}

module.exports = cmd => {
  if (cmd === 'bu') {
    console.log('here')
    adjustBrightness(0.1)
    adjustLampsBrightness(25)
  } else if (cmd === 'bd') {
    adjustBrightness(-0.1)
    adjustLampsBrightness(-25)
  } else if (cmd === 'rd') {
    adjustRedShift(200)
    adjustLampsTempK(200)
  } else if (cmd === 'ru') {
    adjustRedShift(-200)
    adjustLampsTempK(-200)
  }
}
