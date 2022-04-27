# Pinia
 [Pinia之State、Getters、Actions详解](https://blog.csdn.net/lijiahui_/article/details/123102802)
 [Pinia.js 上手指南](https://juejin.cn/post/7049196967770980389)
 [Pinia](https://pinia.vuejs.org/getting-started.html)
Pinia.js 有如下特点：

1. 完整的 typescript 的支持；
2. 足够轻量，压缩后的体积只有1.6kb;
3. 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
4. actions 支持同步和异步；
5. 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
6. 无需手动添加 store，store 一旦创建便会自动添加；
 
## 一、Pinia 的主要 Api
  * createPinia
    - Plugins
  * defineStore  >>  声明一个Store
  * storeToRefs  >>  见`4.`使用案例
  * mapState  >> 在vue组件的options的computed中使用
  * mapGetters  >> mapState的别名，改用mapState
  * mapActions  >> 在vue组件的options的methods中使用
  * getActivePinia  >> 获取当前活动的 pinia 实例（如果有）。

- Store的核心配置：
  + State
  + Getters
  + Actions




 ## 二、State
 注意，store 是一个用 reactive 包装的对象，所以就像 props 在 setup 中一样，不能对其进行 对象解构 操作！
 `const store = useStore()`
API:
1. 重置state数据：
  将状态重置为其初始值： `store.$reset()`
2. 修改state数据：
 ```javascript
  store.property = xxxx
  store.$patch({}) // 或者这样，这种可以统一多个修改
  store.$patch((state)=>{ /** 这里修改state */ }) // $patch 方法还接受一个函数，用于应对复杂数据的修改过程
  ```
3. 更换state：
  将store的属性设置为新对象来替换Store的整个状态： `store.$state = { counter: 666, name: 'Paimon' }`
4. 订阅state：
 ```javascript
  store.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    mutation.type // 'direct' | 'patch object' | 'patch function'
    // same as cartStore.$id > store 的 name
    mutation.storeId // 'cart'
    // only available with mutation.type === 'patch object'
    mutation.payload // patch object passed to cartStore.$patch()
    // 无论何时更改，都将整个状态保留到本地存储  >  persist the whole state to the local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(state))
  },{ detached: false })
  // detached 默认是false，表示当组件被卸载时，$subscribe 订阅将被自动删除。
  // 如果要在组件卸载后保留 $subscribe 订阅，则改为 true 以从当前组件中分离状态订阅：
  ```
 ## 三、Getters
   1. Getter 完全等同于Store里的state的computed值。
   2. 他们接收state作为第一个参数，鼓励使用箭头函数功能：
   3. 外部(组件)将参数传递给 getter  >>> 见下面代码的 getUserById
   4. 访问其他store的getters

## 四、Actions
 Actions 相当于组件中的 methods。
 1. 你也可以完全自由地设置你想要的任何参数并返回任何东西。调用actions时，一切都会自动推断！
 2. 访问其他store的actions等内容；
 3. 订阅actions；
  传递给订阅的回调比actions事件先一步执行。
  默认情况下，actions订阅绑定到添加它们的组件（如果Store位于组件内部setup()里）。意思是，当组件被卸载时，它们将被自动删除。如果要在卸载组件后保留它们，传入第二个参数 true 用以将actions订阅与当前组件分离
 
```javascript
export default {
  setup() {
    const someStore = useSomeStore()
 
    const unsubscribe = someStore.$onAction(
      ({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        // a shared variable for this specific action call
        const startTime = Date.now()
        // this will trigger before an action on `store` is executed
        console.log(`Start "${name}" with params [${args.join(', ')}].`)
 
        // this will trigger if the action succeeds and after it has fully run.
        // it waits for any returned promised
        after((result) => {
          console.log(
            `Finished "${name}" after ${
              Date.now() - startTime
            }ms.\nResult: ${result}.`
          )
        })
 
        // this will trigger if the action throws or returns a promise that rejects
        onError((error) => {
          console.warn(
            `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
          )
        })
      }
    )
 
    // 可手动销毁订阅 manually remove the listener
    unsubscribe()
    // ...
  },
}
```
## 五、数据持久化
插件 pinia-plugin-persist 可以辅助实现数据持久化功能。