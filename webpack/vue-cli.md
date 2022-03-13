# vue-cli 
## 一、默认配置
vue-cli帮忙配置了很多东西，减少我们的配置工作量,比如默认postCss,默认autoprefix,我们只要配置Browserslist就可以。
Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。
所有的 Vue CLI 应用都使用 @vue/babel-preset-app，它包含了 babel-preset-env、JSX 支持以及为最小化包体积优化过的配置。
## 二、svg配置

````javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}
````
## 三、其他配置
1. 默认不对node_module编译，部分node_module包可能没有编译过，需要自己配置加入编译`transpileDependencies`
2. 关于debugger配置，可以在chainWebpack配置中设置保留debugger
vue-cli4示例：
````javascript
config.optimization.minimizer('terser').tap((args)=>{
  //console.log
  args[0].terseroptions.compress.drop_console = false;
  //debugger
    args[0].terseroptions.compress.drop_debugger = false;
})
````