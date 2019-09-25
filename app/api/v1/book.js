const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/book',
})

const { HotBook } = require('../../models/hot-book');
const { Book } = require('../../models/book');
const { Favor } = require('../../models/favor')
const { PositiveIntegerValidator, SearchValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {
    books,
  }
})

router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book(v.get('path.id'))
  ctx.body = await book.detail()
})

router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
  ctx.body = result
})

router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = { count }
})

router.get('/:book_id/favor', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  })
  const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'))
  ctx.body = favor
})

module.exports = router