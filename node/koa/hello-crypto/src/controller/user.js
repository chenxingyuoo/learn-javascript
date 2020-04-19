/*
 * 操作用户逻辑方法
 */
const UserModel = require('../models/user')
const logger = require('../lib/logger')
const jwt = require('../lib/jwt')
const hash = require('../lib/utils/hash')

console.log('aa', hash.create('12345'))

const k = hash.create('12345')
console.log('hash.c', hash.compare('12345', k))

/**
 * @swagger
 *
 * /user/register:
 *   post:
 *     tags:
 *      - user
 *     operationId: userRegister
 *     description: 用户注册
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: 参数
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *            type: object
 *            required:
 *              - "username"
 *              - "password" 
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: fail
 */
exports.register = async (ctx, next) => {
  logger.logHandle('用户注册:' + JSON.stringify(ctx.request.body))

  const body = ctx.request.body
  const password = hash.create(body.password)

  const user = new UserModel({
    username: body.username || '',
    password: password || '',
    createTime: new Date()
  })
  
  // 保存数据
  const res = await user.save()

  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
}

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     tags:
 *      - user
 *     operationId: userLogin
 *     description: 用户登陆
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: 参数
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *            type: object
 *            required:
 *              - "username"
 *              - "password" 
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: fail
 */
exports.login = async (ctx, next) => {
  logger.logHandle('用户登陆:' + JSON.stringify(ctx.request.body))

  const body = ctx.request.body
  const username = body.username
  const password = body.password
  
  const res = await UserModel.findOne({ username: username })

  if (!res) {
    ctx.body = {
      code: 500,
      data: null,
      message: '用户不存在'
    }
    return
  }

  console.log('password', password)  
  console.log('res.password', res.password)  
  
  // 验证密码
  if (!hash.compare(password, res.password)) {
    ctx.body = {
      code: 500,
      data: null,
      message: '密码错误'
    }
    return
  }

  const token = jwt.sign({
    _id: res._id
  })
  
  ctx.body = {
    code: 200,
    data: token,
    message: 'successed'
  }
}

/**
 * @swagger
 *
 * /user/info/:id:
 *   get:
 *     tags:
 *      - user
 *     operationId: userInfo
 *     description: 查询用户信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: url
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: fail
 */
exports.info = async (ctx, next) => {
  // 记录操作日志
  logger.logHandle('查询用户信息, id:' + ctx.params.id)

  const id = ctx.params.id
  const res = await UserModel.findById({ _id: id })
    
  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
}

// 更新用户信息
exports.update = async (ctx, next) => {
  logger.logHandle('更新用户信息:' + JSON.stringify(ctx.request.body))

  const body = ctx.request.body
  const res = await UserModel.findByIdAndUpdate({ _id: body.id }, body)
  
  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
}

/**
 * @swagger
 *
 * /user/delete/:id:
 *   delete:
 *     tags:
 *      - user
 *     operationId: deleteUser
 *     description: 删除用户
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: url
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: fail
 */
exports.delete = async (ctx, next) => {
  logger.logHandle('删除用户, id:' + ctx.params.id)

  const id = ctx.params.id
  const res = await UserModel.findByIdAndRemove({ _id: id })

  ctx.body = {
    code: 200,
    data: res,
    message: 'successed'
  }
}