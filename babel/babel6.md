# babel6


先上总结:

1. babel6中的polyfill方案主要包括：`babel-polyfill`和`babel-runtime`
但前者会污染全局，修改原型;
后者则可以弥补这一问题,但是es6的实例方法，babel-runtime是无法支持的,原因是`babel-runtime`中包含的core-js,应该是类似于core-js@2,只支持static方法,不支持实例方法。(babel6时的`babel-runtime`是包含core-js的,但是`@babel/runtime`在babel7.0.0后也去除了polyfill能力的core-js)

2. `@babel/preset-env`的`useBuiltIns`方式 在babel7应用中便诞生了。他继承了`babel-runtime`不污染全局的特征，并且完善了runtime对原型方法支持不足的缺点。因此是目前应用的主要配置方式。 

备注：
babel6:`babel-polyfill`和`babel-runtime`
babel7:`@babel/polyfill`和`@babel/runtime`

参考文章： https://juejin.cn/post/6931186451224887309


## 一、方案
### 1.1 全局babel-polyfill（影响全局，一劳永逸）
1. 引入：
* script标签引入babel-polyfill
* 在入口文件中 `import / require `,如 `import 'babel-polyfill' `。
* 使用webpack的话也可以在entry中添加 `entry: ['babel-polyfill', 'src/index.js']`。

2. 优点：
一次引入，全局使用。
会转换实例方法和静态方法，比较全面。

3. 缺点：
影响全局作用域。
打出来的包比较大，不管用没用到都打进去了。
污染了全局环境。引入新的全局对象，修改了原型方法,假如重写和标准不一致的实例方法,这样就会报错。

使用场景：
开发业务项目，比较全面，不会漏了从而出问题，比如Object.assign这样的方法在ios8上面还是需要polyfill的。

   


### 1.2.  在babel-runtime中单独引入
结合babel-plugin-transform-runtime按需引入

为了不污染全局对象和内置的对象原型，但是又想体验使用新鲜语法的快感。就可以配合使用babel-runtime和babel-plugin-transform-runtime
1. `npm install --save-dev babel-plugin-transform-runtime`
2. `npm install --save babel-runtime`

和直接在入口引入polyfill不同，该插件引入的polyfill是模块私有的。
对于需要的polyfill需要手动引入，`import Promise from 'babel-runtime/core-js/promise'`

优点：
该模块私有，不会影响到全局作用域。
打出来的包因为按需引入包不会很大。

缺点：
因为不影响全局作用域，所以不会转实例和静态方法这样的API。
手动引入所需，搞不好会漏掉。

使用场景：
开发库，框架之类可以使用，因为别人用你的东西然后不知情的情况下你改了别人的全局环境，然后出错了就尴尬了。

### 4.3. 使用babel-plugin-transform-runtime按需引入

这个插件可不简单，有好几个功能：

和插件babel-runtime一样引入的polyfill是私有的，不会影响全局作用域。并且是自动按需引入需要的polyfill，不需要想babel-runtime一样一个一个手动引入。
可以提取语法转换时候每个模块都生成的各种helper，成一个引用。
自动转换generators/async。

优点：
该模块私有，不会影响到全局作用域。
打出来的包因为按需引入包不会很大。
自动按需引入，不需要手动，防止遗漏。
提取helper，大大减少冗余代码。

缺点：
因为不影响全局作用域，所以不会转实例和静态方法这样的API。

使用场景：
同babel-runtime。

注：该插件依赖babel-runtime。

按需加载

 ````javascript
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
    }
  }
}
 ````


 [API转换](https://www.cnblogs.com/zhishaofei/p/10058132.html)

 
 

小结：
1. babel6的核心有 babel-core babel-cli babel-node babel-register babel-polyfill，这些在babel7会有所修改。
2. polyfill 是依赖core-js的
3. babel7.4放弃了@babel/polyfill直接依赖core-js@2或者3。



## 二、发展

1. `@babel/preset-env`的`useBuiltIns`方式 在babel7应用中便诞生了。他继承了`babel-runtime`不污染全局的特征，并且完善了runtime对原型方法支持不足的缺点。因此是目前应用的主要配置方式。 
