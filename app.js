const Koa = require('koa')

const app = new Koa()   // 应用程序对象(包含很多中间件)

app.use((ctx, next) => {
    console.log(1);
    next()
})

app.use((ctx, next) => {
    console.log(2);
    // next()
})

app.listen(3000)