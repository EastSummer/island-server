const util = require('util')
const axios = require('axios')

const { appId, appSecret, lognUrl } = require('../../config/config').wx
const { AuthFailed } = require('../../core/http-exception')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

/**
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 */
class WXManager {
  static async codeToToken(code) {
    const url = util.format(lognUrl, appId, appSecret, code)

    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    if (errcode) {
      const errmsg = result.data.errmsg
      throw new AuthFailed('openid获取失败 ' + errcode + ": " + errmsg)
    }

    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerUserByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager,
}