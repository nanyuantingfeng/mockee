/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 20:07.
 **************************************************/
const path = require('path')
const route = require('koa-route')
const fs = require('fs')
const glob = require('glob')

function globPath(pathString) {
  return new Promise((resolve, reject) =>
    glob(pathString, (e, filePaths) => e ? reject(e) : resolve(filePaths)))
}

function replacePath(mock, line) {
  return line
    .replace(mock, '/')
    .replace('//', '/')
    .replace('.json', '')
    .replace('.js', '')
}

function isJSONFile(line) {
  return line.endsWith('.json')
}

function isTextFile(line) {
  return !(line.endsWith('.json') || line.endsWith('.js'))
}

function isFunction(ff) {
  return typeof ff === 'function'
}

function readFileAsText(line) {
  return String(fs.readFileSync(line))
}

module.exports = async function (mock) {
  const cwd = process.cwd()
  const routes = []
  const routePaths = []
  const files = await globPath(path.join(mock, '**/*.*'))

  let i = -1
  while (++i < files.length) {
    const line = files[i]
    const rp = replacePath(mock, line)

    if (isJSONFile(line)) {

      routes.push(route.get(`${rp}.json`,
        async (ctx) => ctx.body = require(line)))
      routePaths.push(`${rp}.json`)

      routes.push(route.all(rp,
        async (ctx) => ctx.body = require(line)))
      routePaths.push(rp)

    } else if (isTextFile(line)) {

      routes.push(route.get(rp,
        async (ctx) => ctx.body = readFileAsText(line)))
      routePaths.push(rp)

    } else {

      routes.push(route.all(rp,
        async (ctx, ...args) => {
          const ff = require(line)
          ctx.body = isFunction(ff) ? await ff(ctx, ...args) : ff
        }))

      routePaths.push(rp)
    }

  }

  return {routes, routePaths}
}
