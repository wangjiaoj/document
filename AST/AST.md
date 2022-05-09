# AST

 抽象语法(Abstract Syntax Tree) 简称AST,是以树状形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。JavaScript引擎工作工作的第一步就是将代码解析为AST，Babel、eslint、prettier等工具都基于AST。
  
 一般来说我们常规只是ast语法进行转换,这方面应用还是比较简单的

参考文章：
 [超实用的AST的基本操作](https://juejin.cn/post/6984972209240408078)
 [ast-for-javascript-developers](https://juejin.cn/post/6844903725228621832)
 [代码自动化重构利器——jscodeshift ](https://juejin.cn/post/6934911685220106253)

### 1.1. ast的现实应用：
1. babel 插件是做代码转换的，基于 AST 做分析和增删改。
2. eslint 插件是做代码的静态分析和格式检查的，也是基于 AST，只不过因为 AST 中保留了 token 信息，能够做格式的检查，比如行列号、空格这种。然后生成代码也不是基于 AST 打印，而是直接做的字符串替换。和 babel 插件的不同只在于能够检查格式以及生成代码的方式不同，其余的地方是类似的、同质的。
3.`typescript compiler api`是做 ts 到 ts 的转换的，也是基于 AST，相对于 babel 插件来说，能够生成 ts 代码，这点 babel 插件做不到，而且还能做类型检查。其余的方面也是同质的。

 
## 一、工具
 ### 1.1. astexplorer
  [astexplorer](https://astexplorer.net/)这是一个AST的在线调试工具，有了它，我们可以很直观的看到AST生成前后以及代码公户，它分为5个部分，我们接下来都依赖这个工具进行代码操作

 ### 1.2. jscodeshift
 `jscodeshift`是一个AST的转换器，我们通过它来将原始代码转成ast语法树，并借助其开放的api操作ast，最终转换成我们想要的代码
 `jscodeshift`的api基于`recast`封装。`recast`是对`babel/travers`&`babel/types`的封装，他提供简易的ast操作，而`travers`是babel中用于操作ast的工具，`types`我们可以先把它理解成为一个字典，用于描述树的类型。
  [jscodeshift](https://github.com/facebook/jscodeshift) 
  也可以使用 astexplorer在线开发语法转换逻辑

 ### 1.3. babel-types
  ast语法字典，方便我们快速查阅结构树的类型，它是我们想要通过ast生成某行代码的重要工具之一


## 二、AST到底是如何生成的？



AST的生成是个复杂度极高过程，今天我们只关心一个关键概念——编译，以及两个关键步骤——词法分析，语法分析。



计算机无法直接识别高级语言，它需要被编译成低级语言的指令才能被执行，这个过程就是编译。


1. 词法分析
   因此词法可以理解成我们代码中一系列独立的单词，var，for ，if，while等。词法分析的过程就是读取代码，识别每一个单词及其种类，将它们按照预定的规则合并成一个个的标识，也叫 token，同时，它会移除空白符，注释，等，最终产出一个token数组。即词法分析阶段把会字符串形式的代码转换为 令牌（tokens） 流
2. 语法分析
    也解析器。它会将词法分析出来的数组转化成树形的表达形式。同时，验证语法，语法如果有错的话，抛出语法错误

 