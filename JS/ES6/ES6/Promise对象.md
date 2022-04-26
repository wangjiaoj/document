
# 一. Promise对象
## 1.1. Promise的含义
Promise是异步编程的一种解决方案,比传统的解决方案--回调函数和事件--更加合理和强大。
Promise对象有以下两个特点。
1. 对象状态不受外界影响。Promise对象代表一个异步操作,有三种状态:pending(进行中). resolved(已完成,又称Fufilled)和Rejected(已失败)。只有异步操作的结果可以决定当前是哪一种状态。
2. 一旦状态改变，就不会在改变，任何时候都可以得到这个结果。Promise对象的状态改变只有两种可能:从pending到resolved和从pending变为rejected。
 
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 1.2. Promise基本用法 
ES6规定，Promise对象是一个构造函数，用来生成Promise实例。Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。
resolve函数的作用是，将Promise对象的状态从Pending变为Resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject函数的作用是，将Promise对象的状态从Pending变为Rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

```javascript 
  var promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });

  //Promise新建后就会立即执行。
  let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
  });

  promise.then(function() {
   console.log('Resolved.');
  });

  console.log('Hi!');
  // Promise
  // Hi!
  // Resolved
```


上面代码中，Promise新建后立即执行，所以首先输出的是“Promise”。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以“Resolved”最后输出。

## 1.3. Promise.prototype.then() 
Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。
then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。
then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

## 1.4. Promise.prototype.catch() 
`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```javascript 
getJSON("/posts.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误  
  console.log('发生错误！', error);
});

var promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test
var promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});

```
 
Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。 

 需要注意的是，catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法。

## 1.5 Promise.finally()
finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。 
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
 
## 1.6. Promise.all()
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。 

```javascript 
var p = Promise.all([p1, p2, p3]);
//p1. p2. p3都是Promise对象的实例
```
Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。如果不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理
p的状态由p1. p2. p3决定，分成两种情况。
   1. 只有p1. p2. p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1. p2. p3的返回值组成一个数组，传递给p的回调函数。
   2. 只要p1. p2. p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
## 1.7. Promise.race() 
Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
```javascript
var p = Promise.race([p1,p2,p3]);
//p1. p2. p3都是Promise对象的实例
```
只要p1. p2. p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

```javascript 
var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))

```
上面代码中，如果5秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
## 1.8 Promise.allSettled()
ES2020 引入了Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。
## 1.9 Promise.any()
只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。


## 1.10. Promise.resolve()  
Promise.resolve方法将现有对象转为Promise对象。Promise.resolve等价于下面的写法。

```javascript 
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

```
Promise.resolve方法的参数分成四种情况。
1. 参数是一个Promise实例
如果参数是Promise实例，那么Promise.resolve将不做任何修改. 原封不动地返回这个实例。
2. 参数是一个thenable对象
thenable对象指的是具有then方法的对象，比如下面这个对象。Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。

3. 参数不是具有then方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。

```javascript 
var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

```
4. 不带有任何参数
Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。
所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。

```javascript 
var p = Promise.resolve();
p.then(function () {
  // ...
});

```
## 1.11. Promise.reject() 
Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。它的参数用法与Promise.resolve方法完全一致。
 

## 二. async函数 
ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
async函数与Promise. Generator函数一样，是用来取代回调函数. 解决异步操作的一种方法。它本质上是Generator函数的语法糖 。

