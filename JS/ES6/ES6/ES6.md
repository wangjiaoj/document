## 一. let 和 const 命令：
### 1.1. ES6声变量的六种方式
ES5声明变量：var   function
ES6中新添加:  let   const  
另外两种声明变量的方法：Import   class

### 1.2. let 
  1. 没有变量提升(不像var命令会发生“变量提升”现象，即变量可以在声明之前使用).
  2. 暂时性死区（temporal dead zone，简称 TDZ）.
   暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
  3. 不允许重复声明

 ### 1.3. 块级作用域
 `{}`

 1. 块级作用域与函数声明

 ### 1.4 const 
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。
如果真的想将对象冻结，应该使用Object.freeze方法。

### 1.5. 顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象
ES5之中，顶层对象的属性与全局变量是等价的。
ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令. const命令. class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

## 二. 变量的解构赋值
1. 完全解构和不完全解构，不完全解构即等号左边的模式，只匹配一部分的等号右边的数组。
2. 解构赋值允许指定默认值。
3. 注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
4. 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。






## 三. 数值的扩展
1. 二进制和八进制表示法
ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。从ES5开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6进一步明确，要使用前缀0o表示。如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
Number('0b111')  // 7
Number('0o10')  // 8
2. Number.isFinite()，number.isNaN()
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
3. Number.parseInt()，Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

4. Number.isInteger()
Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
 

5. Number.EPSILON
ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
6. 安全整数和Number.isSafeInteger()
JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

7. Math对象的扩展
 
此外还有对数运算，
三角函数运算等
 
 





## 四. 函数扩展
## 4.1 部分扩展
1. 函数参数的默认值
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，rest参数也不会计入length属性。
2. reset函数
形式:”..变量名”,用于获取多余参数。
3. 扩展运算符
扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
4. name属性
函数的name属性，返回该函数的函数名。
如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字。

### 4.2. 箭头函数
ES6允许使用`=>`定义函数。
```javascript
 var f = v => v;//等同于
 var f = function(v) {
  return v;
 };


//如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
var sum = (num1, num2) => { return num1 + num2; }
```
 
箭头函数有几个使用注意点。
1. 箭头函数没有自己的this对象。
2. 不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。
上面四点中，第一点尤其值得注意。对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。
总之，箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

5. 函数绑定
由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向
扩展:vue2中option-api的methods都是通过bind来改变this指向,因此vue的methods不能使用箭头函数

6. 不适用场景
* 第一个场合是定义对象的方法，且该方法内部包括this。
* 
### 4.3. 尾调用优化
尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。
注意:是最后一步,而非最后一行,尾调用不一定出现在函数尾部，只要是最后一步操作即可。
尾调用优化是因为调用栈的原因，在函数最后一步调用其他函数，就不用保存外层函数的调用帧，因为调用位置. 内部变量等信息都不会再用到了，只要直接用内层函数的调用帧就可以了。
ES6的尾调用优化只在严格模式下开启，正常模式是无效的。
尾递归：函数调用自身，称为递归，如果要调用自身，就称为尾递归。

## 五. 对象的扩展
1. 属性的简洁表示法
ES6允许直接写入变量和函数,作为对象的属性和方法.ES6允许在对象中只写属性名,不写属性值,这是,属性值等于属性名所代表的变量.函数也同样可以简写,如下所示:
```javascript
var birth = '2000/01/01';
var Person = {
  name: '张三',
  //等同于birth: birth  birth,
  // 等同于hello: function ()...  hello() { 
     console.log('我的名字是', this.name); }
};
```


2. 属性名表达式
Javascript中定义对象的属性,有两种方法.一直接使用标识符作为属性名,二使用表达式作为属性名,这时要将表达式放在方括号之内.
使用字面量方式定义对象,在ES5中只能使用方法一,在ES6中允许使用字面量定义对象时,使用方法二.
3. 方法的name属性
函数的name属性,返回函数名.对象方法也是函数,因此也有name属性.但有两种特殊情况:bind方法创造的函数,name属性返回”bound”加上原函数的名字;Function构造函数创造的函数,name属性返回”anonymous”.
```javascript
(new Function()).name // "anonymous"
var doSomething = function() {
  // ...;
doSomething.bind().name // "bound doSomething"
```


4. Object.is()
ES5中比较两个值是否此相等,有相等运算符==和严格相等运算符===.前者会自动转换数据类型,后者NaN不等于自身,以及+0等于-0.
Object.is()是用于解决这个问题的新方法,其行为与===基本一致,不同在两处:+0等于-0,NaN等于自身.
```javascript
+0 === -0 //true
NaN === NaN // false
Object.is('foo', 'foo')// true
Object.is({}, {})// false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

5. Object.assign()
Object.assign()方法用于对象的合并,将源对象(source)的所有可枚举属性,复制到目标对象(target).
方法的第一个参数是目标对象,后面的参数都是源对象,如果目标对象与源对象有同名属性,或者多个源对象有同名属性,则后面的属性会覆盖前面的属性.如果只有一个参数,则会直接返回该对象;如果参数不是对象,则会先转化成对象,然后返回;由于undefined和null无法转化成对象,所以如果他们作为参数,就会报错.以上是对于目标对象,在源对象中,如果有非对象参数,首先会转为对象,如果无法转化,则跳过,故undefined和null不是一个参数,就不会报错.
Object.assign拷贝的属性是有限制的,只拷贝原属性的自身属性(不拷贝继承属性),也补拷贝不可枚举的属性(enumerable:false).
```javascript
var v1 = 'abc';var v2 = true;var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

只有字符串的包装对象,会产生可枚举的实义属性.
注意点:object.assign()是浅拷贝,而不是深拷贝,也就是说,如果源对象某个属性的值是对象,那么目标对象拷贝得到的是这个对象的引用.object.assign可以用来处理数组,但是会把数组视为对象.
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
6. 属性的可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {//    value: 123,//    writable: true,//    enumerable: true,//    configurable: true//  }
描述对象的enumerable属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。
ES5有三个操作会忽略enumerable为false的属性。
for...in循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()：返回对象自身的所有可枚举的属性的键名
JSON.stringify()：只串行化对象自身的可枚举的属性
ES6新增了一个操作Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
7. 属性的遍历
ES6一共有5种方法可以遍历对象的属性。
（1）for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
（2）Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
（3）Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
（4）Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
（5）Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
首先遍历所有属性名为数值的属性，按照数字排序。
其次遍历所有属性名为字符串的属性，按照生成时间排序。
最后遍历所有属性名为Symbol值的属性，按照生成时间排序。
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]

8. _proto_属性,object.setPrototypeOf(),object.getPrototypeOf()
(1)_proto_属性
_proto_属性,用来读取或设置当前对象的prototype对象.
ES6认为最好不要直接使用这个属性,而是使用object.setPrototype()写操作和object.getPrototype()读操作 object.create()生成操作
(2)object.setPrototype():作用与_proto_相同
(3)object.getPrototype():读取一个对象的prototype对象
9. Object.value(),object.entries()

10. 对象的可枚举性
11. object.getOwnPropertyDescriptors()

## 六. Symbol
1. 概述
ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined. Null. 布尔值（Boolean）. 字符串（String）. 数值（Number）. 对象（Object）。
Symbol值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
Symbol值不能与其他类型的值进行运算，会报错。但是，Symbol值可以显式转为字符串。另外，Symbol值也可以转为布尔值，但是不能转为数值。
```javascript
// 没有参数的情况
var s1 = Symbol();var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");var s2 = Symbol("foo");
s1 === s2 // false
var sym = Symbol();
Boolean(sym) // true
!sym  // false
if (sym) {
  // ...
}
Number(sym) // TypeError
sym + 2 // TypeError
```


2. 作为名字属性的symbol
注意使用symbol值作为对象属性名时,不能用点运算符。
3. 实例:消除魔术字符串
魔术字符串指的是，在代码之中多次出现. 与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，该由含义清晰的变量代替。
4. 属性名的遍历
Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。
```javascript
var obj = {};var a = Symbol('a');var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3};

Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']
```

5. symbol.for(),symbol.keyFor()
Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
```javascript
var s1 = Symbol.for('foo');var s2 = Symbol.for('foo');
s1 === s2 // true
Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
7. 内置的symbol值


 
## 十一. 异步操作和sync函数






ES6
http://es6.ruanyifeng.com/#docs/destructuring














JavaScript与有限状态机
http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html

可以在查询下其他js状态机的文章 这个阮一峰写的介绍文章
学习下这个 对理解react的状态state有帮助 react的每个组件也是内部一个state对应一种UI

在代码里面不要直接使用 window.onload=function(){//todo} 这种方式初始化
在有个别图片突然无法加载的时候 这段代码就有可能被阻塞了
前人挖的坑 只有在服务器突然有图片没加载才出现了诡异的代码没执行的现象 
 


用jquery的话 直接 $( function(){}) 或者确保代码是最后加载的话 用字 （function（）{}）()




大家接下来可以多用一些promise机制来处理回调问题 后面我们专门整理分享下好了 
我看现在有个实验性质的接口 window.fetch 就是基于promise机制的 可以替代ajax来进行请求数据
然后可以配合es7的 async/await写成同步方式的代码https://developer.mozilla.org/en/docs/Web/API/Fetch_API






Express  node
https://github.com/nswbmw/N-blog/wiki/%E7%AC%AC1%E7%AB%A0--%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E5%8D%9A%E5%AE%A2













