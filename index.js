/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 12:57.
 **************************************************/
const Server = require('./src/server')
const router = require('./src/router')

function MockServer (config) {
  let {mock = 'mock', port = 3000, base = '/'} = config

  let server = new Server(port)
  router.init(mock, base).then(data => {
    server.start(data)
  })
}

module.exports = MockServer




