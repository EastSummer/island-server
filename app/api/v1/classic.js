const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic',
})

const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')

// router.post('/latest', (ctx, next) => {
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', parsed=false) // parsed是否做转换
  // ctx.body = 'success'
// })

router.get('/latest', new Auth().m, async (ctx, next) => {
  // 按index排序，取最后一项
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.artId, flow.type)
  // 序列化 dataValues
  // art.dataValues.index = flow.index
  art.setDataValue('index', flow.index)
  ctx.body = art
})

module.exports = router