const Koa = require('koa')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const userRouter = require('./routes/user')
const logger = require('./lib/logger')

// 创建一个Koa对象表示web app本身:
const app = new Koa()

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.PORT', process.env.PORT)

app.use(bodyParser())

// 注册中间件，将render函数映射到ctx对象
app.use(views(__dirname + '/views', {
  extension: 'ejs' // 文件后缀
}))

// 请求日志中间件
app.use(async (ctx, next) => {
  const start = new Date()
  let ms
  try {
    await next()
    ms = new Date() - start
    // 记录响应日志
    logger.logResponse(ctx, ms)	
  } catch (err) {
    ms = new Date() - start
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
        message: err.message
    }

    // 记录响应日志
    logger.logResponse(ctx, ms)	

    // 手动释放error事件
    ctx.app.emit('error', err, ctx, ms)
  }

  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`)
})

// 路由中间件
app.use(router.routes())
app.use(userRouter.routes())

// 监听错误
app.on('error', async (err, ctx, ms) => {
  // 记录异常日志
  logger.logError(ctx, err, ms) 
  
  console.error('server error', err.message)
})

// 在端口3000监听:
app.listen(3000)
console.log('app started at port 3000...')