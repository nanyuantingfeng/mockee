/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 19:03.
 **************************************************/
module.exports = async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', ms + 'ms')
}
