const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator } = require('../../validators/validator')

// router.get('/v1/classic/latest', (ctx, next) => {
//   ctx.body = {
//     key: 'classic'
//   }
// })

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id', parsed=false) // parsed是否做转换
  ctx.body = 'success'
})

module.exports = router