const router = require('koa-router')()
const UserModel = require('../models/user')

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

// 用户注册
router.post('/user/register', async (ctx, next) => {
  const body = ctx.request.body
  const user = new UserModel({
    username: body.name || '',
    password: body.password || '',
    createTime: new Date()
  })
  
  // 保存数据
  const res = await user.save()

  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
})

// 根据id查询
router.get('/user/info/:id', async (ctx, next) => {
  const id = ctx.params.id
  const res = await UserModel.findById({ _id: id })
  
  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
})

// 更新
router.post('/user/update', async (ctx, next) => {
  const body = ctx.request.body
  const res = await UserModel.findByIdAndUpdate({ _id: body.id }, body)
  
  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
})

// 删除
router.delete('/user/delete/:id', async (ctx, next) => {
  const id = ctx.params.id
  const res = await UserModel.findByIdAndRemove({ _id: id })

  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
})

module.exports = router
