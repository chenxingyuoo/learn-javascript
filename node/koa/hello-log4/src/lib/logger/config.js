let path = require('path')

//日志根目录
let baseLogPath = path.resolve(__dirname, '../../../logs')

/*报错输出日志*/
//错误日志目录、文件名、输出完整路径
let errorPath = '/error'
let errorFileName = 'error'
let errorLogPath = baseLogPath + errorPath + '/' + errorFileName

/*请求数据得到响应时输出响应日志*/
//响应日志目录、文件名、输出完整路径
let responsePath = '/response'
let responseFileName = 'response'
let responseLogPath = baseLogPath + responsePath + '/' + responseFileName

/*操作数据库进行增删改等敏感操作记录日志*/
//操作日志目录、文件名、输出完整路径
let handlePath = '/handle'
let handleFileName = 'handle'
let handleLogPath = baseLogPath + handlePath + '/' + handleFileName

module.exports = {
  //日志格式等设置
  appenders: {
    ruleConsole: { type: 'console' },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      path: errorPath,
      pattern: '.yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8'
    },
    resLogger: {
      type: 'dateFile',
      filename: responseLogPath,
      path: responsePath,
      pattern: '.yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10485760, // 日志文件大小,超过该size则自动创建新的日志文件
      backups: 5,           // 仅保留最新的20个日志文件
      compress: true        //  超过maxLogSize,压缩代码
    },
    handleLogger: {
      type: 'dateFile',
      filename: handleLogPath,
      path: responsePath,
      pattern: '.yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10485760,
      backups: 5,
      compress: true
    }
  },
  //供外部调用的名称和对应设置定义
  categories: {
    default: { appenders: ['ruleConsole'], level: 'all' },
    resLogger: { appenders: ['resLogger'], level: 'info' },
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    handleLogger: { appenders: ['handleLogger'], level: 'all' },
    http: { appenders: ['resLogger'], level: 'info' }
  },
  baseLogPath: baseLogPath
}
