 ## 一、模块化的发展历程
[模块化的发展历程](https://www.zhihu.com/question/475958441/answer/2032457410)
1. 模块化的发展主要经历了这样几个阶段，「iife、CommonJS、AMD、CMD、UMD、ES Module」 这么几个阶段。（因为 iife 的形式其实也是在一定程度上隔绝了变量的问题，因此也纳入了这个过程中。）对应的打包关系就是这样：「iife」（不打包）-> 「CommonJS、AMD、CMD、UMD」（打包）-> 「ES Module」（不打包）其实究其原因打包不打包的核心问题就是，规范 + 浏览器的推进。
把时间回退到2006年，这个时候 「jQuery」 刚呱呱落地，那个时候虽然没有模块化，使用 jQuery 相比传统那样写已经提高极大的速度，当然虽然已经很方便了，单还是阻挡不了爱研究的程序员们。

2. 在2009年的时候 「CommonJS」 诞生了，但是 「CommonJS」 由于有两个重要问题没能得到解决，所以迟迟不能推广到浏览器上。（1.由于外层没有 function 包裹，被导出的变量会暴露在全局中。2.在服务端 require 一个模块，只会有磁盘 I/O，所以同步加载机制没什么问题；但如果是浏览器加载，一是会产生开销更大的网络 I/O，二是天然异步，就会产生时序上的错误。）中间百家争鸣（「AMD、CMD、UMD」）
3. 一直到2016年5月，经过了两年的讨论，ECMAScript 6.0 终于正式通过决议，成为了国际标准。在这一标准中，首次引入了 import 和 export 两个 JavaScript 关键字，并提供了被称为 「ES Module」 的模块化方案。在 JavaScript 出生的第 21 个年头里，JavaScript 终于迎来了属于自己的模块化方案。而在这期间想要使用模块化，只能通过打包工具来解决。有了标准之后，也不是能立马让所有设备都支持 「ES Module」 因为浏览器的推进是一个漫长的过程，不像服务端，如果做一个升级，只需要对服务端升级，而浏览器的升级伴随着电脑/手机等一系列的因素，因素非常不可控，因为用户总是可以有多种多样的选择，「ES Modules（ESM）」 是 JavaScript 官方的标准化模块系统，而它这一走，却在标准化的道路上已经花费了近 10 年的时间。在2018 年 5 月 Firefox 60 发布之后，所有的主流浏览器就都支持 「ESM」 了。 

## 二、自己理解的模块机制
## 2.1. amd:异步模块加载规范
amd示例:
```javascript
define(['jquery', 'echarts'], function ($, echarts) {
  var AMD = function(){}
  AMD.prototype = {
       title:'',
        foo: function(){}//AMD类或者继承AMD类的子类的属性
  }
  function bar(){}//返回，公共属性
  function baz(){} //未返回，私有属性
  return {
       main:AMD,
       bar: bar
  }
});

```

## 2.2 ESModules
  只支持import export
  浏览器最终是统一按照esModlues来实现的
  也就是说浏览器中实际支持的是import和export

## 2.3 commonjs
   CommonJs是通过module.exports，exports导出，require导入
 
## 三、CommonJs与ESModule的区别
1. 两者的模块导入导出语法不同，
   CommonJs是通过module.exports，exports导出，require导入；
   ESModule则是export导出，import导入。
2. CommonJs是运行时加载模块，ESModule是在静态编译期间就确定模块的依赖。
   ESModule在编译期间会将所有import提升到顶部，CommonJs不会提升require。
3. CommonJs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。 ESModule是导出的一个引用，内部修改可以同步到外部。
4. CommonJs中顶层的this指向这个模块本身，而ESModule中顶层this指向undefined。
CommonJS加载的是整个模块，将所有的接口全部加载进来，ESModule可以单独加载其中的某个接口；

这就引发到vite的一些所谓不能使用require的问题上,因为vite是直接按照esmodule的形式来搞的