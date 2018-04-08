/**************************************************
 * Created by nanyuantingfeng on 28/03/2018 19:52.
 **************************************************/
const util = require('util')
const chalk = require('chalk')
const figlet = util.promisify(require('figlet'))

module.exports = async function () {
  const logo = await figlet('mockee')
  console.log(chalk.green(logo))
}
