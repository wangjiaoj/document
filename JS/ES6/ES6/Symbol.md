
## 六. Symbol
## 6.1. 概述
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


## 6.2. 作为名字属性的symbol
注意使用symbol值作为对象属性名时,不能用点运算符。
## 6.3. 实例:消除魔术字符串
魔术字符串指的是，在代码之中多次出现. 与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，该由含义清晰的变量代替。
## 6.4. 属性名的遍历
`Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。
```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```
Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。
```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3};

Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']
```

## 6.5. symbol.for(),symbol.keyFor()
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
## 6.7. 内置的symbol值


 