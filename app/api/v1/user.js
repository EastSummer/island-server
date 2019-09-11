
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { success } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/user',   // 该路由下的前缀
})

// 注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  }
  User.create(user) // 返回一个promise包装的user模型
  success()
})

module.exports = router