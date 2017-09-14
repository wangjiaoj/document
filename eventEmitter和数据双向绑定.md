# evenetEmitter和数据双向绑定

## eventEmitter 


## 数据双向绑定
 subpub模式来

## 几种实现双向数据绑定的方法
### 1.0 发布者订阅者模式-backbone.js

### 2.0 脏值检查-angular.js
     angular.js通过脏值检查的方式来对比数据是否有变更，来决定是否更新视图，angular在指定的时间触发时进入脏值检测
### 3.0 数据劫持-veu.js
     vue.js是采用数据劫持结合发布者订阅者模式
     通过Object.defineProperty()来劫持各个属性的setter,getter，在数据变动时发布给订阅者，触发响应的监听回调。


[参考文章：剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500 "剖析Vue原理&实现双向绑定MVVM") 

[vue 源码解析：深入响应式原理](https://github.com/DDFE/DDFE-blog/issues/7 "vue 源码解析：深入响应式原理")