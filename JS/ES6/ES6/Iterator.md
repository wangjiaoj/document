
## 八. Iterator和for...of循环
## 1.1. Iterator(遍历器)的概念
Iterator(遍历器)是一种接口,为不同的数据结构提供统一的访问机制。
Iterator的遍历过程是这样的:
 1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
 2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
 3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
 4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
在ES6中，有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历，有些就不行（比如对象）。原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有。凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

## 1.2. 数据接口的默认Iterator
Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。
1. ES6规定，默认的Iterator接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。调用Symbol.iterator方法，就会得到当前数据结构默认的遍历器生成函数。Symbol.iterator本身是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的. 类型为Symbol的特殊值，所以要放在方括号内（请参考Symbol一章）。

在ES6中，有三类数据结构原生具备Iterator接口：数组, 某些类似数组的对象, Set和Map结构。
对于这三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。
```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```
 对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口。
 ```javascript
NodeList.prototype[Symbol.iterator] =   Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了
```
下面是类似数组的对象调用数组的Symbol.iterator方法的例子。
```javascript
  let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of iterable) {
     console.log(item); // 'a', 'b', 'c'
  }
```
注意，普通对象部署数组的Symbol.iterator方法，并无效果。
如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
```javascript
var obj = {};

obj[Symbol.iterator] = () => 1;
[...obj] // TypeError: [] is not a function
```
上面代码中，变量obj的Symbol.iterator方法对应的不是遍历器生成函数，因此报错。
## 1.3. 调用Iterator接口的场合
## 1.4. 字符串的Iterator接口
字符串是一个类似数组的对象，也原生具有Iterator接口。
## 1.5. Iterator接口与Generator函数
## 1.6. 遍历器对象的return(),throw()
遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
7. for...of循环
ES6借鉴C++. Java. C#和Python语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
for...of循环可以使用的范围包括数组. Set和Map结构. 某些类似数组的对象（比如arguments对象. DOM NodeList对象）. 后文的Generator对象，以及字符串。
