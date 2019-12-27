const Koa = require('koa')
const router = require('./server/router')
const config = require('../.config')

const app = new Koa()

router(app)

app.listen(config.get('port'))