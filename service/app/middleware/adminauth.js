const jwt = require('jsonwebtoken')
const { tokenConfig } = require('../../config/secret')

module.exports = (options) => {
  return async function adminAuth(ctx, next) {
    const token = ctx.header.authorization
    if (!token) {
      ctx.status = 401
      ctx.body = { message: '请先登录' }
      return
    }
    try {
      this.ctx.userInfo = jwt.verify(token.split(' ')[1], tokenConfig.privateKey)
      await next()
    } catch (e) {
      ctx.status = 403
      ctx.body = { message: '请先登录' }
    }
  }
}
