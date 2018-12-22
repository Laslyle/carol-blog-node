const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const serve = require('koa-static') // 静态资源服务插件
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')  //解析json等文件
const logger = require('koa-logger')  //日志记录
const cors = require('@koa/cors') //用于跨域请求
const path = require('path') // 路径管理


const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 配置静态资源, 可以直接通过文件目录访问文件
const main = serve(path.join(__dirname))

app.use(main)

app.use(require('./routes/index').routes())

app.listen(4200) // 服务启动端口
console.log('启动成功：打开 http://localhost:4200/') // 日志打印

module.exports = app
