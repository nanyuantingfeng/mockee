/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 20:34.
 **************************************************/

module.exports = async function (ctx, xxx) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({uuuuu: 999, xxx})
    }, 110)
  })
}
