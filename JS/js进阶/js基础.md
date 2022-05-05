## 一、基础概念
1. 字面量
  字面量就是直接出现在代码中的值
2. 标识符和保留字
标识符就是指名字，比如命名变量，常量，属性名，函数名等。标识符开头可以是字母，下划线_，或者美元符号$，之后可以是字母，下划线，美元符号，或者数字。
3. “use strict”
“use strict” 是ES5中引入的一个指令。“use strict” 指令的目的是指示后面的代码（在脚本或函数中）是严格代码。
[严格模式与非严格模式的区别](https://blog.csdn.net/zhangyingli/article/details/108828556)
4.  声明
关键字 const、let、var、function、class、import 和 export 

## 二、数组
### 2.1 创建数组
有几种方法可以创建数组。
1. 数组字面量
2. 在一个可迭代对象上使用 … 展开运算符
“展开”操作符适用于任何可迭代对象。展开操作符是创建数组（浅）拷贝的一种简便方法.
3. Array() 构造函数
4. Array.of() 和 Array.from() 工厂方法
Array.from 是 ES6 中引入的另一种数组工厂方法。它期望可迭代或类数组的对象作为其第一个参数，并返回一个包含该对象元素的新数组。
        ```javascript
        
        ```     
## 2.2  数组方法
[数组](https://blog.csdn.net/zhangyingli/article/details/109133318)

### 2.2.1 数组迭代方法
forEach()

map()

filter()

find() 和 findIndex()

every() 和 some()

reduce() 和 reduceRight()

### 2.2.2 使用 flat() 和 flatMap() 展平数组

### 2.2.3 使用 concat() 连接数组

### 2.2.4 栈和队列方法 push, pop(), shift(), unshift()

### 2.2.5 子数组方法 slice(), splice(), fill(), copyWithin()
        

### 2.2.6 数组查找和排序方法

indexOf() 和 lastIndexOf()
includes()

sort()
reverse()
 