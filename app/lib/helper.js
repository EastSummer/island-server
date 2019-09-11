function success(msg, errorCode) {
  throw new global.error.Success(msg, errorCode)
}

module.exports = {
  success,
}