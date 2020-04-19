const router = require('koa-router')()
const Swagger = require('../lib/swagger')

// serve swagger
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  const swaggerSpec = Swagger()
  ctx.body = swaggerSpec
})

module.exports = router