const Koa = require('koa')
const parser = require('koa-bodyparser')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa() // 应用程序对象(包含很多中间件)

app.use(parser())
app.use(catchError)

InitManager.initCore(app)

app.listen(3000)