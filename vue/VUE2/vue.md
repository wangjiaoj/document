# vue笔记

## 一、SPA和MPA
单页面应用和多页面应用
关于SPA和MPA的选用，首选的一个条件其实应该是SEO的需求，如果有明确的SEO需求，就有必要考虑MPA，负责在SEO上可能会要多花点时间(SSR)。
另外可以考虑SPA+MPA混用，比如管理员和用户考虑是否有必要拆解成两个页面之类的，再或者SPA应用下的分享页面之类的。


## 二、vue用法

### 2.1 问题
1. 计算属性computed
不能使用箭头函数.this指向会存在问题
2. data初始化
  vue直接在template中使用的参数需要在data中初始化，否则会出现一些意外的问题。比如当作参数进行一些数据判断，会判断失效。
3. `v-bind`和`v-model`
`v-bind`缩写是`:`, 主要用于相应更新HTML元素的属性,用于动态地绑定一个或多个attribute，或一个组件 prop 到表达式。
修饰符：
`.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。
`.camel`,
`.sync` 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
V3中`.sync`取消

`v-model`指令用来在表单元素上创建双向数据绑定,它会根据控件类型自动选取正确的方法来更新元素。
4. 组件:解析DOm模板时的注意事项
注意像是<ul><select>内部使用子组件时候可能会因为本身只能嵌套固定dom元素，导致引用的子组件被当作无效内容被提升到外面,可以通过is attribute 变通：

````html
<table>
  <tr is="blog-post-row"></tr>
</table>
````

 

### 2.2 事件处理
监听事件:我们可以使用 `v-on` 指令 (通常缩写为 @ 符号) 来监听 DOM 事件，并在触发事件时执行一些 JavaScript。用法为 v-on:click="methodName" 或使用快捷方式 @click="methodName"
1. 内联语句处理器中访问原始的 DOM 事件:可以用特殊变量 $event
2. 事件修饰符:
v-on 提供了事件修饰符。修饰符是由点开头的指令后缀来表示的。
* `.stop` 阻止单击事件继续传播
* `.prevent` 提交事件不再重载页面
* `.capture` 
* `.self` 只当在 event.target 是当前元素自身时触发处理函数,即事件不是从内部元素触发的
* `.once` 点击事件将只会触发一次
* `.passive` 对应 addEventListener 中的 passive 选项提供了 .passive 修饰符,滚动事件的默认行为 (即滚动行为) 将会立即触发。尤其能够提升移动端的性能。

修饰符可以串联使用
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。

### 2.3. 表单输入绑定
`v-model`用于在表单控件或者组件上创建双向绑定。
1. 修饰符：
* .lazy  在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：
* .number 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
* .trim 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

### 2.4 自定义事件
1. 组件抛出事件`$emit`,这些事件可以被定义和加上验证事件，vue建议定义所有发出的事件`emits`，以便更好地记录组件应该如何工作。
2. 自定义事件的`v-model`绑定
 * 组件上的`v-model` 使用 modelValue 作为 prop 和 update:modelValue 作为事件
 * 除了三个修饰符，也可以自定义修饰符,在子组件中可以检查 `modelModifiers`对象键并编写一个处理器来更改发出的值。 
 示例：
 父组件: `<my-component v-model.capitalize="myText"></my-component>`
 子组件：`this.modelModifiers.capitalize`
 
### 2.5 定义过滤器
1. 注册或获取全局过滤器:`Vue.filter( id, [definition] ) `
注册本地局部过滤器:组件中也接受一个 filters 的选项
当全局过滤器和局部过滤器重名时，会采用局部过滤器。
2. 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 
过滤器可以被定义为接收参数的过滤器函数
v3废弃

### 2.6 自定义指令
注册或获取全局指令: `Vue.directive( id, [definition] ) `
注册局部过滤器:组件中也接受一个 directives 的选项

1. 自定义指令提供的钩子函数
`bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

`inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

`update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
`componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

`unbind`：只调用一次，指令与元素解绑时调用。

钩子函数的参数 (即 el、binding、vnode 和 oldVnode)。
除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行

2. 动态指令参数
详见vue文档

### 2.7 动态组件和异步组件
1. 动态组件
 通过Vue 的 `<component> `元素加一个特殊的 is attribute 来实现动态组件
 参数可以是已注册组件的名字，或一个组件的选项对象
 可以通过`<keep-alive>`组件想保持这些组件的状态，以避免反复重新渲染导致的性能问题
 用一个 `<keep-alive>` 元素将其动态组件包裹起来， 失活的组件将会被缓存。
2. 异步组件
，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。
也可以结合`import`动态引入
```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

### 2.8 内置组件
1. `<component></component>`
   动态组件渲染
2. `<transition>`
* 作用：<transition> 元素作为单个元素/组件的过渡效果。
<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。

3. `<transition-group>`
* 作用：<transition-group> 元素作为多个元素/组件的过渡效果。
 <transition-group> 渲染一个真实的 DOM 元素。默认渲染 <span>，可以通过 tag attribute 配置哪个元素应该被渲染。

4. `<keep-alive>`
* 作用：<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
* Props：
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。
5. `<slot>`
<slot> 元素作为组件模板之中的内容分发插槽。<slot> 元素自身将被替换。

## 三、vue高阶用法
[vue高阶用法](https://cn.vuejs.org/v2/guide/render-function.html#%E5%9F%BA%E7%A1%80)


### 3.1 渲染函数 & JSX
渲染函数render
````javascript
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
````
createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

但是编写起来太过复杂，所以babel提供了插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。
this.$createElement

在一些特殊组件中允许的jsx写法
* [使用vue的element-ui中出现return()写法的问题](https://segmentfault.com/q/1010000009550441)
* [babel-plugin-transform-vue-jsx解决问题](https://segmentfault.com/a/1190000008559147)



示例：vue-cli默认配置了支持jsx的babel,vue-cli项目下antdv的table组件中的cusomRender
````javascript
cusomRender:(text,row,index)=>{
    if(typeof text =="object"){
        return (<div on-click={()=>this.handle(text)}>{ text.value}</div>)
    }
}
````
### 3.2 函数式组件
可以对照参考react的函数组件理解----

创建的组件是比较简单，没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。实际上，它只是一个接受一些 prop 的函数。在这样的场景下，我们可以将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。一个函数式组件就像这样：
```javascript
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```
注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。
当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的

在 2.5.0 及以上版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：

```html
<template functional>
</template>
```
### 3.3 VUE生命周期
实例方法 / 生命周期:
1. vm.$mount( [elementOrSelector] )
2. vm.$forceUpdate()
3. vm.$nextTick( [callback] )
4. vm.$destroy()
#### 3.3.1 VUE生命周期中的$mount挂载过程
 
#### 3.3.2 VUE父子组件的生命周期



### 3.4 SFC
单文件组件
### 四、一些需要注意的问题
1. vue watch变量之后，修改参数，但根据这个参数重新computer的参数未变化

2. watch tableList 修改表格渲染后高度   computer的是否展示滚动条参数未变化

