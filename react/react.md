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
（1）componentWillReceiveProps(nextProps)
（2）shouldComponentUpdatee(nextProps, nextState) 
（3）componentWillUpdatee(nextProps, nextState)
（4）render 
（5）componentDidUpdate(prevProps, prevState)

3、卸载阶段 组件从DOM中被卸载的过程，这个过程中只有一个生命周期方 法： componentWillUnmount

4、最后还需要提醒大家，只有类组件才具有生命周期方法，函数组件 是没有生命周期方法的，因此永远不要在函数组件中使用生命周期方法。







