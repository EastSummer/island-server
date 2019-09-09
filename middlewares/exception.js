const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // HTTP Status Code 2xx, 4xx, 5xx
    // message
    // error_code
    // request_url
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.message,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.code
    }
  }
}

module.exports = catchError