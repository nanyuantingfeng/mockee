/**************************************************
 * Created by nanyuantingfeng on 14/03/2018 17:16.
 **************************************************/
const chalk = require('chalk')
const path = require('path')
const util = require('util')
const detect = util.promisify(require('detect-port'))
const Koa = require('koa')

const mockee = require('./mockee')
const buildURLs = require('./buildURLs')

module.exports = async function (mock, port) {

  const $port = await detect(port)

  if (port !== $port) {
    console.log(` port:${chalk.red(port)} was occupied, use port:${chalk.green($port)}\n`)
  }

  const urls = await buildURLs(mock)

  let i = -1
  while (++i < urls.length) {
    console.log(' %s:%s%s', 'http://127.0.0.1', port, urls[i])
  }

  if (urls.length === 0) {
    console.log(chalk.yellow('mock file not found , please use the "--mock" set mock root path ...'))
  }

  console.log('\n\n')

  const app = await mockee(new Koa(), mock)

  app.listen($port)

  return app
}
