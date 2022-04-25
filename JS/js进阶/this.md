# this

 this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象（这句话有些问题，后面会解释为什么会有问题，虽然网上大部分的文章都是这样说的，虽然在很多情况下那样去理解不会出什么问题，但是实际上那样理解是不准确的，所以在你理解this的时候会有种琢磨不透的感觉），那么接下来我会深入的探讨这个问题。

 js中函数的5种调用方式：

## 一. 全局的this(浏览器）：指向window

    ```javascript
        console.log(this.document===document);//true

        conosle.log(this.window===window);//true

        this.a=37;
        console.log(window.a);//37
    ```

## 二. 一般函数调用的this:指向window
  作为普通函数来调用时this的值->window,准确来说，this为null，但被解释为window,在ECMASCRIPT标准中，如果this为null，则被解释成undefined
  ```javascript
    function f1(){
        return this;
    }
    f1()===window;//true

    function f2(){
    "use strict";
    return this;
    }
    f2();//undefined
    f2()===window; //false
   ```



## 三. 作为对象的方法来调用时：this指向方法的调用者，即该对象

 例一中第二次调用时`(o.f)()`之所以值依然是37，原因是因为`o.f`和`(o.f)`的定义是相同的；第三次调用时是先发生了赋值，然后调用赋值后的返回函数，所以是12

```javascript
//例一
var age=12;
var o = {
  age:37,
　f:function(){
　　　return this.age;
　}
}
console.log(o.f());//37
console.log((o.f)())//37
console.log((o.f=o.f)())//12

//例二
var o = {prop:37};
function indepent(){
　　return this.prop;
}
o.f = indepent;
console.log(o.f());//37

//例三
var o={
     a:37,
     b:{
        a:12,
        fn:function(){
            console.log(this.a);
        }
     }
};
o.b.fn();//12

//例四
var o={
     a:37,
     b:{
        a:12,
        fn:function(){
            console.log(this.a);//undefined
            console.log(this);//window
        }
     }
};
var j=o.b.fn;
j();

```

1. this指向的永远是最后调用它的对象，即执行时是谁调用的
2. get/set方法:也是会指向get/set方法所在的对象

## 四. 原型链上的this

```javascript
var o = {
    f:function(){
      return this.a+this.b;
    }
};
var p=Object.create(o);
//通过object.create()创建了一个对象p,p为空对象，且她的原型会指向o
p.a=1;
p.b=4;
console.log(p.f());//5
```

* 不管是原型链上的还是对象本身的，调用时都是指向p这样一个对象的

## 五. 作为构造函数调用时

如果函数调用前使用了 new 关键字, 则是调用了构造函数。
`new constrcut()`是一种创建对象的语法糖
 

因为构造函数调用过程中实际上用到了call,apply来改变指向方向,可以先了解一下：

### 5.1. call,apply
  函数被call、apply调用
  语法格式：`fn.call(对象obj，参数1，参数2...参数N);`

  运行如下：fn函数中this指向对象obj,运行fn(参数1，参数2...参数N)；
  ```javascript
    function t(num){
        alert("我的真实年龄是"+this.age);
        alert("但我一般告诉别人我"+(this.age+num));
    }
    var human = {name:"lisa",age:20};
    human.t = t;
    human.t(-10);
    var wangwu = {name:"wangwu",age:30};
    t.call(wangwu,5);
    
   ```

### 5.2 构造函数使用

ES5中没有类的概念，创建对象是用构造函数来完成的，或者直接用json格式{}来写对象

```javascript
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This    creates a new object
var a = new myFunction("Li","Cherry");
a.lastName;                             // 返回 "Cherry"
```

2. new的实际过程：
* 创建一个空对象 obj;
* 将新创建的空对象的隐式原型指向其构造函数的显示原型。
* 使用 call 改变 this 的指向
* 如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

  伪代码表示：
```javascript
var a = new myFunction("Li","Cherry");

new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === 'object'? result : obj;
}
```
 
 
  注意： 构造函数运行时，如果含有return语句，返回的不是对象，那就会自动忽略



### 5.5 关于this的几道题目：

```javascript
name="this is window";
var obj={
    name:"php",
    function(){
     alert(this.name);
   }
}
var dog={name:"huzi"};

obj.t();//php

var tmp=obj.t;
tmp();

dog.t=obj.t;
dog.t();

(dog.t=obj.t)();

dog.t.call(obj);//php
```

 tmp 和(dog.t=obj.t)()所指向的母体不同，前者是window，后者是null，被解释为window

## 六. 新思路
### 6.1 利用call来分析this问题
 [利用call来分析this问题的思路参考文章](http://www.imooc.com/article/1758).
1. 把一个函数调用替换成funcName.call的形式，从而理解运行时上下文中this到底指向谁。总结来说就是下面两个等价变形：
  + `foo() ---> foo.call(window)`
  + `obj.foo() --> obj.foo.call(obj)`
  + 只要理解以上两个变形，this就不再是问题啦！！

2. 例五：

```javascript
 var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};

obj.f(); // obj.f.call(obj)
// ==> 20

var fOut = obj.f;
fOut(); // fOut.call(window)
//==> 10

var obj2 = {
    x: 30,
    f: obj.f
}

obj2.f(); // obj2.f.call(obj2)
//==> 30
```

* 例五有些同学会可能出错的原因，是没有明确我上面说的：this是在执行时才会被确认的
3. 用于构造函数，先看一段代码：

```javascript
func person(name) {
 this.name = name;
}
var caibirdme = new person("deen");
// caibirdme.name == deen
```

 函数在用作构造函数时同样可以用call方法去代替，那这里怎么代替呢？这里你又需要明确一点：new constrcut()是一种创建对象的语法糖它等价于

```javascript
    function person(name) {
       this.name = name;
    }
    var foo = new person("deen");
    //通过new创建了一个对象
    //new是一种语法糖，new person等价于
    var bar = (function(name) {
        var _newObj = {
            constructor : person,
            __proto__ : person.prototype,
        };
        _newObj.constructor(name); // _newObj.constructor.call(_newObj, name)
        return _newObj;
    })();
```

So you can see……为什么new的时候this就指向新的对象了吧？





