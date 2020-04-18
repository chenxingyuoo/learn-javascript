const router = require('koa-router')()
const controller = require('../controller/user')
const auth = require('../middleware/auth')

router.prefix('/user')

// 用户注册
router.post('/register', controller.register)

// 登陆
router.post('/login', controller.login)

// 根据id查询
router.get('/info/:id', auth, controller.info)

// 更新
router.post('/update', auth, controller.update)

// 删除
router.delete('/delete/:id', auth, controller.delete)

module.exports = router
