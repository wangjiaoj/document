# vue笔记
## SPA和MPA
关于SPA和MPA的选用，首选的一个条件其实应该是SEO的需求，如果有明确的SEO需求，就有必要考虑MPA，负责在SEO上可能会要多花点时间(SSR)。
另外可以考虑SPA+MPA混用，比如管理员和用户考虑是否有必要拆解成两个页面之类的，再或者SPA应用下的分享页面之类的。
## vue\vuex\vue-router\iview\


## vue
### 计算属性computed
不能使用箭头函数.this指向会存在问题

### 一、data初始化
1. vue中没有在data初始化的参数，直接在template中使用，会出现一些意外的问题。比如当作参数进行一些数据判断，会判断失效。

### 二、vue-router
1. 关于beforeEach,修改参数，后继续调用next可能造成死循环
* 比如在beforeEach中给请求添加query参数,添加完成后，继续调用next()并传参当前页面路由path,会死循环,这类处理应该只能用来处理某些条件下强制跳转到到某个默认页面。

### VUE生命周期中的$mount挂载过程
