const router = require('koa-router')()
const controller = require('../controller/user')

router.prefix('/user')

// 用户注册
router.post('/register', controller.register)

// 根据id查询
router.get('/info/:id', controller.info)

// 更新
router.post('/update', controller.update)

// 删除
router.delete('/delete/:id', controller.delete)

module.exports = router
