
## 九.  Generator函数
1. 简介
Generator函数是ES6提供的一种异步编程解决方案。Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。
形式上，Generator函数有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）。
调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
ES6没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过
function * foo(x, y) { ... }
function *foo(x, y) { ... }
function* foo(x, y) { ... }
function*foo(x, y) { ... }
由于Generator函数仍然是普通函数，所以一般的写法是上面的第三种。
yield语句
由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。
遍历器对象的next方法的运行逻辑如下。
（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
需要注意的是，yield语句后面的表达式，只有当调用next方法. 内部指针指向该语句时才会执行。
另外需要注意，yield语句不能用在普通函数中，否则会报错。
function* gen() {
  yield  123 + 456;
}
var h = gen();
h.next()// { value: 579, done: false }
下面的例子也会报错,因为因为forEach方法的参数是一个普通函数，但是在里面使用了yield语句（这个函数里面还使用了yield*语句，这里可以不用理会，详细说明见后文）。一种修改方法是改用for循环。 
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }};
for (var f of flat(arr)){
  console.log(f);
}
2. next方法的参数
yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
function* f() {
  for(var i=0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }}
var g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

3. for...of循环
For...of循环可以自动遍历调用Generator函数时生成的Iterator对象，且此时不需要调用next方法。但要注意next方法的返回对象的done属性为true,for...of循环就会中止，且不包含该返回对象。
4. Generator.prototype.throw()
Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数内捕获。
注意，不要混淆遍历器对象的throw方法和全局的throw命令。 throw命令抛出的错误，只能被函数体外的catch语句捕获。如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined. done属性等于true的对象，即JavaScript引擎认为这个Generator已经运行结束了。

var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');} catch (e) {
  console.log('外部捕获', e);}
// 内部捕获 a// 外部捕获 b
在上面例子中，遍历器对象连续抛出了两个错误，第一个错误被Generator函数体内的catch语句捕获，i第二次抛出错误，由于Generator函数内部的catch语句已经被执行过了，不会再捕获到这个错误了，所以这个错误就被抛出了Generator函数体，被函数体外的catch语句捕获。
5. Generator.prototype.return()
Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
遍历器对象调用return方法后，返回值的value属性就是return方法的参数。如果return方法调用时，不提供参数，则返回值的value属性为undefined。并且，Generator函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。
如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;}
var g = numbers()
g.next() // { done: false, value: 1 }
g.next() // { done: false, value: 2 }
g.return(7) // { done: false, value: 4 }
g.next() // { done: false, value: 5 }
g.next() // { done: true, value: 7 }

6. yield*语句
如果在Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的。这个就需要用到yield*语句，用来在一个Generator函数里面执行另一个Generator函数。
从语法角度看，如果yield命令后面跟的是一个遍历器对象，需要在yield命令后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*语句。

7. 作为对象属性的Generator函数
如果一个对象的属性是Generator函数，可以简写成下面的形式。
  let obj = {
    * myGeneratorMethod() {
    ···
  }};
完整形式如下,与上面的写法是等价的:
  let obj = {
     myGeneratorMethod: function* () {
// ···  
}};

8. Generator函数的this
Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。
function* g() {}

g.prototype.hello = function () {
  return 'hi!';};
let obj = g();

obj instanceof g // trueobj.hello() // 'hi!'
上面代码表明，Generator函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。

9. 含义
10. 应用
