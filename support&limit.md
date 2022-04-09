
## 一、node依赖版本统计
vite 要 Node.js 12.0.0 以上版本，但推荐在 14.0.0 以上以获得最佳支持；
vue-cli 4.5 需要 Node.js 10.12.0 以上版本；
vue-cli 5.0（目前还是 beta 版）也需要 Node.js 12.0.0 以上版本。
Webpack 4 需要 Node.js 6.11.5 以上版本，但推荐在 8.9.4 以上以获得最佳支持；
Webpack 5 需要 Node.js 10.13.0 以上版本。
create-react-app 5.0 需要node14
create-reate-app 4.0.3 还是支持node12的,最低支持版本未知 可能是node10
taro 要求node12
win10才能支持node14 

## 二、框架对浏览器支持状态统计
vue2支持浏览器IE9(+)
vue3不再支持IE，IOS>=10,Android>=5
react18不再支持IE
react17官方说法是支持IE9(+)
[react文档](https://reactjs.org/docs/react-dom.html)
## 三、vue3
vue-cli 4就已经支持vue3了
vite如果使用的话可能需要补充一下生产环境打包方式
UI框架里面 element-plus vant3.x等 是支持 Vue 3
### 3.1 vite:
webpack是提前编译好，然后才打开页面，一旦打开页面，切换路由是很快的。
vite是把前期的时间全部均摊到了加载vue组件上了。

vite目前开发和生产环境进行差异化处理，生产环境使用的是 Rollup ,支持的最低浏览器要求支持ES2015语法(ES6),也就是开发和生产环境差异打包可能存在隐患


(es6兼容)[http://kangax.github.io/compat-table/es6/]


Chrome：51 版起便可以支持 97% 的 ES6 新特性。
Firefox：53 版起便可以支持 97% 的 ES6 新特性。
Safari：10 版起便可以支持 99% 的 ES6 新特性。
IE：Edge 15可以支持 96% 的 ES6 新特性。Edge 14 可以支持 93% 的 ES6 新特性。（IE7~11 基本不支持 ES6


vite的浏览器兼容性：
用于生产环境的构建包会假设目标浏览器支持现代 JavaScript 语法。默认情况下，Vite 的目标浏览器是指能够 支持原生 ESM script 标签 和 支持原生 ESM 动态导入 的。
你也可以通过 build.target 配置项 指定构建目标，最低支持 es2015。

请注意，默认情况下 Vite 只处理语法转译，且 默认不包含任何 polyfill。你可以前往 Polyfill.io 查看，这是一个基于用户浏览器 User-Agent 字符串自动生成 polyfill 包的服务。

传统浏览器可以通过插件 @vitejs/plugin-legacy 来支持，它将自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。）

## 四、创建工具
create-react-app和vue-cli均在V5版本开始支持webpack5
create-reate-app V5 移除了对node12的支持,会提示要求要求node14
 

## 五、关于版本
RC=Release Candidate,含义是”发布候选版”，它不是最终的版本，而是最终版(RTM=Release To Manufacture)之前的最后一个版本。
广义上对测试有三个传统的称呼：alpha、beta、gamma，用来标识测试的阶段和范围。
alpha 是指内测，即现在说的CB，指开发团队内部测试的版本或者有限用户体验测试版本。
beta 是指公测，即针对所有用户公开的测试版本。然后做过一些修改，成为正式发布的候选版本时叫做gamma，现在叫做RC（Release Candidate）。
 
