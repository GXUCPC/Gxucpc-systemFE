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
