const Koa = require('koa')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

const app = new Koa() // 应用程序对象(包含很多中间件)

const modules = requireDirectory(module, './api', {
  visit: whenLoadModule,
})

function whenLoadModule(obj) {
  if (obj instanceof Router) app.use(obj.routes())
}

// app.use((ctx, next) => {
//   console.log(1);
//   next()
// })

app.listen(3000)