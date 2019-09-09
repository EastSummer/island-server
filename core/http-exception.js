class HttpException extends Error {
  constructor(msg='服务器异常', errorCode=1000, code=400) {
    super()
    this.code = code
    this.msg = msg
    this.errorCode = errorCode
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 1000
  }
}

module.exports = {
  HttpException,
  ParameterException,
}