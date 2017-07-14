/**************************************************
 * Created by nanyuantingfeng on 14/07/2017 12:26.
 **************************************************/

//handle  404 ==> proxy 远端的服务器
module.exports = function () {

  return async (ctx, next) => {
    try {
      await next()
      let status = ctx.status || 404
      if (status === 404) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.status = err.status || 500
      if (ctx.status === 404) {
        await ctx.render('404')
      } else {
        await ctx.render('other_error')
      }
    }
  }
}
