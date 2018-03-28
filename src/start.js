/**************************************************
 * Created by nanyuantingfeng on 14/03/2018 17:16.
 **************************************************/
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const compose = require('koa-compose')
const detect = util.promisify(require('detect-port'))

const buildRoutes = require('./buildRoutes')
const app = require('./app')

module.exports = async function (mock, port) {

  const _port = await detect(port)

  if (port !== _port) {
    console.log(` port:${chalk.red(port)} was occupied, use port:${chalk.green(_port)}\n`)
  }

  const {routes, routePaths} = await buildRoutes(mock)
  app.use(compose(routes))

  let i = -1
  while (++i < routePaths.length) {
    console.log(' %s:%s%s', 'http://127.0.0.1', port, routePaths[i])
  }

  if (routePaths.length === 0) {
    console.log(chalk.yellow('mock file not found , please use the "--mock" set mock root path ...'))
  }

  console.log('\n\n')

  app.listen(_port)

  return app
}
