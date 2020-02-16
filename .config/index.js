const path = require('path')
const fs = require('fs')
const ini = require('ini')

const rcPath = path.resolve(__dirname, './rc')
const cwdRcPath = path.resolve(process.cwd(), './.mockconfig')

const getRCConfig = () => {
  try {
    return ini.parse(fs.readFileSync(cwdRcPath, 'utf-8'))
  } catch {
    return ini.parse(fs.readFileSync(rcPath, 'utf-8'))
  }
}

module.exports = {
  set(key, value) {
    const rcConfig = getRCConfig()
    rcConfig[key] = value || ''
    fs.writeFileSync(rcPath, ini.stringify(rcConfig))
  },
  list() {
    return fs.readFileSync(rcPath, 'utf-8')
  },
  get(key) {
    const rcConfig = getRCConfig()
    return rcConfig[key]
  },
  getApiPath() {
    const FILENAME = 'apis'
    const rcConfig = getRCConfig()
    const apiPath = rcConfig['api_path']
    return path.resolve(apiPath, FILENAME)
  },
  getLogPath() {
    const FILENAME = 'logs/request'
    const rcConfig = getRCConfig()
    const apiPath = rcConfig['api_path']
    return path.resolve(apiPath, FILENAME)
  }
}