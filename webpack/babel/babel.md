# babel

## 一、基础概念

### 1.1 基础概念
Babel通过各种插件语法转旧
1. Babel是一个新语法转旧语法的平台，它只对语法(synax)进行转义，对于api需要使用其对应的插件进行转化。新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。
babel的插件包括prest(预设)和plugin,
babel 中插件的应用顺序是：先 plugin 再 preset，plugin 从左到右，preset 从右到左.
因此babel 的 plugin 比 prset 要先执行.


2. 对于API的转换又分为两部分，一个是全局API例如Promise，Set，Map还有静态方法Object.assign，另一个是实例方法例如`Array.prototype.includes`。对于实例方法core-js@2是转换不了的，只有core-js@3才会转换。



3. corejs  
corejs 就是 babel 7 所用的 polyfill，需要指定下版本，corejs@3 才支持实例方法（比如`Array.prototype.fill`）的 polyfill。
`@babel/preset-env`中的useBuiltIns 就是使用 polyfill (corejs)的方式:
* false:不引入
* usage 每个文件引入用到的,就是按需导入,
* entry 入口处全部引入。


4.  `@babel/preset-env`
preset-env是ES语法插件的合集，官方已经不再推荐使用preset-201x之类的包，该包可以通过配置自动兼容代码，包括自动引入polyfill垫片处理新的API（例如：Promise,Generator,Symbol等）以及 实例方法（例如Array.prototype.includes等）。

也就是说preset-env是基础语法转换，需要配合`corejs`或`@babel/plugin-transform-runtime`使用

推荐配合browserslist文件或者package.json中的`"browserslist": "> 0.25%, not dead"`

babel 7 废弃了 preset-20xx 和 preset-stage-x 的 preset 包，而换成了 preset-env，preset-env 默认会支持所有 es 标准的特性，如果没进入标准的，不再封装成 preset，需要手动指定 plugin-proposal-xxx。

[官方preset-env配置项](https://www.babeljs.cn/docs/babel-preset-env#usebuiltins)

### 1.2 从 babel6:es20xx 到  babel7的`preset-env`

1. preset概念
es 的标准一年一个版本，也就意味着 babel 插件要实时的去跟进，一年实现一系列插件。
新的语法和 api 进入 es 标准也是有个过程的，这个过程分为这几个阶段：
* 阶段 0 - Strawman/稻草人: 只是一个想法，经过 TC39 成员提出即可,可能用 babel plugin 实现
* 阶段 1 - Proposal/提案: 值得继续的建议
* 阶段 2 - Draft/初稿: 完成初步规范(建立spec)
* 阶段 3 - Candidate/候选: 完成规范 并且在浏览器实现
* 阶段 4 - Finished/完成: 会加入到下一年度发布，es20xx spec

有这么多特性要 babel 去转换，每个特性用一个 babel 插件来做。特性（插件）太多，总不能让用户自己去配一个个插件吧，所以 babel 6 引入了 preset 的概念，就是 plugin 的集合。

example：es6 语法就用 babel-preset-es2015，es7 就在引入 babel-preset-es2016
低一级的 stage 会包含所有高级 stage 的内容，例如 stage-1 会包含 stage-2, stage-3 的所有内容。

2. babel6的问题：
* es 的标准每年都在变，现在的 stage-0 可能很快就 stage-2 了，那 preset 怎么维护，要不要跟着变，用户怎么知道这个 stage-x 都支持什么特性？
* 只能转成 es5，那目标环境支持一些 es6 特性了，那这些转换和 polyfill 岂不是无用功？ 而且还增加了产物的体积。
* polyfill 手动引入，比较麻烦，有没有更好的方式

3. babel7怎么解决 babel 6 的问题的:
 
* babel 7 废弃了`preset-20xx `和 `preset-stage-x` 的 preset 包，而换成了`preset-env`，`preset-env` 默认会支持所有 es 标准的特性，如果没进入标准的，不再封装成 preset，需要手动指定 `plugin-proposal-xxx`。
* compat-data给出了每个特性在不同浏览器或者 node 环境中的最低支持版本，babel 基于这个自己维护了一份数据库，[@babel/compat-data](https://github.com/babel/babel/blob/main/packages/babel-compat-data/data/plugins.json)




### 1.3. `@babel/preset-env`与`@babel/plugin-transform-runtime`,`@babel/polyfill`
  
按需引入的定义注意一下：一般是指ast等解析,分析使用到了哪些ES,并针对这些使用到的语法自动引入相应的polyfill
这个跟根据target进行支持的浏览器过滤是两回事


 1. `@babel/preset-env` 默认只会转换语法，也就是我们看到的箭头函数、const一类。如果进一步需要转换内置对象、实例方法，那就得用polyfill, 这就需要做一点配置:参数 `useBuiltIns`是控制 `@babel/preset-env` 使用何种方式帮我们导入 polyfill,可以配置进行按需引入,和按照target浏览器过滤。

2. 后两项比较
* `@babel/polyfill`和`@babel/plugin-transform-runtime`都可以实现api转换(都可以进行按需引入)。
* `@babel/polyfill`会污染全局，`@babel/plugin-transform-runtime`不会。如果不是编写插件或库，可以使用`@babel/polyfill`，否则请使用`@babel/plugin-transform-runtime`。
 
3. `@babel/polyfill`在 Babel 7.4.0中,被deprecated掉了
  应用开发可以使用`@babel/present-env`配置自动按需引入来取代。
 废弃原因：`@babel/polyfill`本身就是stable版本的`core-js`和`regenerator-runtime`的合集。当`core-js`升级到3.0的版本后，将放弃使用`@babel/polyfill`，因为它只包含`core-js 2.0`的版本。
 >As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://blog.csdn.net/m0_37846579/article/details/103379084)


[babel7.4之后babel配置](https://blog.csdn.net/qq_21567385/article/details/107104592?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare)

1. 关于babel7.4.0文档中描述的不推荐使用polyfill的问题。
其实polyfill`core-js`和`regenerator-runtime`，即`import @babel/polyfill`等同于：
>import 'core-js/stable';
>import 'regenerator-runtime/runtime';
所以在针对Babel >= 7.4.0 的情况，我们需要安装 core-js 替代 babel-polyfill,而 regenerator-runtime 会在我们安装 `@babel/runtime` 时自动安装，所以不必单独安装了。

 

6. 以上部分概念总结
 
### es201x, latest
这些是已经纳入到标准规范的语法。例如 es2015 包含 arrow-functions，es2017 包含 syntax-trailing-function-commas。但因为 env 的出现，使得 es2016 和 es2017 都已经废弃。所以我们经常可以看到 es2015 被单独列出来，但极少看到其他两个。
latest 是 env 的雏形，它是一个每年更新的 preset，目的是包含所有 es201x。但也是因为更加灵活的 env 的出现，已经废弃。



 


8. babel参考文档
* babel官方文档：[@babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill)
* 翻译文档参考[翻译文档参考](https://blog.windstone.cc/es6/babel/)
* [回顾 babel 6和7，来预测下 babel 8](https://juejin.cn/post/6956224866312060942)
* [聊一聊 Babel?](https://juejin.cn/post/6844903849442934798)
* [babel polyfill何去何从](https://juejin.cn/post/6931186451224887309)

9. 概念区别
`@babel/polyfills`和``@babel/polyfill`是不一样






#### 1.1 babel-runtime和@babel/runtime
1. babel-runtime（babel6）和 @babel/runtime（babel7）
在babel 6时代的runtime 包含 工具方法（helper）和polyfill功能core-js，可以通过配置babel-plugin-transform-runtime的属性来决定polyfill能力。
 
 2. babel进入7.0.0后，@babel/runtime的core-js被移除，不在支持polyfill的作用，因此只能提供编译的一些工具方法。垫片能力被放到 `@babel/preset-env`的 useBuiltIns完成。


 #### 1.2 babelrc文件：
示例：preset-env是有配置项的：
 ````javascript 
 {
  "presets": [
    [
      "env",
      {
        // 这里就是配置项-比如
        "modules": false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
      }
    ]
  ]
}
````

可以观察出如果某个preset需要配置可以将字符串换成一个数组，第一项是preset的name，第二项就是options。plugin同preset。


babel6到babel7的升级是具有破坏性的，主要总结下polyfill的用法和在babel6和babel7中的不同。






  

## 二、babel7

参考文章：
[@babel/polyfill和@babel/plugin-transform-runtime](https://blog.csdn.net/m0_37613019/article/details/108226550)
[结合Babel 7.4.0 谈一下Babel-runtime 和 Babel-polyfill](https://juejin.im/post/6844903869353295879)



1. babel7使用方案

两种使用方案
方案一：`@babel/preset-env + polyfill(core-js)`，在 usebuildins 设置,
方案二：`@babel/runtime + @babel/runtime-corejs3 + @babel/plugin-transform-runtime`,用来开发类库


`@babel/plugin-transform-runtime`无法进行目标浏览器过滤

 如果既在`@babel/preset-env` 设置了usebuildins，又使用transform-runtime，会发现也不会重复引入，因为babel 中插件的应用顺序是：先 plugin 再 preset, 所以preset-env 先得到了 @babel/runtime 使用帮助函数包装后的代码，然后preset-env中的 useage 又是检测代码使用哪些新特性来判断的， 所以它拿到手的只是一堆 帮助函数,自然没有效果了。
 
### 2.1 @babel/polyfill + core-js@3
 
Babel7 的 presets对babel-polyfill做了处理，新增"useBuiltIns": "usage"，这样只会加载代码中用到的部分，完美的按需加载，配置browserlist和`@babel/preset-env`的useBuiltsIns属性。

 ````javascript
{
  "presets": [
    [
    // babel的编译预设 
      "@babel/env",
      {
        //针对项目指定生成适应环境的代码。如果不进行配置，babel会转义所有ES6+进行环境适配，十分不推荐该用法。
        "targets": {},
        // 该选项用来配合@babel/polyfill进行使用，针对Babel > 7.4.0, 官方不再推荐使用该库，请选择core-js，根据安装core-js版本在corejs选项填写数字2或3。  usage-仅引入使用到的语法转换
        "useBuiltIns": "usage",
        "corejs": { "version": 3, "proposals": true }
      }
    ]
  ]
}
````
1. useBuiltIns
分为三种：
* false:不引入
* usage 就是按需导入,
* entry 则需要手动导入，很不人性化，所以我们就用 usage 即可。




### 2.2 @babel/plugin-transform-runtime
>npm install --save-dev @babel/plugin-transform-runtime
>npm install --save @babel/runtime


移除了polyfill的配置项添，加了corejs配置项。

`@babel/plugin-transform-runtime`的默认配置如下：

 ````javascript
 {
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        // 	配置corejs为3，需要预先安装@babel/runtime-corejs3
      	// 配置corejs为2，需要预先安装@babel/runtime-corejs2
      	// 配置corejs为false，需要预先安装@babel/runtime
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
      }
    ]
  ]
}
````
1. 对于配置项 corejs: false | 2 | 3。

false: 依赖 @babel/runtime，是默认选项，默认不启用对core-js的polyfill处理的，认为需要填充的API已被填充，所以不对API作polyfill（对于@babel/runtime的依赖是提取的helper的依赖）。
2: 依赖@babel/runtime-corejs2
3: 依赖@babel/runtime-corejs3

corejs2和corejs3区别。
corejs2只转换全局变量(Object)和静态方法(Object.assign)，并不转换原型上的方法(Array.prototype.includes)，corejs3会转换原型上的方法。

如果设置成false，npm run build之后，会发现Promise方法并没有被转换。

2. polyfill和useBuiltIns两个配置项
This option was removed in v7 by just making it the default.


3. 小结：
`@babel/plugin-transform-runtime`主要有三个作用：
- 当使用 generators/async的时候自动引入 @babel/runtime/regenerator。
- 为新特性的API添加实现。
- 提取每个模块内联的helper们问引用。


 

 



 

## 八、`@babel/env` 和`@babel/plugin-transform-runtime`混用问题
[康一康谁说的对](https://zhuanlan.zhihu.com/p/147083132)
作者告诉你useBuildInts 和`babel/plugin-transform-runtime`不能混用. 参看
https://github.com/babel/babel/issues/10271#issuecomment-528379505

issue10008 说得很清楚了呀，而且`@babel/plugin-transform-runtime`主要是给开发类库时用的，不是用来解决preset的问题的。 transform runtime环境无关，不会因为你的页面的目标浏览器动态调整polyfill的内容；而useBuildInts会。两者是不同目的的东西

还有这 https://github.com/babel/babel/issues/10133#issuecomment-506249922

`@babel/plugin-transform-runtime`是环境无关的

如果`@babel/plugin-transform-runtime`配置了corejs:3，preset-env的useBuiltIns就不会生效，babel/plugin-transform-runtime会打包所有浏览器的polyfill，再加上先执行plugin后执行preset插件


 
