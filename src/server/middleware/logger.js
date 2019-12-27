const path = require('path')
const log4js = require('log4js')
const fmt = require('pretty-format')
const { getLogPath } = require('../../../.config')

log4js.configure({
  appenders: {
    app: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../../logs/app'),
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd.log',
      encoding: 'utf-8'
    },
    user: {
      type: 'dateFile',
      filename: getLogPath(),
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd.log',
      encoding: 'utf-8'
    }
  },
  categories: {
    default: {
      appenders: ['app', 'user'],
      level: 'info'
    }
  }
})

module.exports = () => async (ctx, next) =>  {
  ctx.state.logger = log4js.getLogger('default')
  const startTime = new Date()
  await next()
  const ms = new Date() - startTime
  ctx.state.logger.info('*********************************************************************')
  ctx.state.logger.info('Request', fmt(ctx.request))
  ctx.state.logger.info('Request Body', fmt(ctx.request.body))
  ctx.state.logger.info('Response', fmt(ctx.response))
  ctx.state.logger.info('Response Body', fmt(ctx.body))
}
