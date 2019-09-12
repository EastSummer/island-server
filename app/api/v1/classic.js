const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic',
})

const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

// router.post('/latest', (ctx, next) => {
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', parsed=false) // parsed是否做转换
  // ctx.body = 'success'
// })

router.get('/latest', new Auth().m, async (ctx, next) => {
  ctx.body = ctx.auth.uid
})

module.exports = router