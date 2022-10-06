const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //关闭语法检查
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '广西大学程序设计竞赛服务平台';
      return args;
    })
  },
})

switch(process.env.VUE_APP_CURENV){
  case "development":
    console.log("当前运行环境为：开发环境")
    break;
  case "production":
    console.log("当前运行环境为：生产环境")
    break;
}
