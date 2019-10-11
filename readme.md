### [前端项目](https://github.com/EastSummer/island)

### NodeJs 能力与应用
1. 脱离浏览器运行JS
2. NodeJs Steam (前端工程化基础)
3. **服务端API**
4. 作为中间层
5. 对硬件要求低

### Koa
1. 特性
   * 洋葱圈模型
   * 精简，定制化能力强，需要二次开发
2. 中间件
   * 匿名函数，use注册
   * 可以注册多个，第一个自动执行，余下next()调用
   * next() => Promise{}
   * ctx 传递数据
   * 只在koa启动时实例化1次
3. 洋葱模型
   * async fuc() & await next() 保证中间件按洋葱模型顺序执行
4. ctx
   * ```path```请求路径 ```method```请求方式
   * ```body```返回至前端的内容

### 三方中间件
1. koa-router 路由
   * get/post/put/delete
   * router.get 第一个参数：地址 第二个参数：中间件
   * 获取参数 ```ctx.params``````ctx.request.query/header```
2. nodemon 自动重启server
   * npm i nodemon -g 全局安装 -> 直接使用nodemon命令
   * vscode添加配置文件
3. require-directory
   * 用来递归地迭代指定的目录，并返回这些模块。
   * 参数 ```(模块, 路径, {visit:fuc, ...})```
4. koa-bodyparser
   * 获取body中请求参数
   * ```ctx.request.body```
5. lodash
   * 数据处理
6. validator 校验器
   * [lin-validator](http://doc.cms.7yue.pro/lin/server/koa/validator.html)
7. [Sequelize](https://sequelize.org/)
   * 必须安装相关驱动 ```此处为：mysql2```
   * 设计数据库主键最好用自增数字，查询性能比字符串(GUID)好，需要考虑并发
   * [Type文档](https://sequelize.org/v3/api/datatypes/)
   * [事务(.transaction)](https://sequelize.org/v3/docs/transactions/)
     * ```START TRANSACTION -> COMMIT(成功)```
     * ```START TRANSACTION -> ROLLBACK(失败，撤销所有操作)```
   * [scopes](https://sequelize.org/v3/docs/scopes/)
8. [bcryptjs](https://www.npmjs.com/package/bcryptjs)
   * 加密，阻止彩虹攻击...
   * [How bcryptjs works](https://medium.com/@paulrohan/how-bcryptjs-works-90ef4cb85bf4)
9. jsonwebtoken jwt令牌
10. basic-auth
11. module-alias 别名简化require路径
12. koa-static 读取文件

### api
1. 版本->兼容多个版本
2. 携带版本号
   * url路径
   * 请求参数
   * header

### 包和模块的导入导出方式
1. commonJS -> require
2. ES6^ -> import from
3. AMD

### await
1. 对后续表达式求值
2. 阻塞进程(异步->同步)

### 数据库 
1. xampp
2. navicat
   * https://www.jianshu.com/p/5f693b4c9468
   * https://blog.csdn.net/xiaocy66/article/details/83711213
   * https://blog.csdn.net/weixin_40845165/article/details/84076958（√）
3. 连接mysql ```localhost 3306 root```
4. 新建 ```utf8mb4 utf8mb4_general_ci```
5. 实体表&关系表
6. 数据库事务 保证数据的一致性
7. ACID 原子性 一致性 隔离性 持久性

### 部署
1. 云服务器
2. 注册域名 -> 备案 -> 解析
3. 安装：mysql node xampp
4. 启动服务 pm2
5. nginx 80端口 -> 转发
6. https： lets encrypt


### Others
1. 开闭原则：软件中的对象（类，模块，函数等等）应该对于扩展是开放的，但是对于修改是封闭的
2. 循环引用
3. vscode 终端清空 文件->首选项->键盘快捷方式->```workbench.action.terminal.clear```
4. 根目录```process.cwd()```
5. Promise中异常未处理```Unhandled promise```
6. AOP 面向切面编程
7. HttpBascAuth
8. wx小程序npm
   * 根目录安装npm
   * 工具 -> 构建npm
9. 并发(concurrency)：cpu性能足够快的伪并发； 并行(parallelism)：同时执行,多线程
10. [宏任务，微任务，EventLoop](https://mp.weixin.qq.com/s/8xyccve0e9uA2mnk07CAWw)
11. cpu密集型：高负载，一直占用cpu资源，导致线程过于繁忙
12. 资源密集型：网络请求，查询数据库，读写文件...
13. JSON3 toJson


### [IMOOC-Koa](https://coding.imooc.com/learn/list/342.html)