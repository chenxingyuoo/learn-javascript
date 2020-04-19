const jwt = require('../lib/jwt')

module.exports = async (ctx, next) => {
  // 获取token参数
  const token = ctx.request.header.token || ctx.request.query.token || ctx.request.body.token
  
  if (!token || token === 'null') {
    ctx.throw(401)
    return
  }

  try {
    // 验证token
    const result = await jwt.verify(token)
    console.log('result', result)
  } catch (e) {
    ctx.throw(401)
    return
  }
  
  await next()
}