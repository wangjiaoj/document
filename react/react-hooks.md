## React Hooks
## 一、Hooks基础

[ 「React 进阶」 React 全部 Hooks 使用大全 （包含 React v18 版本 ）](https://juejin.cn/post/7118937685653192735)
 [react-hook-索引](https://zh-hans.reactjs.org/docs/hooks-reference.html#basic-hooks)

### 1.1. react的class写法和hook写法
  class写法
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
  ````

  hook写法
  ````javascript
  import React,{ useState } from 'react'
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

### 1.2. 关于waring和Error
  1. 注意,为避免困惑，在以下情况中调用 Hook 是不被支持的：
  * 不要在 class 组件中调用 Hook。
  * 不要在 event handlers 中调用。
  * 不要在 useMemo、useReducer 或 useEffect 的参数函数中调用。
  2. componet写法需要大写首字母,hook需要使用use开头命名

### 1.3 React目前提供的Hook

  按照功能分类:

  1. 数据更新驱动
   * useState
   * useReducer
   * useSyncExternalStore (v18)
   * useTransition (v18)
   * useDeferredValue (v18)

  2. 执行副作用
   * useEffect
   * useLayoutEffect
   * useInsertionEffect (v18)

  3. 状态获取与传递
   * useRef
   * useContext
   * useImperativeHandle

  4. 状态派生与保存
    * useMemo
    * useCallback

  5. 工具hooks
    * useDebugValue

## 二、 Hook

### 2.1. 数据更新驱动  
#### 2.1.1 useState
  > const [ state , dispatch ] = useState(initData)

  设置和改变state，代替原来的`state`和`setState`
  state是Object类型情况下,不能部分更新属性,需要自行和旧值合并,可以自行封装hook解决这个问题,如aHook库

#### 2.1.2. useReducer
  > const [ state , dispatch ] = useReducer(reducer)

  useReducer可以说是useState的复杂版,是 useState 的底层实现，可以管理多个 state，把 state 从组件内部抽离出来
  使用场景：
  * 一定程度上,配合useContext一起使用,可以代替原来redux里的reducer
  * 一些复杂的对象状态更新应该适用



### 2.2. 执行副作用
#### 2.2.1. useEffect
  ````javascript
    useEffect(()=>{
        return destory
    },dep)
  ````
  可以实现 `componentDidMount componentDidUpdate componentWillUnmount` 这几个生命周期的功能。在每次渲染后都会触发，触发的条件是依赖项dep有改变。
  第一个参数 callback, 返回的 destory ;
  第二个参数作为依赖项，是一个数组，可以有多个依赖项，依赖项改变dep

  用途:
  * 作为`componentDidMount`使用，[]做第二个参数
  * 作为`compontDidUpdate`使用，可指定依赖dep
  * 作为`componentWillUnmount`使用，通过return destory,在组件卸载前进行副作用清除等操作

  对于 `useEffect` 执行， React 处理逻辑是采用异步调用，对于每一个 effect 的 callback， React 会向 setTimeout回调函数一样，放入任务队列，等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行。所以 effect 回调函数不会阻塞浏览器绘制视图。
  如果同时存在多个useEffect，会按照出现次序执行
 

#### 2.2.2. useLayoutEffect
  ````javascript
    const DemoUseLayoutEffect = () => {
        const target = useRef()
        useLayoutEffect(() => {
            /*我们需要在dom绘制之前，移动dom到制定位置*/
            const { x ,y } = getPositon() /* 获取要移动的 x,y坐标 */
            animate(target.current,{ x,y })
        }, []);
        return (
            <div >
                <span ref={ target } className="animate"></span>
            </div>
        )
    }
  ````
  useLayoutEffect 和 useEffect 不同的地方是采用了同步执行，二者区别:
  1. 首先 useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前，这样可以方便修改 DOM，获取 DOM 信息，这样浏览器只会绘制一次，如果修改 DOM 布局放在 useEffect ，那 useEffect 执行是在浏览器绘制视图之后，接下来又改 DOM ，就可能会导致浏览器再次回流和重绘。而且由于两次绘制，视图上可能会造成闪现突兀的效果。
  2. useLayoutEffect callback 中代码执行会阻塞浏览器绘制。
 
#### 2.2.3. useInsertionEffect (v18)
  useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题。这个 hooks 主要是应用于这个场景，在其他场景下 React 不期望用这个 hooks 。
   useInsertionEffect 执行 -> useLayoutEffect 执行 -> useEffect 执行

### 2.3. 状态获取与传递


#### 2.3.1. useContext
  上下文爷孙及更深组件传值
  ````javascript
   const C = react.CreateContext()
   <C.provider value={reducer}>

   // 子孙组件调用
   const {reducer} = useContext(context)
  ````
   useContext 接受一个参数，一般都是 context 对象，返回值为 context 对象内部保存的 value 值。


   
#### 2.3.2. useRef
 ````javascript
 const cur = React.useRef(initState)
 console.log(cur.current)
 ````
  返回一个引用，每次渲染都返回同一个对象，
  跟以前的ref一样， 

#### 2.3.3. useImperativeHandle
  可以让你在使用 ref 时自定义暴露给父组件的实例值。

### 2.4 状态派生与保存

#### 2.4.1. useMemo
  控制组件更新条件，可根据状态变化控制方法执行

  使用场景:
  * 

### 2.4.2. useCallback
  useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
  需要结合React.memo/comonentShouldUpdate使用,usecallback记住函数，避免函数重复生成,这样函数在传递给子组件的时候，可以避免子组件重复渲染,提升性能



### 2.5. 工具hooks
#### 2.5.1. useDebugValue
  在 React 开发者工具中显示自定义 hook 的标签，调试使用。


 
## 三、组合的复杂用法
### 3.1 useReducer简单实现redux功能
  useReducer是进阶版的useState
  使用hook提供的useReducer可以考虑简单情况下不再使用redux
  [dispatch作用 react_React学习之路-react hooks总结(上)](https://blog.csdn.net/weixin_30579759/article/details/112191406)
  主要思路自定义state,利用context实现全局组件都可以调用
 
1. context
  Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
  * React.createContext
  * Context.Provider
  * Class.contextType
  * Context.Consumer
  * Context.displayName



## 三、关于hook的一些使用问题

## 3.1 使用误区
   [React Hooks 使用误区，驳官方文档](https://juejin.cn/post/7046358484610187277)




## 五、react-API
[react-api](https://zh-hans.reactjs.org/docs/react-api.html)
部分API整理
### 5.1. React.memo
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

### 5.2. react.createContext
  react.XX


 



### 1.1. 相关文档
  [react官方文档](https://zh-hans.reactjs.org/docs/hooks-state.html)
  [react-valid-hookpcall-waring](https://zh-hans.reactjs.org/warnings/invalid-hook-call-warning.html)
  [react的hook 10种hook](https://juejin.cn/post/6844903989696282631)
  [react-context](https://zh-hans.reactjs.org/docs/context.html)
  [写了3个月React，我学到了什么？](https://mp.weixin.qq.com/s/8tEh0R95U47c1tKf2bzQJw)

  [React Hooks 使用详解及实际项目中遇到的坑](https://juejin.cn/post/6844904157829136398)
 
[ 「React 进阶」 React 全部 Hooks 使用大全 （包含 React v18 版本 ）](https://juejin.cn/post/7118937685653192735)

