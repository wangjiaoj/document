## 一、react和vue3的相似

react16.8出现的hook写法和vue3的composition-api写法，实际上能够达到非常相似的地步
react-hook出现使得react世界上只剩下funtionnal component和hook的概念，二者和TS融合的非常自然

vue3的composition-api，在控制使用jsx而非tempalte的情况下，二者可以实现非常高相似度的代码

[Vue 3 和 React 16.8 到底能多像](https://juejin.cn/post/6998038537950429220)


## 二、hook
[浅谈：为啥vue和react都选择了Hooks](https://juejin.cn/post/7066951709678895141)

1. hook库
ahook和vueuse


## 三、在设计上相似的用法或想法
1. 
vue-watch 上类似第一个参数注入依赖
react-Memo 上第二个参数注入依赖
 

2. 
vue-provide/inject
react-useContext的爷孙传值


3. 
* react:useState()和ueseReduce()
* vue:ref()和reactive()
差异:usestate() 需要使用返回的专用修改函数修改而且需要自己合并参数
