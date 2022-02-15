### 一、vue2和3部分差异
### 1.1双向绑定上的实现差异
在2.x版本中 Vue 使用了 Object.defineProperty() 方法改写了一个对象，在它的 getter 和 setter 里面埋入了响应式系统相关的逻辑，使得一个对象被修改时能够触发对应的逻辑。在即将到来的 3.0 版本中，Vue 会使用 Proxy 来完成这里的功能
### 1.2关于mixins和composition-api
mixins其实算是vue和react的相似写法，但是因为mixins带来的命名冲突和隐含的依赖关系，等原因被认为是有害的，在16年就被宣布将从react移除.
[译文：Vue3 Composition API 是如何取代 Vue Mixins 的？](http://caibaojian.com/vue3-composition-api.html)
VUE的API,常规的option配置写法随着业务增加,代码量也会随之膨胀,导致可维护性和服用性不高，而composition-api就是为了解决这个问题而生的

###  二、component—api

* option-api


composition-api提供了一下几个函数

reactive
watchEffect
computed
ref
toRefs
生命周期的hooks

