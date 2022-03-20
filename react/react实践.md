## react
## 一、创建工具
1. create-react-app 
create-react-app 是一个通过 npm 发布的安装包，
5.0以前版本需要全局安装，5.0版本不再需要全局安装，并且需要卸载掉之前的版本，
卸载不干净的时候可以通过在命令行中执行下面的命令进行清理
>where create-react-app
你也可以使用 create-react-app 提供的 yarn run eject 命令将所有内建的配置暴露出来
还有其他一些安装工具，比umi等

2. 相关文档
[react官方文档](https://zh-hans.reactjs.org/docs/hooks-state.html)
[react-valid-hookpcall-waring](https://zh-hans.reactjs.org/warnings/invalid-hook-call-warning.html)
[react的hook 10种hook](https://juejin.cn/post/6844903989696282631)

关于waring
注意,为避免困惑，在以下情况中调用 Hook 是不被支持的：

 * 不要在 class 组件中调用 Hook。
 * 不要在 event handlers 中调用。
 * 不要在 useMemo、useReducer 或 useEffect 的参数函数中调用。

3. react的class写法和hook写法

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

## 二、hook
 
React目前提供的Hook
>import React,{ useState } from 'react'
hook
用途

1. useState
设置和改变state，代替原来的state和setState

2. useEffect
代替原来的生命周期，componentDidMount，componentDidUpdate 和 componentWillUnmount 的合并版

useLayoutEffect
与 useEffect 作用相同，但它会同步调用 effect


3. useMemo
控制组件更新条件，可根据状态变化控制方法执行

4. useCallback
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

5. useRef
跟以前的ref，一样，只是更简洁了

6. useContext
上下文爷孙及更深组件传值

7. useReducer
代替原来redux里的reducer,配合useContext一起使用

8. useDebugValue
在 React 开发者工具中显示自定义 hook 的标签，调试使用。

9. useImperativeHandle
可以让你在使用 ref 时自定义暴露给父组件的实例值。
 
## UI:antd

> npm add antd
貌似没有类似vue的全局组件安装方法,都是需要使用的组件在对应页面进行安装的

1.