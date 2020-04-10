const router = require('koa-router')()
const controller = require('../controller/user')

// 用户注册
router.post('/user/register', controller.register)

// 根据id查询
router.get('/user/info/:id', controller.info)

// 更新
router.post('/user/update', controller.update)

// 删除
router.delete('/user/delete/:id', controller.delete)

module.exports = router
