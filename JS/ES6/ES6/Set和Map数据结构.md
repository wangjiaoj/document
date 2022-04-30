
## 七. Set和Map数据结构
## 7.1. Set
### 7.1.1. 概念
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。
向set加入值的时候，不会发生类型转换，内部判定值是否相等的算法类似于object.is()

* add()

* Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

String具有 iterable 接口吗？好像 new Set("abcdf")

2. Set结构的实例属性。
  * Set.prototype.constructor：构造函数，默认就是Set函数。
  * Set.prototype.size：返回Set实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

3. Set实例的四个操作方法。
  * add(value)：添加某个值，返回Set结构本身。
  * delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  * has(value)：返回一个布尔值，表示该值是否为Set的成员。
  * clear()：清除所有成员，没有返回值。
4. Set结构的实例有四个遍历方法，可以用于遍历成员。
  * keys()：返回键名的遍历器
  * values()：返回键值的遍历器
  * entries()：返回键值对的遍历器
  * forEach()：使用回调函数遍历每个成员
由于Set结构没有键名，只有键值，或者说键名和键值是同一个值，所以key方法和value方法的行为完全一致。
```javascript
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);}
// red// green// blue
for (let item of set.values()) {
  console.log(item);}
// red// green// blue
for (let item of set.entries()) {
  console.log(item);}
// ["red", "red"]// ["green", "green"]// ["blue", "blue"]
```

## 7.2. WeakSet
WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。
1. WeakSet的成员只能是对象，而不能是其他类型的值。
2. WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。


## 7.3. Map
ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。如果对同一个键多次赋值，后面的值将覆盖前面的值。注意，只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
```javascript
var map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
```

1. Map结构的实例有以下属性和操作方法。
（1）size属性
size属性返回Map结构的成员总数。
（2）set(key, value)
set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是Map本身，因此可以采用链式写法。
（3）get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。
（4）has(key)
has方法返回一个布尔值，表示某个键是否在Map数据结构中。
（5）delete(key)
delete方法删除某个键，返回true。如果删除失败，返回false。
（6）clear()
clear方法清除所有成员，没有返回值。
2. 遍历方法
Map原生提供三个遍历器生成函数和一个遍历方法。
keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历Map的所有成员。
需要特别注意的是，Map的遍历顺序就是插入顺序。

## 7.4. WeakMap
WeakMap与Map在API上的区别主要是两个，一是没有遍历操作（即没有key(). values()和entries()方法），也没有size属性；二是无法清空，即不支持clear方法。这与WeakMap的键不被计入引用. 被垃圾回收机制忽略有关。因此，WeakMap只有四个方法可用：get(). set(). has(). delete()。
