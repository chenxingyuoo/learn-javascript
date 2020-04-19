const jwt = require('jsonwebtoken')
const expiresIn = 60 * 60
const secret = 'secret key'

// 签名
exports.sign = (json, options = {}) => {
  const token = jwt.sign(json, secret, Object.assign({
      expiresIn: expiresIn // 设置过期时间
  }, options))
  return token
}

// 验证
exports.verify = async (token) => {
  return await jwt.verify(token, secret)
}
