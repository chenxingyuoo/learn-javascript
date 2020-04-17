/*
 * 操作用户逻辑方法
 */
const UserModel = require('../models/user')
const logger = require('../lib/logger')

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
 *              - "name"
 *              - "password" 
 *            properties:
 *              name:
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