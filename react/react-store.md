

# React状态管理
[2021年的React状态管理](https://juejin.cn/post/7026232873233416223)
React的状态管理主要分三类：Local state、Context、第三方库。

### 6.1. Local State
### 6.2. Context
  问题：在react里，context是个反模式的东西，不同于redux等的细粒度响应式更新，context的值一旦变化，所有依赖该context的组件全部都会force update，因为context API并不能细粒度地分析某个组件依赖了context里的哪个属性，并且它可以穿透React.memo和shouldComponentUpdate的对比，把所有涉事组件强制刷新。

  Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

### 6.3. 状态管理库
  如今最火的React状态管理库莫过于Redux、Mobx、Recoil
  1. Redux
  Redux本身很纯净，心智模型也不复杂，但实际使用还得搭配redux-thunk、redux-saga、redux-observable这些中间件（middleware）和reselect、immer这样的辅助工具才能达到真正可用的状态，加大了学习成本的同时，中间件也会引入各种副作用和中间态，真正的状态流并没有理想中那么美好
  2. Mobx
  和redux一样，mobx本身是一个UI无关的纯粹的状态管理库，通过mobx-react或更轻量的mobx-react-lite和react建立连接。
  3. Recoil