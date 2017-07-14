/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 12:57.
 **************************************************/
const chokidar = require('chokidar')
const path = require('path')
const {fork} = require('child_process')

module.exports = function (config) {
  let {mock, base, port} = config
  let pCWD = process.cwd()

  let servicePath = path.join(__dirname, 'worker.js')

  let forked = fork(servicePath)
  forked.send(config)

  let watcher = chokidar.watch(path.join(pCWD, mock))

  watcher.on('change', (event, path) => {
    console.log('Mock Files Changed')
    forked && forked.kill()
    forked = fork(servicePath)
    forked.send(config)
  })

}

