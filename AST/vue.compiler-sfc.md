# @vue/compiler-sfc 
* https://juejin.cn/post/7115966428343189540

## 一 、 SFC
SFC是vue中重要的一环，也是vue3中对于静态节点进行缓存提升的重要位置
SFC -- single file Component 单文件组件，以 .vue 进行结尾，这个文件浏览器也不会识别，最终也是要被转换成js代码，@vue/compiler-sfc的作用就是把单文件组件编译成为js代码。


### 1.1 提供的功能

* parse
* compileTemplate
* compilerScript
* compileStyle

## 二、 parse
### 1.1 .parse(code).descriptor
> const { parse } = require("@vue/compiler-sfc")
> const descriptor = compilerSfc.parse(code).descriptor

descriptor中包含
filename,
source,
template,
script,
scriptSetup,
styles,
customBlocks,
cssVars,
slotted,
shouldForceReload。
其中template、script、style等三块代码，分别表示模版、脚本、样式三块

vue3的<srctipt setup>唯一的不同就是编译后的结果从原来的script上迁移到scriptSetup上

### 1.2 template的结构
```javascript
```
 在上面template转成ast节点中  我们看到有3个属性：

* type : 节点类型
* children：子节点
* loc：位置信息和当前源码

children是一个数组对象，包含着标签语法的信息描述，通常有以下属性：

* type : 节点类型
* children：子节点
* loc：位置信息
* tag：标签名
* isSelfClosing：是否自闭和标签
* props：属性集合
* isStatic：是否是静态属性
* content：内容


## 三、 compileTemplate
拿到之前parse后的结果后，需要对template进行进一步的转换，把template结果进一步编译成对应的js vnode函数

```javascript
let compileredTemplate = compileTemplate({
    id: '123',
    filename: 'foo.vue',
    source: parsed.descriptor.template.content
})
console.log('parsed', compileredTemplate);
```
返回结果中的code 就是render函数，这里也就符合预期，vue组件中如果使用js的方式写，可以写一个render函数去渲染组件

## 四、 compilerScript
根据parsed的结果来解析脚本部分，compileScript接收2个参数，第一个就是之前parse的结果， 然后再传入相应的option
```javascript
let compileredScript = compileScript(parsed.descriptor, {
    id: '123'
})
console.log('parsed', compileredScript);
```
返回结果中scriptAst

## 五、compileStyle
compileStyle 即解析SFC style模块的入口函数

由于sfc中style块是可以写多个的，所以parse最终的结果styles其实是个数组

由变量签名也可以看出
```javascript
let compileredStyle = compileStyle({
    source: parsed.descriptor.styles[0].content,
    scoped: true,
    id: 'data-v-123'
})
console.log('parsed', compileredStyle);

```

