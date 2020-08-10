/*
 * @Description: 服务入口
 * @Date: 2020-04-16 12:50:02
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @LastEditTime: 2020-08-10 18:56:28
 */
const Koa = require('koa')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const userRouter = require('./routes/user')
const swaggerRouter = require('./routes/swagger')
const logger = require('./lib/logger')

// 创建一个Koa对象表示web app本身:
const app = new Koa()

const expressSwagger = require('koa-swagger-generator')(app)

app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/public'))

// 注册中间件，将render函数映射到ctx对象
app.use(
  views(__dirname + '/views', {
    extension: 'ejs' // 文件后缀
  })
)

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
app.use(swaggerRouter.routes())

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./controller/**/*.js'] //Path to the API handle folder
}
expressSwagger(options)

// 监听错误
app.on('error', async (err, ctx, ms) => {
  // 记录异常日志
  logger.logError(ctx, err, ms)

  console.error('server error', err.message)
})

// 在端口3000监听:
app.listen(3000)
console.log('app started at port 3000...')
