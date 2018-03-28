/**************************************************
 * Created by nanyuantingfeng on 21/03/2018 16:34.
 **************************************************/
const Koa = require('koa')
const app = new Koa()

const compose = require('koa-compose')
const mwLogger = require('./mwLogger')
const mwResponseTime = require('./mwResponseTime')
const buildRoutes = require('./buildRoutes')

app.use(mwResponseTime)
app.use(mwLogger)

module.exports = app
