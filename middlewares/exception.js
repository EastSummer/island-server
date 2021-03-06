const { HttpException } = require('../core/http-exception')

/**
 * HTTP Status Code 2xx, 4xx, 5xx
 * message
 * error_code
 * request_url
 */
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境 or 生产环境
    const isHttpException = error instanceof HttpException
    const isDev = error instanceof HttpException

    if (!isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError