const Koa = require('koa')
const router = require('./server/router')
const {port} = require('../config')

const app = new Koa()

router(app)

app.listen(port)