const Koa = require('koa')
const classic = require('./api/v1/classic')
const book = require('./api/v1/book')

const app = new Koa() // 应用程序对象(包含很多中间件)


app.use(classic.routes())
app.use(book.routes())

// app.use((ctx, next) => {
//   console.log(1);
//   next()
// })

app.listen(3000)