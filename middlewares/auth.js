const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

const { Forbbiden } = require('../core/http-exception')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      // ctx.req 获取nodeJs原生request对象
      // ctx.request 获取Koa对nodeJs的request封装的对象
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      // token检测
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        // token过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        // token不合法
        throw new Forbbiden(errMsg)
      }
      // 权限验证
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }
      // uid, scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.decode,
      }
      await next()
    }
  }

  // 验证令牌是否有效
  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth,
}