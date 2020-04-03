const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
  await ctx.render('login.ejs')
})

// 添加post url
router.post('/user/login', async (ctx, next) => {
  const body = ctx.request.body
  const name = body.name || ''
  const password = body.password || ''

  if (name === 'koa' && password === '12345') {
    // 重定向到 /user/:name url
    ctx.redirect(`/user/${name}`)
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/login">Try again</a></p>`
  }
})

// 处理post json数据请求
router.post('/user/jsonlogin', async (ctx, next) => {
  const body = ctx.request.body
  const name = body.name || ''
  const password = body.password || ''

  if (name === 'koa' && password === '12345') {
    ctx.response.body = {
      code: 200,
      data: name,
      message: 'Login successed'
    }
  } else {
    ctx.response.body = {
      code: 500,
      data: null,
      message: 'Login failed'
    }
  }
})

module.exports = router