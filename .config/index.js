const path = require('path')
const fs = require('fs')
const ini = require('ini')

const rcPath = path.resolve(__dirname, './rc')

module.exports = {
  set(key, value) {
    const rcConfig = ini.parse(fs.readFileSync(rcPath, 'utf-8'))
    rcConfig[key] = value || ''
    fs.writeFileSync(rcPath, ini.stringify(rcConfig))
  },
  list() {
    return fs.readFileSync(rcPath, 'utf-8')
  },
  get(key) {
    const rcConfig = ini.parse(fs.readFileSync(rcPath, 'utf-8'))
    return rcConfig[key]
  },
  getApiPath() {
    const FILENAME = 'apis'
    const rcConfig = ini.parse(fs.readFileSync(rcPath, 'utf-8'))
    const apiPath = rcConfig['api_path']
    return path.resolve(apiPath, FILENAME)
  },
  getLogPath() {
    const FILENAME = 'logs/request'
    const rcConfig = ini.parse(fs.readFileSync(rcPath, 'utf-8'))
    const apiPath = rcConfig['api_path']
    return path.resolve(apiPath, FILENAME)
  }
}