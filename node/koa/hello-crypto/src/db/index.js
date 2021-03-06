const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/mongoose_database'

// 通过字符串连接
mongoose.connect(DB_URL,{
  useNewUrlParser: true
})

mongoose.connection.on('connected', function () { 
  console.log('Mongoose connection open to ' + DB_URL);
})

/** * 连接异常 */ 
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose connection error: ' + err);
})

/** * 连接断开 */ 
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
 