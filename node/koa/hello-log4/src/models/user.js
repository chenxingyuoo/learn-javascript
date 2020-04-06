const mongoose = require('../db')

// 定义数据表结构
const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String }, 
  age: { type: Number },
  createTime: { type: Date }
})

// 构造model并导出
module.exports = mongoose.model('User', UserSchema)