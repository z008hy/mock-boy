const path = require('path')
const fs = require('fs')
const {mocks} = require('./register')

const mocksPath = path.resolve(__dirname, '../../mocks')
const mockGetter = () => {
  const files = fs.readdirSync(mocksPath)
  const mockArrs =  files.reduce((pre, cur) => {
    if (cur !== 'index.js') {
      const data = require(path.resolve(mocksPath, `./${cur}`))
      if (Array.isArray(data)) {
        pre.push(...data)
      } else if (Object.keys(data) > 0) {
        pre.push(data)
      }
      return pre
    }
    return pre
  }, [])
  console.log(mockArrs)
  return mockArrs.concat(mocks)
}

module.exports = mockGetter
