/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 20:07.
 **************************************************/
const koaRoute = require('koa-route')
const helpers = require('./helpers')

const {
  globMock, isFunction, isJSONFile, isTextFile,
  replacePath, asJSON, asFunc, asText,
} = helpers

module.exports = async function (mock) {
  const routes = []
  const files = await globMock(mock)

  let i = -1
  while (++i < files.length) {
    const line = files[i]
    const rp = replacePath(mock, line)

    if (isJSONFile(line)) {
      routes.push(koaRoute.get(`${rp}.json`, asJSON(line)))
      routes.push(koaRoute.all(rp, asJSON(line)))
      continue
    }

    if (isTextFile(line)) {
      routes.push(koaRoute.get(rp, asText(line)))
      continue
    }

    routes.push(koaRoute.all(rp, asFunc(line)))
  }

  return routes
}
