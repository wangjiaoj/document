# Babel基础
 [浅谈前端AST的概念与实际应用]( https://www.jianshu.com/p/b3f1ff0b3cdf)
 [babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
## 1.1 Babel转译过程
Babel 是一个 JavaScript 的转译器，其执行过程就是一个编译转换的过程。作为一个js转译器，babel暴露了很多 api，利用这些 api 可以完成源代码到 AST 的 parse，AST 的遍历与处理以及目标代码的生成。babel将这些功能的实现放到了不同的包里面，下面逐一介绍。
1. @babel/parser 解析源码得到AST。
2. @babel/traverse 遍历 AST。
3. @babel/types 用于构建AST节点和校验AST节点类型；
4. @babel/generate 打印 AST，生成目标代码和 sorucemap。

## 1.2 babel的处理步骤
主要有三个阶段：解析（parse）， 转换 （transform），生成（generate）。

1. parse
将源码转成 AST，用到@babel/parser模块。

2. transform
对AST 进行遍历，在此过程中对节点进行添加、更新及移除等操作。因此这是bebel处理代码的核心步骤，是我们的讨论重点，主要使用@babel/traverse和@babel/types模块。

3. generate
打印 AST 成目标代码并生成 sourcemap，用到@babel/generate模块。

### 1.3 访问者模式
转换这一步，上面我们提到，转换的第一步是遍历AST。说到这里就不得不提到一个设计模式——访问者模式。

在访问者模式（Visitor Pattern）中，我们使用了一个访问者类，它改变了目标元素的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。而在这里，访问者即是一个用于 AST 遍历的模式， 简单的说它就是一个对象，定义了用于在一个树状结构中获取具体节点的方法。当访问者把它用于遍历中时，每当在树中遇见一个对应类型时，都会调用该类型对应的方法。
因此我们只需根据需求，针对我们需要修改的节点类型去定义相应的遍历方法并指定相应的回调函数即可。

示例var全部替换成let:
```javascript
const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const transToLet = code => {
  const ast = parser.parse(code);
  // 访问者对象
  const visitor = {
    // 遍历声明表达式
    VariableDeclaration(path) {
      if (path.node.type === 'VariableDeclaration') {
        // 替换
        if (path.node.kind === 'var') {
          path.node.kind = 'let';
        }
      }
    },
  };
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};
const code = `const a = 1
var b = 2
let c = 3`;
      
```