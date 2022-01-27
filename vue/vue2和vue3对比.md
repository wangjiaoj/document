## 1.双向绑定实现方案的差异
        
1. vue2使用Object.defineProperty
2. vue3使用proxy(ES6)
这两项也决定了最终的兼容浏览器版本，vue2大于等于IE9,proxy支持edge,彻底抛弃IE

## 2. Composition API
1. vue2 也可以使用Composition API
Composition API主要是为了实现组件相似功能复用,其实vue2也有mixins和scoped,三者的优缺点对比。

mixins最大的缺点是，我们对它究竟在我们的组件中加入了什么东西一无所知。这使得它不仅难以推理，而且还可能导致与现有的属性和函数的名称碰撞。


mixins应该也是从react中参考来的，但是很快mixins被认为是有害的,早在16年，react就宣布将使用高阶组件替换掉了这一用法.
命名空间冲突和滚雪球一样的复杂度导致mixins被认为是有害的

[译文：Vue3 Composition API 是如何取代 Vue Mixins 的？](http://caibaojian.com/vue3-composition-api.html)



[Vue 3中令人激动的新功能：Composition API](https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA%3D%3D&chksm=83da6056b4ade940c29c5375cd8cefec948f98a99ddba09d04032b40d3cb06464da7b6b51d16&idx=1&mid=2650078515&scene=21&sn=1f58a9a55e3118209da838d94c67aa89#wechat_redirect)


VUEX4支持TypeScript问题，好像有替代品pinia代替，待确认
