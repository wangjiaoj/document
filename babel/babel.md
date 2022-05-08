# babel
## 一、babel
babel 从最初到现在一直的目的都很明确，就是把源码中的新语法和 api 转成目标浏览器支持的。它采用了微内核的架构，整个流程比较精简，所有的转换功能都是通过插件来完成的。

1. babel 的编译流程就是 parse、transform、generate 3步， parse 是把源码转成 AST，transform 是对 AST 的转换，generate 是把 AST 转成目标代码，并且生成 sourcemap。
2. 在 transform 阶段，会应用各种内置的插件来完成 AST 的转换。内置插件做的转换包括两部分，一是把不支持的语法转成目标环境支持的语法来实现相同功能，二是不支持的 api 自动引入对应的 polyfill。


3. babel自6.0起，就不再对代码进行transform，现在只负责的parse和generate过程，代码的transform过程全都交给一个个plugin去做。所以在没有配置任何plugin的情况下，经过babel输出的代码是没有改变的。


4. 几十个plugin的配置显然会非常繁琐。所以，为了解决这种问题，babel提供了预设插件机制preset，preset中可以预设置一组插件来便捷的使用这些插件所提供的功能。目前，babel官方推荐使用@babel/preset-env预设插件。


因此可以说Babel是一个新语法转旧语法的平台，它的转码是依靠插件实现的。
* babel的插件包括preset(预设)和plugin,
* babel 中插件的应用顺序是：先 plugin 再 preset，plugin 从左到右，preset 从右到左.
因此babel 的 plugin 比 preset 要先执行.


它只对语法(synax)进行转义，对于api需要使用其对应的插件进行转化。新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码
对于API的转换又分为两部分，一个是
全局API  例如Promise，Set，Map
还有静态方法Object.assign，
另一个是实例方法例如`Array.prototype.includes`。
对于实例方法core-js@2是转换不了的，只有core-js@3才会转换。

## 1.1 测试babel转码结果
 json增加配置如下：
>"scripts": {    "compiler": "babel src --out-dir lib --watch"}
可以进行src目录代码转码编译

### 1.2 babelrc文件：
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
 


## 二、从 babel6:es20xx 到  babel7的`preset-env`
babel6到7的过程发展历程

### 1.1、babel6

1. preset概念
es 的标准一年一个版本，也就意味着 babel 插件要实时的去跟进，一年实现一系列插件。
新的语法和 api 进入 es 标准也是有个过程的，这个过程分为这几个阶段：
* 阶段 0 - Strawman/稻草人: 只是一个想法，经过 TC39 成员提出即可,可能用 babel plugin 实现
* 阶段 1 - Proposal/提案: 值得继续的建议
* 阶段 2 - Draft/初稿: 完成初步规范(建立spec)
* 阶段 3 - Candidate/候选: 完成规范 并且在浏览器实现
* 阶段 4 - Finished/完成: 会加入到下一年度发布，es20xx spec

有这么多特性要 babel 去转换，每个特性用一个 babel 插件来做。插件太多，总不能让用户自己去配一个个插件吧，所以 babel 6 引入了 preset 的概念，就是 plugin 的集合。

example：es6 语法就用 `babel-preset-es2015`，es7 就再引入` babel-preset-es2016`
![Alt](img/babel6.awebp)

如果是想用还没加入标准的特性，则分别用  babel-preset-stage0、babel-preset-stage1 等来引入。这样通过选择不同的 preset，加上手动引入一些插件，就是所有 babel 会做的转换。

低一级的 stage 会包含所有高级 stage 的内容，例如 stage-1 会包含 stage-2, stage-3 的所有内容。

### 1.2. babel6的问题：
* es 的标准每年都在变，现在的 stage-0 可能很快就 stage-2 了，那 preset 怎么维护，要不要跟着变，用户怎么知道这个 stage-x 都支持什么特性？
* 只能转成 es5，那目标环境支持一些 es6 特性了，那这些转换和 polyfill 岂不是无用功？ 而且还增加了产物的体积。
* polyfill 手动引入，比较麻烦，有没有更好的方式

### 1.3 babel7:

1. babel 7 废弃了`preset-20xx `和 `preset-stage-x` 的 preset 包，而换成了`preset-env`，`preset-env` 默认会支持所有 es 标准的特性，如果没进入标准的，不再封装成 preset，需要手动指定 `plugin-proposal-xxx`。

 ![Alt](./img/bebel7-es.awebp)

2. compat-data给出了每个特性在不同浏览器或者 node 环境中的最低支持版本，babel 基于这个自己维护了一份数据库，[@babel/compat-data](https://github.com/babel/babel/blob/main/packages/babel-compat-data/data/plugins.json)

babel 会使用 [brwoserslist](./browserslist.md) 来把它们转成目标环境具体版本的数据。

有了不同特性支持的环境的最低版本的数据，有了具体的版本，那么过滤出来的就是目标环境不支持的特性，然后引入它们对应的插件即可。这就是 preset-env 做的事情。



 tips:其实7是由6的各种变化积累起来的，所以不要奇怪为什么6后期版本也可以使用`babel-prest-env`,当然中间变动也是比较大的



## 二、基础概念
可以从babel6到7的过程发展历程中理清一些基础概念

### 2.1.  babel具体语法转换类插件的一些概念
1. es201x, latest
这些是已经纳入到标准规范的语法。例如 es2015 包含 arrow-functions，es2017 包含 syntax-trailing-function-commas。但因为 env 的出现，使得 es2016 和 es2017 都已经废弃。所以我们经常可以看到 es2015 被单独列出来，但极少看到其他两个。
latest 是 env 的雏形，它是一个每年更新的 preset，目的是包含所有 es201x。但也是因为更加灵活的 env 的出现，已经废弃。

2. babel-preset-stage-X
从babel@7开始，所以针对标准提案阶段的功能所编写的预设（stage preset）都已被弃用，官方已经移除了@babel/preset-stage-x。

3. babel-plugin-transform-xxx
  实现某个语言特性的具体插件

4. babel-plugin-proposal-xxxx
  实现es标准以外的某个特性的具体实现插件

5. 代码管理方式迁移,babel6到7也发生了向monorepo形式的代码仓库迁移,迁移变化导致`babel-xx` 到 `@bebel/xx`的变化

### 2.2.  core-js  

corejs 就是 babel 7 所用的 polyfill，需要指定下版本，core-js@3 才支持实例方法（比如`Array.prototype.fill`）的 polyfill。

#### 2.2.1  core-js@2

core-js@2被`@babel/polyfill`、`@babel/preset-env`和`@babel/runtime-corejs2`引入来进行不兼容api的处理，其中有两个核心的模块：

* library：不污染全局的runtime模块，供@babel/runtime-corejs2引入；
* modules：污染全局的polyfill模块，供`@babel/polyfill`和`@babel/preset-env`引入。

#### 2.2.2 core-js@3
core-js@3放弃了对`@babel/polyfill`的支持，被`@babel/preset-env`和`@babel/runtime-corejs3`引入来进行新api的兼容处理。
由于`core-js@2`包的体积太大（约2M），并且有很多重复的文件被引用。所以，core-js@3对包进行拆分，其中两个核心的包分别是：

* core-js：污染全局的polyfill包，供`@babel/preset-env`使用，执行npm i core-js时安装；
* core-js-pure：不污染全局的runtime包，供`@babel/runtime-corejs3`使用，在安装`@babel/runtime-corejs3`的时候自动安装，等价于`core-js@2`中的`core-js/library`。

 





### 2.2. 概念对齐

其实在转化方面是分为两块需求的：
1. 按照代码中使用到的语法进行转换,没有的不转化 
2. 按照项目设置的目标浏览器版本去polyfill

那这里的需要对应理清楚按需引入的概念
1. 按需引入的定义注意一下：一般是指ast等解析,分析使用到了哪些ES,并针对这些使用到的语法自动引入相应的polyfill

2. 根据target进行支持的浏览器过滤是两回事
这两个其实是完全不一致的问题，需要理清楚啊

至于根据当前访问浏览器兼容性动态polyfill,更是另外一回事，目前主要有polyfill.io是针对这个问题

### 2.3  `@babel/preset-env`
`@babel/preset-env​`主要的作用是用来转换那些已经被正式纳入TC39中的语法。所以它无法对那些还在提案中的语法进行处理，对于处在stage中的语法，需要安装对应的plugin进行处理。

也就是说preset-env是基础语法转换，需要配合`corejs`或`@babel/plugin-transform-runtime`使用

浏览器target指定，推荐配合browserslist文件或者package.json中的`"browserslist": "> 0.25%, not dead"`



`@babel/preset-env`中的useBuiltIns 就是使用 polyfill (corejs)的方式:
* false:不引入
* usage 每个文件引入用到的,就是按需导入,
* entry 入口处全部引入。

[官方preset-env配置项](https://www.babeljs.cn/docs/babel-preset-env#usebuiltins)

### 2.4. `@babel/polyfill`
@babel/polyfill是一个运行时包，主要是依赖core-js@2对不兼容的api在全局或者构造函数静态属性、实例属性上进行添加。
 
1. 关于babel7.4.0文档中描述的不推荐使用polyfill的问题。
其实polyfill`core-js`和`regenerator-runtime`，即`import @babel/polyfill`等同于：
>import 'core-js/stable';
>import 'regenerator-runtime/runtime';
所以在针对Babel >= 7.4.0 的情况，我们需要安装 core-js 替代 babel-polyfill,而 regenerator-runtime 会在我们安装 `@babel/runtime` 时自动安装，所以不必单独安装了。

### 2.5. runtime
runtime包有三个：

@babel/runtime
@babel/runtime-corejs2
@babel/runtime-corejs3


### 2.6. `@babel/plugin-transform-runtime`


### 2.7. `@babel/preset-env`与`@babel/plugin-transform-runtime`,`@babel/polyfill`
 1. `@babel/preset-env` 默认只会转换语法，也就是我们看到的箭头函数、const一类。如果进一步需要转换内置对象、实例方法，那就得用polyfill, 这就需要做一点配置:参数 `useBuiltIns`是控制 `@babel/preset-env` 使用何种方式帮我们导入 polyfill,可以配置进行按需引入,和按照target浏览器过滤。
  无论将`@babel/polyfill`或者`@babel/preset-env + core-js@3`作为polyfill方案都会存在全局污染问题
2. 后两项比较
* `@babel/polyfill`和`@babel/plugin-transform-runtime`都可以实现api转换(都可以进行按需引入)。
* `@babel/polyfill`会污染全局，`@babel/plugin-transform-runtime`不会。如果不是编写插件或库，可以使用`@babel/polyfill`，否则请使用`@babel/plugin-transform-runtime`。
 
3. `@babel/polyfill`在 Babel 7.4.0中,被deprecated掉了
  应用开发可以使用`@babel/present-env`配置自动按需引入来取代。
 废弃原因：`@babel/polyfill`本身就是stable版本的`core-js`和`regenerator-runtime`的合集。当`core-js`升级到3.0的版本后，将放弃使用`@babel/polyfill`，因为它只包含`core-js 2.0`的版本。
 >As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://blog.csdn.net/m0_37846579/article/details/103379084)


[babel7.4之后babel配置](https://blog.csdn.net/qq_21567385/article/details/107104592?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare)



 

 


 


8. babel参考文档
* babel官方文档：[@babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill)
* 翻译文档参考[翻译文档参考](https://blog.windstone.cc/es6/babel/)
* [回顾 babel 6和7，来预测下 babel 8](https://juejin.cn/post/6956224866312060942)
* [聊一聊 Babel?](https://juejin.cn/post/6844903849442934798)
* [babel polyfill何去何从](https://juejin.cn/post/6931186451224887309)
* [babel的详细解读](https://juejin.cn/post/6844904199554072583)
[你所需要知道的最新的babel兼容性实现方案](https://juejin.cn/post/6976501655302832159)

9. 概念区别
`@babel/polyfills`和``@babel/polyfill`是不一样



## 三、babel7

参考文章：
[@babel/polyfill和@babel/plugin-transform-runtime](https://blog.csdn.net/m0_37613019/article/details/108226550)
[结合Babel 7.4.0 谈一下Babel-runtime 和 Babel-polyfill](https://juejin.im/post/6844903869353295879)

 
1. babel7使用方案

两种使用方案
1. 方案一：`@babel/preset-env + corejs@3`实现简单语法转换 + 复杂语法注入api替换 + 在全局和者构造函数静态属性、实例属性上添加api，支持全量加载和按需加载，我们简称polyfill方案；
2. 方案二：`@babel/preset-env + @babel/runtime-corejs3 + @babel/plugin-transform-runtime`,实现简单语法转换 + 引入替换复杂语法和api，只支持按需加载，我们简称runtime方案。

两种方案一个依赖核心包core-js，一个依赖核心包core-js-pure，两种方案各有优缺点：

1. polyfill方案很明显的缺点就是会造成全局污染，而且会注入冗余的工具代码；优点是可以根据浏览器对新特性的支持度来选择性的进行兼容性处理；
2. runtime方案虽然解决了polyfill方案的那些缺点，但是不能根据浏览器对新特性的支持度来选择性的进行兼容性处理，也就是说只要在代码中识别到的api，并且该api也存在core-js-pure包中，就会自动替换，这样一来就会造成一些不必要的转换，从而增加代码体积。

所以，polyfill方案比较适合单独运行的业务项目，如果你是想开发一些供别人使用的第三方工具库，则建议你使用runtime方案来处理兼容性方案，以免影响使用者的运行环境。


[你所需要知道的最新的babel兼容性实现方案](https://juejin.cn/post/6976501655302832159)

`@babel/plugin-transform-runtime`无法进行目标浏览器过滤

 如果既在`@babel/preset-env` 设置了usebuildins，又使用transform-runtime，会发现也不会重复引入，因为babel 中插件的应用顺序是：先 plugin 再 preset, 所以preset-env 先得到了 @babel/runtime 使用帮助函数包装后的代码，然后preset-env中的 useage 又是检测代码使用哪些新特性来判断的， 所以它拿到手的只是一堆 帮助函数,自然没有效果了。
 
### 2.1 @babel/preset-env + corejs@3
 
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


 

 

## 四、`@babel/env` 和`@babel/plugin-transform-runtime`混用问题
[康一康谁说的对](https://zhuanlan.zhihu.com/p/147083132)
作者告诉你useBuildInts 和`babel/plugin-transform-runtime`不能混用. 参看
https://github.com/babel/babel/issues/10271#issuecomment-528379505

issue10008 说得很清楚了呀，而且`@babel/plugin-transform-runtime`主要是给开发类库时用的，不是用来解决preset的问题的。 transform runtime环境无关，不会因为你的页面的目标浏览器动态调整polyfill的内容；而useBuildInts会。两者是不同目的的东西

还有这 https://github.com/babel/babel/issues/10133#issuecomment-506249922

`@babel/plugin-transform-runtime`是环境无关的

如果`@babel/plugin-transform-runtime`配置了corejs:3，`preset-env`的useBuiltIns就不会生效，`babel/plugin-transform-runtime`会无视我们设置的目标浏览器,直接polyfill，再加上先执行plugin后执行preset插件

所以其实是可以的，但是没必要在
 
 `@babel/preset-env`本身并不涉及是否污染全局变量的问题,但目前它所依赖的`core-js@3`依然并不是pre-core-js,所以会存在污染全局的问题。后续babel会给出可选的依赖的polyfill源,彻底解决`@babel/runtime`无法设置target,而现有preset-env的污染全局问题 [](https://github.com/babel/babel-polyfills/blob/main/docs/migration.md)