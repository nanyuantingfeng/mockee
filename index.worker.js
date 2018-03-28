/**************************************************
 * Created by nanyuantingfeng on 28/03/2018 19:34.
 **************************************************/
const start = require('./src/start')

process.on('message', (config) => start(config.mock, config.port))
