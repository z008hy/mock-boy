const path = require('path')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const nunjucks = require('koa-nunjucks-2')
const logger = require('../middleware/logger')
const registerMock = require('./mock')
const registerRoute = require('./route')

const router = new Router()

registerMock(router)
registerRoute(router)

module.exports = app => {
  app.use(cors())
  app.use(koaBody({multipart: true}))
  app.use(logger())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'frontend/views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }))
}