# uni-app实践

## 一. UI支持
1. uni-app 支持的通用 css 单位包括 px、rpx

px 即屏幕像素
rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算

2. 关于uni-app的ui库、ui框架、ui组件
* uni-ui 目前可以良好支持vue3
* uView 目前有以uView1.0版本为蓝本的vue3版本,最热的uView2.0貌似还不支持vue3
* uCharts 绘制chart图,已经支持vue3
[DClude插件市场](https://ext.dcloud.net.cn/)


3. uni-ui

uni-app是有内置组件的,内置组件以外,DCloud官方出了一套扩展组件，即uni-ui,自定义样式需要sass
目前已经支持vue3
[uni-ui](https://uniapp.dcloud.io/component/uniui/uni-ui.html)
[uni-ui更新日志](https://ext.dcloud.net.cn/plugin?id=55&update_log)
组件需要依赖 sass 插件 ，请自行手动安装

4. 扩展组件的选择

遵循uni规范的组件可以跨端通用,其他比如vant只能h5，vant weAPP只能微信
[关于uni-app的ui库、ui框架、ui组件](https://ask.dcloud.net.cn/article/35489)
 所以还是建议uni-ui

## 二、 关于uniapp实践中的离谱问题
 又名uni-app + vue-cli + vue3踩坑实录
 1. sass-loader报错
 ````
  Syntax Error: ValidationError: Invalid options object. Sass Loader has been initialized using an options 
  object that does not match the API schema.
 - options has an unknown property 'data'. These properties are valid:
   object { implementation?, sassOptions?, prependData?, sourceMap?, webpackImporter? }
 ````

 sass-loader报错问题即使切从16换到了node12也不行,应该是他们一直以来的问题
 [sass-loader报错](https://ask.dcloud.net.cn/question/138264?notification_id-84803__rf-false__item_id-25486)

 
 换成vite之后倒是不存在这个问题,因为vite只要安装sass就可以
 看回复以及官方建议移除这个问题很长时间了,怀疑是官方忙着搞vite一直没管这个问题
 或者跟渲染版本有关系,社区中关于渲染版本的问题貌似还挺多

2. Error: Cannot find module 'webpack/lib/RuleSet'报错问题
 [vue-cli回退](https://ask.dcloud.net.cn/question/131747?notification_id-84803__rf-false__item_id-25486)
 [node回退](https://segmentfault.com/q/1010000040393536?_ea=152307361)
 这个问题按照方案可以解决

 3. defineComponent报错-无法解决
方案:webpack打包VUE3+TS
 浏览器报错defineComponent is not a function
 >  Object(...) is not a function
 打包警告
 > "export 'createApp' was not found in 'vue' 
 > "export 'defineComponent' was not found in 'vue'

最后还是放弃了webpack,按照官方的vite项目示例走,直接上setUp语法糖

## 三. VU3尝试方案:
1. webpack+V3+TS 失败, 自己搭建和网络上的demo均告失败
2. vite + Vue3 + setUp语法糖 + TS + uni-ui + sass 成功运行
 node版本12
 微信小程序效果确认
 h5效果确认

 
### 3.1 vite + Vue3 + setUp语法糖 + TS + uni-ui + sass

 
[uni-ui效果示例](http://vue3-hellouniapp.dcloud.net.cn/pages/extUI/grid/grid)
[uni-ui使用效果示例](https://uniapp.dcloud.io/component/uniui/uni-group.html)
 

一个提PR的经历：https://juejin.cn/post/7078110002627477540