# vue笔记

## 一、SPA和MPA
关于SPA和MPA的选用，首选的一个条件其实应该是SEO的需求，如果有明确的SEO需求，就有必要考虑MPA，负责在SEO上可能会要多花点时间(SSR)。
另外可以考虑SPA+MPA混用，比如管理员和用户考虑是否有必要拆解成两个页面之类的，再或者SPA应用下的分享页面之类的。


## 二、vue中用法提示

### 2.1.计算属性computed
不能使用箭头函数.this指向会存在问题

### 2.2.data初始化
1. vue中没有在data初始化的参数，直接在template中使用，会出现一些意外的问题。比如当作参数进行一些数据判断，会判断失效。

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
#### 3.3.1 VUE生命周期中的$mount挂载过程
 
#### 3.3.2 VUE父子组件的生命周期


### 四、一些需要注意的问题
1. vue watch变量之后，修改参数，但根据这个参数重新computer的参数未变化

2. watch tableList 修改表格渲染后高度   computer的是否展示滚动条参数未变化

