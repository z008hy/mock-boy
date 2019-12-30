const path = require('path')
const fs = require('fs')
const Mock = require('mockjs')
const { getApiPath } = require('../../../.config/index')

module.exports = router => {
  const apiPath = getApiPath()
  const apiFiles = fs.readdirSync(apiPath)
  if (Array.isArray(apiFiles)){
    apiFiles.forEach(name => {
      try {
        let api = require(path.resolve(apiPath, name))
        if (typeof api === 'function') api = api(Mock)
        const { url, method, data } = api
        if (!url || !data) return console.log(`API file error [${apiPath}/${name}]!`)
        router[method](url, async (ctx) => {
          if (typeof data === 'function') {
            return ctx.body = Mock.mock(data(ctx.request))
          }
          return ctx.body = Mock.mock(data)
        })
      } catch (err) {
        console.log(`API file error [${apiPath}/${name}]!`, err)
      }
    });
  }
}