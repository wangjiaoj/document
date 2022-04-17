 
## 一、CommonJs与ESModule的区别
1. 两者的模块导入导出语法不同，
   CommonJs是通过module.exports，exports导出，require导入；
   ESModule则是export导出，import导入。
2. CommonJs是运行时加载模块，ESModule是在静态编译期间就确定模块的依赖。
   ESModule在编译期间会将所有import提升到顶部，CommonJs不会提升require。
3. CommonJs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。 ESModule是导出的一个引用，内部修改可以同步到外部。
4. CommonJs中顶层的this指向这个模块本身，而ESModule中顶层this指向undefined。
CommonJS加载的是整个模块，将所有的接口全部加载进来，ESModule可以单独加载其中的某个接口；

这就引发到vite的一些所谓不能使用require的问题上,因为vite是直接按照esmodule的形式来搞的


##  二、引入和导出
### 2.1. 引入和导出
引入： require / import 
导出：export / `module.exports` / exports 
### 2.2 在webpack\node\浏览器中的支持
1. Nodejs 不支持 import 和 export
2. es6 兼容以上所有语法，当然需要 webpack + babel 来支撑
尽管es6兼容以上所有语法，但需要注意：
在webpack打包的时候，可以在js文件中混用 require 和 export。但是不能混用 import 以及 `module.exports`
3. 浏览器最终是统一按照esModlues来实现的
  也就是说浏览器中实际支持的是import和export


## 四、vue的require问题

先来说一下`export default` 与 `require` 和` import` 的关系
通过`export default`导出的，如果你使用`import xxx from 'xxx'` 就可以直接使用，但如果你使用`require('xxx')`，却需要`xxx.default` 来使用.

vue-loader升级到13.x之后，require就必须要带上`.default`,也就是`require('./aa.vue).default`。
之前版本之所以可以直接使用`require('./aa.vue)`,应该是之前版本的vue-loader没有明确这个使用差异问题。

[export、exports、modules.exports 和 require 、import 的一些组合套路和坑](https://www.cnblogs.com/CyLee/p/5836069.html)



 