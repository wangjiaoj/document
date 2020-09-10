
## 关于样式引入问题

 
### 一、scoped实现私有化样式 
1. scoped
 在vue组件中，为了使样式私有化（模块化），不对全局造成污染，可以在style标签上添加scoped属性以表示它的只属于当下的模块，这是一个非常好的举措，但是为什么要慎用呢？因为在我们需要修改公共组件（三方库或者项目定制的组件）的样式的时候，scoped往往会造成更多的困难，需要增加额外的复杂度。

2. 总结一下scoped三条渲染规则

* 给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
* 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式
* 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性


3. vue的style引入css，src和@import的区别

```javascript
    <style lang="less"  src="./stockItem.less"></style>
    <style lang="less"  >
        @import './index.less"
    </style>
 ```
两者都没有加上scoped 作用域为全局
当都加上scoped 的时候,@import作用域任然是全局，src引入的作用域是局部

```javascript
    <style lang="less" scoped src="./stockItem.less"></style>
    <style lang="less" scoped >
        @import './index.less"
    </style>
 ```



