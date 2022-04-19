## 一、react和vue3的相似

react16.8出现的hook写法和vue3的composition-api写法，实际上能够达到非常相似的地步
react-hook出现使得react世界上只剩下funtionnal component和hook的概念，二者和TS融合的非常自然

vue3的composition-api，在控制使用jsx而非tempalte的情况下，二者可以实现非常高相似度的代码

[Vue 3 和 React 16.8 到底能多像](https://juejin.cn/post/6998038537950429220)
[Vue Composition API 和 React Hooks 对比](https://juejin.cn/post/6847902223918170126)
[浅谈：为啥vue和react都选择了Hooks](https://juejin.cn/post/7066951709678895141)


## 二、设计上的相似点

hook


1. hook库
ahook和vueuse


2. 

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


## 四、一些差异考虑

### 4.1 fiber
1. react-hook和vue的数据驱动视图更新对比

  react中，调用setState方法后，会自顶向下重新渲染组件，自顶向下的含义是，该组件以及它的子组件全部需要渲染；而vue使用Object.defineProperty（vue@3迁移到了Proxy）对数据的设置（setter）和获取（getter）做了劫持，也就是说，vue能准确知道视图模版中哪一块用到了这个数据，并且在这个数据修改时，告诉这个视图，你需要重新渲染了。

  所以当一个数据改变，react的组件渲染是很消耗性能的——父组件的状态更新了，所有的子组件得跟着一起渲染，它不能像vue一样，精确到当前组件的粒度。
 
  整个在react.Memo的使用中应该有所感受,分明修改的数据与子组件使用的数据无关,但是依然会在父组件部分数据更新的时候驱动儿组件更新,这个在class写法里面是也有。
  
  diff的dom树,带来的大量js比较，而js和渲染线程互斥，容易造成用户交互得不到响应。因此引入fiber来进行dom比较过程分片,和工作进度保存,可以进行dom比较中断,让出主线程来进行用户交互响应,然后继续进行


也就是说
* react因为先天的不足——无法精确更新，所以需要react fiber把组件渲染工作切片；而vue基于数据劫持，更新粒度很小，没有这个压力；
* react fiber这种数据结构使得节点可以回溯到其父节点，只要保留下中断的节点索引，就可以恢复之前的工作进度；
 

问题：那vue的dom树比较是怎么样子的,next-tick的渲染是时机到底是什么时候？


### 4.2 总结

* react不光是用fiber架构来“弥补”， reducer, component等处处要求purity，如果你不能真正理解purity, 稍有不慎就会有性能问题 ｜ 而vue不需要purity（ 相当于默认启用了use-immer）

* ref不像vue那般直接支持自定义组件，所以又引出forwardRef, 然后再来个useImperativeHandle加重复杂度。

* useEffect不像onMount Hook那般简单好用，useEffect/useMemo/useCallback的第二个参数够你喝一壶。

* useCallback, useMemo等这些vue中没有的东西其实都是一堆用来弥补re-render性能问题的，于是乎复杂性就上来了。
* React的性能调优有很多trick和pitfall， 相关的文章一大堆， vue的使用者无需考虑性能调优。
* react有十种状态管理框架（context API，redux基本属于必备), vue3只有一种（pinia），并且比react的任意一种状态管理框架都简单。
