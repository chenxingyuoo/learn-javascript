const origin = typeof process.argv[2] != 'undefined' ? process.argv[2] : 'origin/dev';

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
      user : 'root',                    // ssh 用户
      host : ['101.200.82.95'],            // ssh 地址
      ssh_options: 'StrictHostKeyChecking=no',
      ref  : 'origin/master',           // git 远程分支
      repo : 'git@github.com:chenxingyuoo/learn-javascript.git', // git 地址
      path : '/home/project/hello-pm2',     //服务器文件路径
      'post-deploy' : 'cd node/koa/hello-pm2 && npm install && pm2 reload ecosystem.config.js --env env_production'
    }
  }
}