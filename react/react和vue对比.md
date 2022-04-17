# react 与 Vue 异同（react-vue差异对比）
语法 生命周期更方面都存在差异，一般来讲vue更容易上手一些

设计理念：vue:MVVM(M+V+VM)

语法： 生命周期更方面都存在差异，一般来讲vue更容易上手一些
https://www.cnblogs.com/sanchang/p/10513571.html

共同点：
* 组件化
* 函数式编程
* 单向数据流,数据驱动视图
* virtual Dom+Diff算法 操作dom
* 社区成熟，都支持ssr



## 一、React的单向数据流与Vue的双向绑定
1. 严格来说是两个概念，这里说的数据流应该是父子组件间的数据流向,react和vue在这个层面上来说应该都是单向数据流。
vue是借助v-model实现了双向数据绑定。


2. 总结：React遵循从上到下的数据流向，即单向数据流。
*  单向数据流并非‘单向绑定’，甚至单向数据流与绑定没有‘任何关系’。对于React来说，单向数据流（从上到下）与单一数据源这两个原则，限定了React中要想在一个组件中更新另一个组件的状态（类似于Vue的平行组件传参，或者是子组件向父组件传递参数），需要进行状态提升。即将状态提升到他们最近的祖先组件中。子组件中Change了状态，触发父组件状态的变更，父组件状态的变更，影响到了另一个组件的显示（因为传递给另一个组件的状态变化了，这一点与Vue子组件的$emit()方法很相似）。
* Vue也是单向数据流，只不过能实现双向绑定。
* 单向数据流中的‘单向’-- 数据从父组件到子组件这个流向叫单向。
* 绑定的单双向：View层与Module层之间的映射关系。

3. 其实react中的单向数据流，完整概念应该是： 数据的流向只能通过props由外层到内层 一层一层往里传递。


    
## 二、 关于挂载到节点上

1. vue:
>let v= new vue()
> v.mount()//调用方法挂载渲染到页面Dom节点上
2. React
>ReactDom.render(<Parent>,dom);
 

## 三、关于于兄弟组件通信
###　3.1、 常规的父子组件

vue:
1. props,emit,$parent,$children

2. 成对出现：provide和inject是成对出现的

作用：用于父组件向子孙组件传递数据

使用方法：provide在父组件中返回要传给下级的数据，inject在需要使用这个数据的子辈组件或者孙辈等下级组件中注入数据。

使用场景：由于vue有$parent属性可以让子组件访问父组件。但孙组件想要访问祖先组件就比较困难。通过provide/inject可以轻松实现跨级访问父组件的数据

在这个父组件生效的生命周期内，所有的子组件都可以调用inject来注入父组件中的值。

react:
1. Props->子组件;
2. 子组件再反调父组件props传递的方法

### 3.2、 兄弟组件
vue: 
1. 提升到父级
2. 事件总线eventBus,new Vue()作为一个发布订阅工具
总线使用两个方法 $on 和 $emit 。一个用于创建发出的事件，它就是$emit;另一个用于订阅 $on:
EventBus.$once(channel: string, callback(payload1,…)) 。
移除事件监听者
用 EventBus.$off(‘decreased’) 来移除应用内所有对此事件的监听。或者直接调用EventBus.$off() 来移除所有事件频道， 注意不需要添加任何参数 。

React:
1. 提升到父级
2. 特殊的context
    考虑到项目复杂度，组件层级过高，这个我们真不能接受只能通过props一层一层往里传递这样的限制啊。
    react加上了context这个玩意，方便我们进行组件间的隔代通信。

例:UserListContainer 通过增加getChildContext和childContextTypes将
onAddUser在组件树中自动向下传递，当任意层级的子组件需要使用
时，只需要在该组件的contextTypes 中声明使用的context属性即可。
````javascript
 class UserListContainer extends React.Component{
    /** 省略其余代码 **/
    // 创建context对象，包含onAddUser方法
    getChildContext() {
         return {onAddUser: this.handleAddUser};
    }
    .........
}

// 声明context的属性的类型信息
UserListContainer.childContextTypes = {
    onAddUser: PropTypes.func
};

````


* UserAdd需要使用context中的onAddUser，在UserAdd内部就可以通过
this.context.onAddUser的方式访问context中的onAddUser方法。注意，这
里的示例传递的是组件的方法，组件中的任意数据也可以通过context自
动向下传递。另外，当context中包含数据时，如果要修改context中的数
据，一定不能直接修改，而是要通过setState修改，组件state的变化会创
建一个新的context，然后重新传递给子组件。

### 3. 三方的一些状态管理库
VUE:
REACT:当应用更加复杂时，还可以引入专门的状态管理库实现组件通信和组件状态的管理，例如Redux和


## 四、虚拟dom
### 4.1 react 虚拟DOM
虚拟DOM使用普通的JavaScript对象来描述DOM元素，对象的结构和2.1节中React.createElement方法使用的参数的结构类似，实际上，React元素本身就是一个虚拟DOM节点。
React会通过比较两次虚拟DOM结构的变化找出差异部分，更新到真实DOM上，从而减少最终要在真实DOM上执行的操作，提高程序执行效率。（Reconciliation）
1. Diff算法
1．当根节点是不同类型时

2．当根节点是相同的DOM元素类型时
如果两个根节点是相同类型的DOM元素，React会保留根节点，而
比较根节点的属性，然后只更新那些变化了的属性


3.当根节点是相同的组件类型时
如果两个根节点是相同类型的组件，对应的组件实例不会被销毁，
只是会执行更新操作，同步变化的属性到虚拟DOM树上，这一过程组
件实例的componentWillReceiveProps()和componentWillUpdate()会被调
用。
