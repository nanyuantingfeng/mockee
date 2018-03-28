/**************************************************
 * Created by nanyuantingfeng on 28/03/2018 19:29.
 **************************************************/
const child_process = require('child_process')
const path = require('path')
const chokidar = require('chokidar')
const chalk = require('chalk')
const logo = require('./src/logo')

module.exports = function (mock, port, iswatch) {
  mock = path.join(process.cwd(), mock)

  logo()

  const worker = path.join(__dirname, 'index.worker.js')
  let forked = child_process.fork(worker)
  forked.send({mock, port})

  if (iswatch) {
    chokidar.watch(mock).on('change', path => {
      console.log(chalk.red(' mock path files is modified, server restarting ...\n\n'))
      forked && forked.kill()
      forked = child_process.fork(worker)
      forked.send({mock, port})
    })
  }

}
