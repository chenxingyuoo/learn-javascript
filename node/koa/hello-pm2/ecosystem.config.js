module.exports = {
  apps: [
    {
      // 项目名称
      name: "hello-pm2",
      // 项目启动入口文件
      script: "src/app.js",
      // 实例数
      instances: 4, 
      // cluster模式
      exec_mode: "cluster", 
      // 项目环境变量
      env_test: {
        "NODE_ENV": "test",
        "PORT": 3000,
        // ...
      },
      env_development: {
        "NODE_ENV": "development",
        "PORT": 3000,
        // ...
      },
      env_production: {
        "NODE_ENV": "production",
        "PORT": 3000,
        // ...
      }
    }
  ],
  deploy: {
    production : {
      user : 'root',                       // ssh 用户
      host : ['101.200.82.95'],            // ssh 地址
      ref  : 'origin/master',              // git 远程分支
      repo : 'git@github.com:chenxingyuoo/learn-javascript.git', // git 地址
      path : '/home/project/hello-pm2',     // 服务器文件路径
      'post-deploy' : 'cd node/koa/hello-pm2 && npm install && pm2 startOrRestart ecosystem.config.js --env production' // 在 deploy 后触发，执行远程脚本
    },
    development : {
      user : 'root',
      host : ['xxx'],
      ref  : 'origin/dev',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env development'
    },
    test: {
      //...
    }
  }
}