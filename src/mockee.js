/**************************************************
 * Created by nanyuantingfeng on 2018/4/8 18:53.
 **************************************************/

const compose = require('koa-compose')
const logger = require('./logger')
const buildRoutes = require('./buildRoutes')

module.exports = async function (app, mock) {
  app.use(logger)
  const routes = await buildRoutes(mock)
  app.use(compose(routes))
  return app
}
