### [前端项目](https://github.com/EastSummer/island)

### NodeJs 能力与应用
1. 脱离浏览器运行JS
2. NodeJs Steam (前端工程化基础)
3. **服务端API**
4. 作为中间层

### Koa
1. 特性
   * 洋葱圈模型
   * 精简，定制化能力强，需要二次开发
2. 中间件
   * 匿名函数，use注册
   * 可以注册多个，第一个自动执行，余下next()调用
   * next() => Promise{}
   * ctx 传递数据
3. 洋葱模型
   * async fuc() & await next() 保证中间件按洋葱模型顺序执行
4. ctx
   * ```path```请求路径 ```method```请求方式
   * ```body```返回至前端的内容

### 三方中间件
1. koa-router 路由
   * get/post/put/delete
   * router.get 第一个参数：地址 第二个参数：中间件

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

### Others
1. 开闭原则：软件中的对象（类，模块，函数等等）应该对于扩展是开放的，但是对于修改是封闭的
2. 循环引用


### [IMOOC-Koa](https://coding.imooc.com/learn/list/342.html)