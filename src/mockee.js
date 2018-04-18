/**************************************************
 * Created by nanyuantingfeng on 2018/4/8 18:53.
 **************************************************/

const compose = require('koa-compose')
const buildRoutes = require('./buildRoutes')

module.exports = async function (mock) {
  const routes = await buildRoutes(mock)
  return compose(routes)
}
