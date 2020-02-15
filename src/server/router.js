const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const Mock = require('mockjs')
const urlParse = require('url')
const logger = require('./middleware/logger')
const { getApiPath } = require('../../.config')

const router = new Router()

const registerApi = (router) => {
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
            const urlObj = urlParse.parse(ctx.request.url, true)
            return ctx.body = Mock.mock(data({
              url: ctx.request.url,
              method: ctx.request.header,
              query: urlObj.query,
              body: ctx.request.body,
            }))
          }
          return ctx.body = Mock.mock(data)
        })
      } catch (err) {
        console.log(`API file error [${apiPath}/${name}]!`, err)
      }
    });
  }
}

registerApi(router)

router['get']('/index/', async (ctx) => {
  ctx.body = 'index'
})

module.exports = app => {
  app.use(cors({
    credentials: true
  }))
  app.use(koaBody({multipart: true}))
  app.use(logger())
  app.use(router.routes())
  app.use(router.allowedMethods())
}