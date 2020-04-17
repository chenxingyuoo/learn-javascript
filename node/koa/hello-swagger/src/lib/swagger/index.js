const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'hello-swagger',
    version: '1.0.0',
    description: 'hello-swagger 1.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  // 可用于标记单个Apis和ApiOperations的全局标记，简单说就是划分模块
  tags: [
    {
      "name": "user",
      "description": "user module"
    }
  ]
}

// initialize swagger-jsdoc
module.exports = function () {
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // 写文档的文件路径
    apis: [path.resolve(__dirname, '../../controller/*.js')],
  }
  return swaggerJSDoc(options)
}