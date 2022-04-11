## react
## 一、基础
### 1.1. 相关文档
[react官方文档](https://zh-hans.reactjs.org/docs/hooks-state.html)
[react-valid-hookpcall-waring](https://zh-hans.reactjs.org/warnings/invalid-hook-call-warning.html)
[react的hook 10种hook](https://juejin.cn/post/6844903989696282631)

### 1.2. react的class写法和hook写法

````javascript
import React from 'react';
import './App.css';
//通常的class写法,改变状态
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hook:'react hook 是真的好用啊'
    }
  }
  changehook = () => {
    this.setState({
      hook:'我改变了react hook 的值'
    })
  }
  render () {
    const { hook } = this.state
    return(
         <header className="App-header">
          {hook}
          <button onClick={this.changehook}>
            改变hook
          </button>
        </header>
      )
  }
}
export  {App}

//函数式写法,改变状态
function App() {
//创建了一个叫hook的变量，sethook方法可以改变这个变量,初始值为‘react hook 是真的好用啊’
 const [hook, sethook] = useState("react hook 是真的好用啊");
  return ( 
    <header className="App-header">
      {hook}{/**这里的变量和方法也是可以直接使用的 */}
      <button onClick={() => sethook("我改变了react hook 的值")}>
        改变hook
      </button>
    </header>
  );
}
export  {App}

//箭头函数的函数写法,改变状态
export const App = props => {
  const [hook, sethook] = useState("react hook 是真的好用啊");
  return (
    <header className="App-header">
      {hook}
      <button onClick={() => sethook("我改变了react hook 的值")}>
        改变hook
      </button>
    </header>
  );
};


````

### 1.3. 关于waring和Error
1. 注意,为避免困惑，在以下情况中调用 Hook 是不被支持的：
 * 不要在 class 组件中调用 Hook。
 * 不要在 event handlers 中调用。
 * 不要在 useMemo、useReducer 或 useEffect 的参数函数中调用。
2. componet写法需要大写首字母,hook需要使用use开头命名


## 二、hook
 [react-hook-索引](https://zh-hans.reactjs.org/docs/hooks-reference.html#basic-hooks)
用途
React目前提供的Hook
>import React,{ useState } from 'react'
基础 Hook:
* useState
* useEffect
* useContext
额外的 Hook:
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeHandle
* useLayoutEffect
* useDebugValue


1. useState
设置和改变state，代替原来的state和setState
state是Object类型情况下,不能部分更新属性,需要自行和旧值合并,可以自行封装hook解决这个问题,如aHook库

2. useEffect
代替原来的生命周期，componentDidMount，componentDidUpdate 和 componentWillUnmount 的合并版
我们一般叫afterRender，每次render后运行

用途:
* 作为componentDidMount使用，[]做第二个参数
* 作为compontDidUpdate使用，可指定依赖
* 作为componentWillUnmount使用，通过return
如果同时存在多个useEffect，会按照出现次序执行
 

useLayoutEffect
与 useEffect 作用相同，但它会同步调用 effect

3. useContext
上下文爷孙及更深组件传值
使用方案:
> const C = react.CreateContext()
> <C.provider value={reducer}>
子孙组件调用
> const {reducer} = useContext(context)

4. useReducer
useReducer可以说是useState的复杂版
使用场景：
* 一定程度上,配合useContext一起使用,可以代替原来redux里的reducer
* 一些复杂的对象状态更新应该适用

5. useMemo
控制组件更新条件，可根据状态变化控制方法执行

使用场景:
* 

6. useCallback
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
需要结合React.memo/comonentShouldUpdate使用,usecallback记住函数，避免函数重复生成,这样函数在传递给子组件的时候，可以避免子组件重复渲染,提升性能
7. useRef
跟以前的ref，一样，只是更简洁了



8. useDebugValue
在 React 开发者工具中显示自定义 hook 的标签，调试使用。

9. useImperativeHandle
可以让你在使用 ref 时自定义暴露给父组件的实例值。
 
## 三、useReducer简单实现redux功能
useReducer是进阶版的useState
使用hook提供的useReducer可以考虑简单情况下不再使用redux
[dispatch作用 react_React学习之路-react hooks总结(上)](https://blog.csdn.net/weixin_30579759/article/details/112191406)
主要思路自定义state,利用context实现全局组件都可以调用
[react-context](https://zh-hans.reactjs.org/docs/context.html)
1. context
Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
* React.createContext
* Context.Provider
* Class.contextType
* Context.Consumer
* Context.displayName



## 四、
[React Hooks 使用误区，驳官方文档](https://juejin.cn/post/7046358484610187277)



## 五、react-API
[react-api](https://zh-hans.reactjs.org/docs/react-api.html)
部分API整理
1. React.memo
父组件中与子组件无关的一些state更新也会导致子组件重新渲染,该API可以用来封装子组件,避免子组件重复渲染。
但是如果父组件在引用子组件时传入函数，函数前后反复定义，但实际地址不同,依然会导致子组件更新,可以结合useDemo/useCallbak来定义传入函数
````javascript
const Child2 = React.memo(ShopChild);
// const Child2 = React.memo(ShopChild,(prevProps,nextProps)=>{
//   return prevProps.data==nextProps.data?true:false
//    前后两个传入渲染都是一致的,返回true
// });
//实践证明叠加memo第二个参数是可以控制更新状态的
const ShopList =(props)=> {
      const [M,setM] = useState(0);
      const [N,setN] = useState(0);
      const clickHandle = ()=>{
         setN(N+1);
      }
      //如果子组件定义了事件进行hook-setState更新,依然会受到N更新影响再渲染
      // const clickChildHandle = ()=>{
      //   console.log('mmm') 
      //   实际上即使只有console,N更新依然会触发子组件更新,原因是该函数反复生成,
      //   新旧函数功能一致但是地址不一致,需要使用useMemo解决
      //   按照props上函数指向地址不同来理解也是一样的
      //   setM(M+1);
      // }
      return (
        <div className="shopping-list">
          <h1>Shopping List for </h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
          </ul>
          <Button onClick={clickHandle}>N:{N}</Button>
          <Child2 data={M} ></Child2>
          {/**onClick={clickChildHandle}**/} 
        </div>
      )
    
}

````
官方对此描述：
如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。
React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。
默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

场景：
父组件中与子组件无关的一些state更新也会导致子组件重新渲染,可以使用该方法来进行控制，避免不必要render。

react.memo/shouldUpdateComponent
关系对比

2. react.createContext
react.XX



## 六、样式
1. UI:antd

> npm add antd
貌似没有类似vue的全局组件安装方法,都是需要使用的组件在对应页面进行安装的



## 六、React状态管理
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


