## 十二. Class
## 1.1. Class基本语法
ES6提供了Class（类）的概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰. 更像面向对象编程的语法而已。
注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。类的属性名，可以采用表达式。
ES6的类，完全可以看作构造函数的另一种写法。构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与ES5的行为不一致。
1. constructor方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。constructor方法默认返回实例对象(即this)。
2. 类的实例对象
与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
Class不存在变量提升（hoist），这一点与ES5完全不同。
Class表达式
```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }};
```
与函数一样，Class也可以使用表达式的形式定义。这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。
如果Class内部没用到的话，可以省略Me，也就是可以写成下面的形式。
`const MyClass = class { /* ... */ };`
采用Class表达式，可以写出立即执行的Class。
```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"
```
3. 私有方法
私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。
一种做法是在命名上加以区别。另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。


## 1.2. Class的继承
基本用法
Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
`class ColorPoint extends Point {}`
如果子类没有定义constructor方法，这个方法会被默认添加。
子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。(同理，在子类的构造函数中，只有调用super之后，才可以使用this关键字)
ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
```javascript
lass Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError   
    super(x, y);
    this.color = color; // 正确 
 }
}
   let cp = new ColorPoint(25, 8, 'green');
   cp instanceof ColorPoint // true
   cp instanceof Point // true
//说明实例cp既是子类的实例,也是父类的实例
```

图解ES5和ES6中的继承区别
 
```javascript
function F () { }
F.prototype.method = function () {
    console.log('Hi!');
}
var f = new F();
F.prototype.constructor === F; // ② true
f.constructor === F; // ④ true
f.__proto__ === F.prototype; // ⑤ true
```

 
```javascript
class Super {}
class Sub extends Super {}
var sub = nupload-divew Sub();
Sub.prototype.constructor === Sub; // ② true
sub.constructor === Sub; // ④ true
sub.__proto__ === Sub.prototype; // ⑤ true
Sub.__proto__ === Super; // ⑥ true
Sub.prototype.__proto__ === Super.prototype; // ⑦ true
```
ES6和ES5的继承是一模一样的，只是多了 class 和 extends ，ES6的子类和父类，子类原型和父类原型，通过 __proto__ 连接。
类的prototype属性和__proto__属性

## 1.3. 原生构造函数的继承
## 1.4. Class的取值函数(getter)和存值函数(setter)
与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```javascript
lass MyClass {
  constructor() {
    // ...  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }}
let inst = new MyClass();

inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```
存值函数和取值函数是设置在属性的descriptor对象上的。
```javascript
lass CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");"get" in descriptor  // true"set" in descriptor  // true
  ```
上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与ES5完全一致。

## 1.5. Class的Generator方法
如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。
```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }}
for (let x of new Foo('hello', 'world')) {
  console.log(x);}
// hello// world
```
上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

## 1.6. Class的静态方法 
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()// TypeError: foo.classMethod is not a function
class Bar extends Foo {}
Bar.classMethod(); // 'hello'

class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}
Bar.classMethod();
```

## 1.7. Class的静态属性和实例属性 
静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。 
```javascript
// 以下两种写法都无效
class Foo {
// 写法一 
 prop: 2
// 写法二  
static prop: 2
}
Foo.prop // undefined
```
## 1.8. new.target属性
new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```javascript
unction Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }}
// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }}
var person = new Person('张三'); // 正确var notAPerson = Person.call(person, '张三');  // 报错
```
## 1.9. Mixin模式的实现 
  