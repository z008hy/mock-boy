const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const koaBody = require('koa-body/index')
const cors = require('koa2-cors')
const nunjucks = require('koa-nunjucks-2')
const Mock = require('mockjs')
const mocks = require('./mock')

const router = new Router()

// const mockRoutes = mocks()
// if (Array.isArray(mockRoutes)) {
//   mockRoutes.forEach((item) => {
//     router[item.method](item.url, async (ctx) => {
//       if (typeof item.data === 'function') {
//         return ctx.body = item.data(ctx.request)
//       }
//       return ctx.body = Mock.mock(item.data)
//     })
//   })
// }

const registerApi = (router) => {
  const apiPath = path.resolve(__dirname, '../apis')
  const apiFiles = fs.readdirSync(apiPath)
  if (Array.isArray(apiFiles)){ 
    apiFiles.forEach(name => {
      const { url, method, data } = require(path.resolve(apiPath, name))
      if (!url || !data) return console.log(`${name} error! `)
      router[method](url, async (ctx) => {
        if (typeof data === 'function') {
          return ctx.body = data(ctx.request)
        }
        return ctx.body = Mock.mock(data)
      })
    });
  }
}

registerApi(router)

router['get']('/index/', async (ctx) => {
  ctx.body = 'index'
})

module.exports = app => {
  app.use(cors())
  app.use(koaBody())
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