## promise
### 一、promise的API
1. Promise.prototype.then()
2. Promise.prototype.catch() 包含前一个resolve函数执行报错,也会触发catch
3. Promise.prototype.finally() finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

针对一组异步操作的用法：
4. Promise.all()只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。
5. Promise.race() 一组异步操作中状态最先变化的,最先改变的promise实例
6. Promise.allSettled()一组异步操作都结束了，不管每一个操作是成功还是失败
7. Promise.any() 任一参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态。

快速转换成Promise用法：
8. Promise.resolve() 
9. Promise.reject()

异步或者同步操作尝试
10. Promise.try()

### 二、Promise 的含义

### 三、基本用法
 
 




