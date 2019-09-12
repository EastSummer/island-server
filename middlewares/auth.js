const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

const { Forbbiden } = require('../core/http-exception')

class Auth {
  constructor() {
    
  }

  get m() {
    return async (ctx, next) => {
      // token检测
      const userToken = basicAuth(ctx.req)
      // ctx.req 获取nodeJs原生request对象
      // ctx.request 获取Koa对nodeJs的request封装的对象
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new Forbbiden()
      }
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
      // uid, scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.decode,
      }
      await next()
    }
  }
}

module.exports = {
  Auth,
}