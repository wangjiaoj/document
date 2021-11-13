# 一、react
## 1.1、JSX
1、REACT组件首字母大写
2、在JSX中使用JavaScript表达式需要将表达式用大括号“{}”包起来
注意，JSX中只能使用JavaScript表达式，而不能使用多行JavaScript 语句
不过，JSX中可以使用三目运算符或逻辑与（&&）运算符代替if语 句的作用。
3、属性问题
Dom标签属性驼峰大写，className

## 1.2、组件使用

1、在定义组件之后，使用ES 6 export将PostList作为默认模块导 出，从而可以在其他JS文件中导入PostList使用。需要使用ReactDOM.render() 完成这一个工作，挂载到页面的DOM节点 上。
2、props
通过this.Props来获取props传递的参数

3、组件state
组件的state是组件内部的状态，state的变化最终将反映到组件UI的 变化上。我们在组件的构造方法constructor中通过this.state定义组件的初 始状态，并通过调用this.setState方法改变组件状态

React组件正是由props和state两种类型的数据驱动渲染出组件UI。 props是组件对外的接口，组件通过props接收外部传入的数据（包括方 法）；state是组件对内的接口，组件内部状态的变化通过state来反映。 另外，props是只读的，你不能在组件内部修改props；state是可变的， 组件状态的变化通过修改state来实现。

4、无状态组件和有状态组件
用不到state，这样的组件称之为无状态组件
函数组件
定义无状态组件除了使用ES 6 class的方式外，还可以使用函数定 义，也就是我们在本节开始时所说的函数组件。一个函数组件接收 props作为参数，返回代表这个组件UI的React元素结构。例如，下面是 一个简单的函数组件：
````javascript
 function Welcome(props) { 
   return Hello, {props.name};
 }
````
与常规的必须extend，含有render方法的组件写法上明显简洁很多


### 1.3、组件生命周期
1、挂载阶段
依次调用的生命周期方法有： 
（1）constructor 
（2）componentWillMount
（3）render 
（4）componentDidMount
2、组件更新阶段，依次调 用的生命周期方法有：
（1）componentWillReceiveProps （nextProps）
（2）shouldComponentUpdatee（nextProps, nextState） 
（3）componentWillUpdate e（nextProps, nextState）
（4）render 
（5）componentDidUpdate（prevProps, prevState）

3、卸载阶段 组件从DOM中被卸载的过程，这个过程中只有一个生命周期方 法： componentWillUnmount

4、最后还需要提醒大家，只有类组件才具有生命周期方法，函数组件 是没有生命周期方法的，因此永远不要在函数组件中使用生命周期方法。




# 二、Preact 和 react 异同



# 三、react 与 Vue 异同（react-vue差异对比）
语法 生命周期更方面都存在差异，一般来讲vue更容易上手一些

设计理念：vue:MVVM(M+V+VM)

语法： 生命周期更方面都存在差异，一般来讲vue更容易上手一些
https://www.cnblogs.com/sanchang/p/10513571.html

## 3.1、React的单向数据流与Vue的双向绑定
1. 严格来说是两个概念，这里说的数据流应该是父子组件间的数据流向,react和vue在这个层面上来说应该都是单向数据流。
vue是借助v-model实现了双向数据绑定。


2. 总结：React遵循从上到下的数据流向，即单向数据流。
1、单向数据流并非‘单向绑定’，甚至单向数据流与绑定没有‘任何关系’。对于React来说，单向数据流（从上到下）与单一数据源这两个原则，限定了React中要想在一个组件中更新另一个组件的状态（类似于Vue的平行组件传参，或者是子组件向父组件传递参数），需要进行状态提升。即将状态提升到他们最近的祖先组件中。子组件中Change了状态，触发父组件状态的变更，父组件状态的变更，影响到了另一个组件的显示（因为传递给另一个组件的状态变化了，这一点与Vue子组件的$emit()方法很相似）。
2、Vue也是单向数据流，只不过能实现双向绑定。
3、单向数据流中的‘单向’-- 数据从父组件到子组件这个流向叫单向。
4、绑定的单双向：View层与Module层之间的映射关系。

3. 其实react中的单向数据流，完整概念应该是： 数据的流向只能通过props由外层到内层 一层一层往里传递。
    只能通过props一层一层往里传递这样的限制啊……不可能的，考虑到项目复杂度，组件层级过高，这个我们真不能接受啊。
    react想了想，是啊不能太狠毒，限制过大万一没人用岂不是尴尬了？于是加上了context这个玩意，方便我们进行组件间的隔代通信。

    
## 3.2 关于挂在到节点上

1. vue:
>let v= new vue()
> v.munted()//调用方法挂载渲染到页面Dom节点上
2. React
>ReactDom.render(<Parent>,dom);
 

## 3.2、关于于兄弟组件通信
1. vue
常见是eventBus,new Vue()作为一个发布订阅工具
 

 
