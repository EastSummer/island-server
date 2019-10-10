const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic',
})

const { PositiveIntegerValidator, ClassicValidator } = require('@validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('@models/flow')
const { Art } = require('@models/art')
const { Favor } = require('@models/favor')
const { NotFound } = require('../../../core/http-exception')

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
  const likeLatest = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
  // 序列化 dataValues
  // art.dataValues.index = flow.index
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

router.get('/:index/next', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  const art = await Flow.getNextOrPrevous(index+1, ctx.auth.uid)
  ctx.body = art
})

router.get('/:index/previous', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  const art = await Flow.getNextOrPrevous(index-1, ctx.auth.uid)
  ctx.body = art
})

router.get('/:type/:id', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = v.get('path.type')

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  artDetail.art.setDataValue('like_status', artDetail.like_status)

  ctx.body = artDetail.art
})

router.get('/:type/:id/favor', new Auth().m, async (ctx) => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = v.get('path.type')

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

  ctx.body = {
    fav_nums: artDetail.art.fav_nums,
    like_status: artDetail.like_status,
  }
})

router.get('/favor', new Auth().m, async ctx => {
  const uid = ctx.auth.uid
  ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router