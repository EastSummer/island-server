const Router = require('koa-router')
const router = new Router({
  prefix: 'v1/book',
})

const { HotBook } = require('../../models/hot-book');

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {
    books,
  }
})

module.exports = router