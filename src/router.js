/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 13:11.
 **************************************************/
const Router = require('koa-router')
const Mock = require('mockjs')
const util = require('./util')
const path = require('path')

function parseRoutesPath (mock, base, line) {
  return line
    .replace(mock, base)
    .replace('//', '/')
    .replace('.json', '')
    .replace('.js', '')
}

exports.init = function (mock, base) {
  const router = new Router()
  const pCWD = process.cwd()

  return Promise.resolve()

    .then(() => util.findMockFilesList(path.join(mock, '**/*.*')))

    .then(data => {

      data.forEach(line => {
        let p = parseRoutesPath(mock, base, line)
        router.get(p, (ctx, next) => {
          let file = require(path.join(pCWD, line))
          if (typeof file === 'function') {
            ctx.body = file(Mock)
          } else {
            ctx.body = Mock.mock(file)
          }
        })
      })

      return router
    })

    .then(() => util.findMockFilesList(path.join(mock, '**/*.js*')))

    .then(data => {

      data = data.map(line => {
        return parseRoutesPath(mock, base, line)
      })

      router.get('/', async (ctx) => {
        await ctx.render('index', {data: data})
      })

      return router
    })

}
