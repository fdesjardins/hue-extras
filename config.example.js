const config = {
  hue: {
    host: '',
    username: ''
  },
  log: {
    name: 'hue',
    level: 'info'
  }
}

const configKey = Symbol('config')

module.exports = () => {
  if (!global[configKey]) {
    global[configKey] = config
  }
  return global[configKey]
}
