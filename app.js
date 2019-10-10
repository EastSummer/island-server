require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')


const app = new Koa() // 应用程序对象(包含很多中间件)

app.use(parser())
app.use(catchError)
app.use(static(path.join(__dirname, './static')))

InitManager.initCore(app)

app.listen(3000)