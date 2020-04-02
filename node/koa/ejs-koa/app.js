const Koa = require('koa')
const views = require('koa-views')

// 创建一个Koa对象表示web app本身:
const app = new Koa()

// 注册中间件，将render函数映射到ctx对象
app.use(views(__dirname + '/views', {
  extension: 'ejs' // 文件后缀
}))

app.use(async (ctx) => {
  const user = {
    name: 'koa'
  }
  const list = [
    {
      label: 'javascript'
    },
    {
      label: 'node.js'
    }
  ]

  // 上面配置了extension ejs, 这里模版名称会自动加上后缀，index 等与 index.ejs
  await ctx.render('index', {
    user: user,
    list: list
  })
})

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');