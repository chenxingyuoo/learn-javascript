const Koa = require('koa')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const loginRouter = require('./routes/login')

// 创建一个Koa对象表示web app本身:
const app = new Koa()

app.use(bodyParser())

// 注册中间件，将render函数映射到ctx对象
app.use(views(__dirname + '/views', {
  extension: 'ejs' // 文件后缀
}))

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// add router middleware:
app.use(router.routes())
app.use(loginRouter.routes())

// 在端口3000监听:
app.listen(3000)
console.log('app started at port 3000...')