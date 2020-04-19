const crypto = require('crypto')

const salt = ':hhug6dcKyCNBQ5sUC0i6hja5dCTqdSzV' // 盐值

// 创建 加"盐" hash
const create = (data) => {
  const md5 = crypto.createHash('sha256')
  // 将数据拼接上任意长度的随机字符串后，再进行 Hash
  md5.update(data + salt)
  return md5.digest('hex')
}

exports.create = create

// 对比密码
exports.compare = (data, encrypted) => {
  return create(data) === encrypted
}



