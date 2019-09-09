const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    // InitManager.loadHttpExcepton()
  }

  static initLoadRouters () {
    // path config
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) InitManager.app.use(obj.routes())
    }
  }

  static loadHttpExcepton() {
    global.errs = require('./http-exception')
  }

}

module.exports = InitManager