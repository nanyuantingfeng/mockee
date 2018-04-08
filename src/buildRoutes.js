/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 20:07.
 **************************************************/
const path = require('path')
const koaRoute = require('koa-route')
const helpers = require('./helpers')

const {
  globPath, isFunction, isJSONFile,
  isTextFile, readFileAsText, replacePath
} = helpers

module.exports = async function (mock) {
  const routes = []
  const files = await globPath(path.join(mock, '**/*.*'))

  let i = -1
  while (++i < files.length) {
    const line = files[i]
    const rp = replacePath(mock, line)

    if (isJSONFile(line)) {

      routes.push(koaRoute.get(`${rp}.json`, async (ctx) => ctx.body = require(line)))
      routes.push(koaRoute.all(rp, async (ctx) => ctx.body = require(line)))

    } else if (isTextFile(line)) {

      routes.push(koaRoute.get(rp, async (ctx) => ctx.body = readFileAsText(line)))

    } else {

      routes.push(koaRoute.all(rp,
        async (ctx, ...args) => {
          const ff = require(line)
          ctx.body = isFunction(ff) ? await ff(ctx, ...args) : ff
        }
      ))

    }

  }

  return routes
}
