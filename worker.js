/**************************************************
 * Created by nanyuantingfeng on 14/07/2017 11:27.
 **************************************************/
const Server = require('./src/server')
const router = require('./src/router')

function mockServer (config) {
  let {mock = 'mock', port = 3000, base = '/'} = config

  let server = new Server(port)
  router.init(mock, base).then(data => {
    server.start(data)
  })
}

process.on('message', (config) => {
  mockServer(config)
})
