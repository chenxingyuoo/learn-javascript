const Router = require('koa-router')
// 创建一个router
const router = Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

// 添加路由
router.get('/user/:name', async (ctx, next) => {
  const name = ctx.params.name
  await ctx.render('user', {
    name: name
  })
})

// 导出模块
module.exports = router