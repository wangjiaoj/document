OpenWrite ，自媒体-工具平台
https://openwrite.cn/?from=article_bottom


####  搭建组件库
* 采用storybook搭建组件库

文档生成器
[文档生成器docute、docsify、vuepress](https://www.hojun.cn/2020/02/14/ck8irvl2u00eodwtuwr1ldb60/#%E6%9C%80%E5%90%8E%E4%B9%9F%E6%98%AF%E6%9C%80%E6%A3%92%E7%9A%84)

[静态网站生成器Hexo、Gitbook、Vuepress、Docsify、Docute、Nuxt](https://www.oicqzone.com/pc/2020080825008.html)

[eslint官网](https://eslint.bootcss.com/)



[给开源项目贡献PR流程](https://juejin.cn/post/7092414491836710925)

## 二、技术/框架/用处

1. nuxtjs(vue-ssr) 考虑进行ssr
 nextjs 考虑进行ssr

nextjs未来可能的对手 Remix


2.  tailwind
    感觉类似样式库的样子,通过class名来进行样式设计和复用

###  2.2 nest.js
1. nest.js 考虑直接做后端服务，egg.js也是类似的，但貌似不能直接typescript。建议egg.js


Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。
Nest 框架底层 HTTP 平台默认是基于 Express 实现的，所以无需担心第三方库的缺失。 Nest 旨在成为一个与平台无关的框架。 通过平台，可以创建可重用的逻辑部件，开发人员可以利用这些部件来跨越多种不同类型的应用程序。 nest 目前有两个支持开箱即用的 HTTP 平台：express 和 fastify 可以在项目中直接引入。
  

大概介绍一下下  
* Express.js 是 Node.JS 诞生之初，是一款基于Node.js以及Chrome V8引擎，快速、极简的JS服务端开发框架。
* Koa.js是一款微型Web框架，写一个hello world很简单，但web应用离不开session，视图模板，路由，文件上传，日志管理。这些 Koa 都不提供，需要自行去官方的 Middleware 寻找。然而，100个人可能找出100种搭配。
* Egg.js是基于Koa.js，解决了上述问题，将社区最佳实践整合进了Koa.js，另取名叫Egg.js，并且将多进程启动，开发时的热更新等问题一并解决了。这对开发者很友好，开箱即用，开箱即是最(较)佳配置。Egg.js发展期间，ECMAScript又推出了 async await，相比yield的语法async写起来更直。后面Koa.js也同步进行了跟进。
* Midway 是阿里团队，基于渐进式理念研发的 Node.js 框架，结合了 OOP和函数式两种编程范式。以 egg 是作为底层框架，加上了良好的TypeScript的定义支持等众多新特性,推出了Midway，有兴趣的小伙伴可以去官方文档学习一下
* Nest.js 基于Express.js的全功能框架 Nest.js，他是在Express.js上封装的，充分利用了TypeScript的特性；Nest.js的优点是社区活跃，涨势喜人，截止目前在 GitHub 拥有 43.7k Star 是近期比较热门的企业级框架。
基于支持底层支持ts与企业级和社区活跃度等综合考虑，这里我选择用nest来进行学习。各位同学可以按需选择。

 
 
链接：https://juejin.cn/post/7054421306845954056
 






## 三、关于类型检查
   ts以外的进行类型检查的类似插件或方案
1. TypeScript

2. Facebook 的 Flow 类型检查
   vue3设计开发过程中曾经使用过,后来切换到TS
   [[译]尤雨溪：Vue3的设计过程](https://juejin.cn/post/6844903823937372174)
   [flow类型检查](https://segmentfault.com/a/1190000020425195)
2. ProTypes来限制react中的props类型方法
  > import PropTypes from "prop-types"
  其实现在还是比较建议直接迁移到TS

3. 


## dva 
dva首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。



## husky 
husky：Git hooks 工具
对git执行的一些命令，通过对应的hooks钩子触发，执行自定义的脚本程序


Flutter 是 Google 于 2018 年创建并正式推出的一项年轻的开源技术。与 React Native 类似，Flutter 支持使用一个代码库来构建跨平台的类原生应用程序。它是用 Dart 开发的

dart-sass也是dart开发的


