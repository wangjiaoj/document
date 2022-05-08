# JS进阶

## 一、函数

### 1.1 函数的概念：

1. 函数是一块JavaScript代码，被定义一次，但可执行和调用多次，js中的函数也是对象，所以js函数可以像其他对象那样操作和传递,所以我们也常叫js中的函数为函数对象。
2. 关于函数的五个部分：this、arguments、作用域、不同调用方式、不同创建方法

### 1.2 函数的调用方式：

* 直接调用：foo();
* 对象方法：o.method()；
* 构造器：new foo();
* call  apply  bind

### 1.3 函数声明与函数表达式：

1. 函数可以赋值给变量，可以作为参数传递

```javascript
fuction t1(){
//code
}//函数声明
t2=function(){
//code
}//函数表达式
```

2. 在词法分析上，二者存在明确区别，前者在词法分析阶段起作用，后者在运行阶段起作用。


### 1.4、arguments

 1. arguments是什么？
   是一个对象，是一个类数组对象
 2. arguments内容是什么？
   arguments是函数运行时的实参列表
 3. arguments收集所有的实参，即使没有与之相对应的形参，形参与对应的arguments单元，其实是相互映射的，相互影响。
    在词法分析中，首先按形参形成AO的属性，值为undefind。
    当实参传来时，在修改AO的相应属性。
 4. arguments的索引从0、1、2……递增，与实参逐个对应，
  * arguments.length属性代表实参的个数
  * arguments.callee代表”当前运行的函数”
  * arguments每一个函数都有，arguments只会在内部找自身的arguments，无法引用到外层的arguments

### 1.5、自执行函数写法
自执行匿名函数：

常见格式：`(function() { /* code */ })();`
解释：包围函数`(function(){})`的第一对括号向脚本返回未命名的函数，随后一对空括号立即执行返回的未命名函数，括号内为匿名函数的参数。
作用：可以用它创建命名空间，只要把自己所有的代码都写在这个特殊的函数包装内，那么外部就不能访问，除非你允许(变量前加上window，这样该函数或变量就成为全局)。各JavaScript库的代码也基本是这种组织形式。
总结一下，执行函数的作用主要为 匿名 和 自动执行,代码在被解释时就已经在运行了。

其他写法：
```JavaScript
 (function () { /* code */ } ()); 
 !function () { /* code */ } ();
 ~function () { /* code */ } ();
 -function () { /* code */ } ();
 +function () { /* code */ } ();
```


## 二、执行环境、作用域、词法分析及垃圾收集、闭包

### 2.1 执行环境(excution context)，有时简称为环境：

1. 执行环境定义了变量或函数有权访问的其他数据，决定了他们各自的行为;
2. 每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
3. 全局执行环境是最外围的一个执行环境，在web浏览器中，全局执行环境被认为是window对象。每一个函数都有自己的执行环境。
4. 某个执行环境的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁(全局执行环境直到应用程序退出，如关闭网页或浏览器时才会被销毁)。
5. 执行流控制机制：当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，将控制权交给之前的执行环境。

### 2.2 作用域链(scope chain)

* 当代码在一个环境中执行时，会创建变量对象的一个作用域链.
* 作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象(active object)作为变量对象。
作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。这样一直延续到全局执行环境；
全局执行环境的变量对象始终都是作用域链中的最后一个对象。


1. 在函数嵌套中，变量(标识符)是如何查找的？ 首先从作用域链前端开始，在局部环境(函数内部)寻找，寻找不到，则向外层寻找，直到全局（Window）环境的变量对象。
2. var，是在函数运行的上下文中，声明一个变量，如果不加var，则认为是一个赋值操作，但不要狭隘的理解为声明一个全局变量。

### 2.3 词法分析过程:

1. js代码执行：
  + JavaScript代码自上而下执行，但是js代码在执行前，会先有词法分析过程，所以事实上，js运行要分为词法分析和执行两个阶段。
  + 所以即使当前要打印的变量的声明代码在后面，还没有运行到，但系统会在词法分析期间默认已经有了这个变量，所以结果是undefine，而不是报错。
2. 词法分析主要分为3步：
   + 第一步：先分析形参
   + 第二步：分析变量声明
   + 第三步：分析函数声明
3. 如果存在函数嵌套，则从外往内进行词法分析；
4. 一个函数能够使用的局部变量，就从上面3步分析而来。
5. 具体步骤：
  + 0：函数运行前的一瞬间，生成`ative object`(活动对象)，形成AO
  + 1：
    - 1.1 函数声明的形参，生成AO的属性，值是undefined，
    - 1.2 接收实参，给刚刚形成AO的属性的形参赋值。
  + 2：分析var变量声明：如 `var age`,
    - 2.1 如果AO上还没有age属性，则添加AO属性，值是undefined，
    - 2.2 如果AO上已经有age属性，则不做任何操作.
  + 3：分析函数声明，如`function foo(){}`
    - 3.1 如果AO上还没有foo属性,则把函数赋给AO.foo属性.
    - 3.2 如果此前foo属性已存在，则会被直接覆盖，把函数赋给AO.foo属性.

6. 如果存在函数嵌套，则从外往内进行词法分析；--此时就形成了作用域链
7. 进行词法分析之后，进行执行阶段，赋值发生在执行阶段。

8. 例题：
例题1
```javascript
function fun(greet){
    var greet="hello";
    console.log(greet);
    function greet(){
    }
    console.log(greet);
}
fun(null);//hello   hello
fun("nice");//hello hello
```
例题2        
```javascript
function func(greet){
    var greet;
    console.log(greet);
    function greet(){
    }
    console.log(greet);
}
func(null);//function grret(){}  function grret(){}
func("nice");//function grret(){}  function grret(){}
```
例题3
 ```javascript
function func(greet){
    console.log(greet);
    greet=function (){

    }
    console.log(greet);
}
func(1);//1 function(){}
```

### 2.4 作用域链其他知识点

* 作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。
* AO链其实可以认为就是作用域链。找变量时由内向外找，分析AO链时由外向内分析
* JS三个重要组成部分：作用域链、原型链、闭包
* 当一个函数运行的时候，函数内部能引用的变量有：AO、arguments、this
* 对于arguments和this，每个函数都有自己独有的arguments和this，且不进行链式查找
* this对象是在运行时基于函数的执行环境绑定的
* 作用域链应用实例：JQuery中的最外层函数中将window对象作为参数传入，这样可以加快函数内变量的查找速度,其中不传值undefined的原因之一是避免有智障给undefined赋值。

```javascript
(function(window,udefined){})(window);
```


### 2.5 垃圾回收机制

### 2.5.1. 垃圾回收机制用处
 js的设计者为了让没有必要的变量保存在内存中，设计了垃圾回收机制（我们写的任何变量都是需要内存空间的），什么叫没有必要的变量？也就是说你不在需要这个变量的时候它就会被销毁？那么你肯定会问js怎么知道那些变量是我们不需要的哪些是我们需要的。所以js为了知道哪些变量需要保存下来，哪些不需要保存下来，会进行一些判断。接下来我们就一起看看

### 2.5.2 回收机制规则
 1. 在js中定义的全局变量是不会被销毁的，因为我们随时都可能会用到这个变量，所以不能被销毁。
 2. 但是在函数中定义的变量就不一定了，而且由于在函数的定义的变量的生命周期在执行完这个函数就销毁的原因，自然就保存不了上一次的值。
  * 但是并不是说函数就真的保存不了上一次的值，因为有的时候我们确实需要上一次的值，所以js判断是否需要保存上一次变量的值的时候就会遵守这样的一个规则。
  * 规则：如果这个函数有被外部的变量引用就不会销毁（这句话说的不够准确，下面代码会一步一步解释），否则销毁
  * 可以比较下面两个例子

```javascript
//例一
function a(){
    var b = 0;
    return function(){
        b ++;
        console.log(b);
    }
}

a()();//1
a()();//1


//例二
function a(){
    var b = 0;
    return function(){
        b ++;
        console.log(b);
    }
}
//此处其实就是使用了闭包

var d = a();//函数a的执行执行完成后，其活动对象并未被销毁,因为匿名函数的作用域链仍然在引用这个活动对象
d();//1
d();//2
```

4. 总结：
  + 1、如果一个对象不被引用，那么这个对象就会被GC回收；
  + 2、如果两个对象互相引用，但是没有被第3个对象所引用，那么这两个互相引用的对象也会被回收。

[参考文章](http://www.cnblogs.com/pssp/p/5211637.html 'GC')

### 2.5.3 浏览器常用的垃圾回收机制



### 2.5 闭包

### 2.5.1. 闭包
1. 闭包是指有权访问另一个函数作用域中变量的函数。
2. 作用域链是理解闭包的关键；
 
    ```javascript
    //闭包计数器例子
    //这样其他人就无法访问到counter,可以解决变量污染的问题
    var count=(function(){
        var counter=0;
        return function(){
        return ++counter;
            
        }
    })();
    console.log(count());//1
    console.log(count());//2

    ```

3. 利用闭包创建-个人命名空间

    ```javascript
    var wjj={};//个人命名空间
    wjj.count=(function(){
        var counter=0;
        return function(){
        return ++counter;
            
        }
    })();
    console.log(wjj.count());//1
    console.log(wjj.count());//2

    ```
    
### 2.5.2. 闭包中的this

```javascript
var name="window"; 
var obj={
    name :"obj",
     getName: function(){
         var that=this;
         return function(){
             return that.name;
        }
    }
}
console.log(obj.getName()());//obj
```

1. 此例子中涉及到this的特点：this是运行时基于函数的执行环境绑定的；
2. this arguments均存在这样的问题，在闭包中，要注意将其保存在闭包能访问的变量中

## 三、apply与call及bind的用法意义及区别

1. apply与call都是改变上下文中的this并立即执行这个函数，(调用一个对象的一个方法，以另一个对象替换当前对象)对于apply和call两者在作用上是相同的，但两者在参数上有区别的。对于第一个参数意义都一样，都是要传入给当前对象的对象;
但对第二个参数：apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。

* 如 `func.call(func1,var1,var2,var3)`对应的apply写法为：`func.apply(func1,[var1,var2,var3])` ,同时使用apply的好处是可以直接将当前函数的arguments对象作为apply的第二个参数传入

```javascript

//例一
 function Obj(){
    this.value="对象！";
}
var value="global 变量";
function Fun1(){
    alert(this.value);
}
window.Fun1();   //global 变量
Fun1.call(window);  //global 变量
Fun1.call(document.getElementById('myText'));  //input text
Fun1.call(new Obj());   //对象！

//例二
var func=new function(){
    this.a="func"
}
 var myfunc=function(x){
  var a="myfunc";
  alert(this.a);
  alert(x);
}
 myfunc.call(func,"var");
//弹出 func var

//例三
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //11
    }
}
var b = a.fn;
b.apply(a,[10,1]);

```

2. bind同样可以改变对象的指向，但实际上bind方法返回的是一个修改过后的函数，并不像apply和call会立即执行。

```javascript

var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
var c = b.bind(a);
console.log(c);
c();

```

3. 总结 call和apply都是改变上下文中的this并立即执行这个函数，bind方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加，这是它们的区别，根据自己的实际情况来选择使用

