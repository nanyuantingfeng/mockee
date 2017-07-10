/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 13:33.
 **************************************************/
const Koa = require('koa')
const chalk = require('chalk')
const app = new Koa()
const hbs = require('koa-hbs')
const convert = require('koa-convert')
const co = require('co')

module.exports = class Server {

  constructor (port) {
    this.app = app
    this.port = port
  }

  start (router) {

    this.app.use(async function (ctx, next) {
      const start = Date.now()
      await next()
      const ms = Date.now() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}`)
    })

    app.use(convert(hbs.middleware({viewPath: __dirname + '/'})))

    app.use(async (ctx, next) => {
      const render = ctx.render
      ctx.render = async function () {
        return co.call(ctx, render.apply(ctx, arguments))
      }
      await next()
    })

    this.app.use(router.routes()).use(router.allowedMethods())

    this.app.listen(this.port, () => {
      console.log(`${chalk.cyan('Mock Server Started')} Listen on : ${chalk.magenta('http://127.0.0.1:' + this.port)}`)
    })

  }

}


