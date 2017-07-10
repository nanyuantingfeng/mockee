/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 13:23.
 **************************************************/
const aaa = require('./dx')

module.exports = function (Mock) {
  return Mock.mock(aaa.aaa)
}
