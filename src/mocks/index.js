const path = require('path')
const fs = require('fs')
const {mocks} = require('../server/mock/register')

const mockGetter = () => {
  const files = fs.readdirSync(path.resolve(__dirname, './'))
  const mockArrs =  files.reduce((pre, cur) => {
    if (cur !== 'index.js') {
      const data = require(`./${cur}`)
      if (Array.isArray(data)) {
        pre.push(...data)
      } else {
        pre.push(data)
      }
      return pre
    }
    return pre
  }, [])
  return mockArrs.concat(mocks)
}

module.exports = mockGetter