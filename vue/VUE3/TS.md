# TS实践

## 一、注意问题
1. TS上的类型声明type都要使用小写
2. 在TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能
```javascript
function buildName(firstName: string='A', lastName?: string): string {
  if (lastName) {
    return firstName + '-' + lastName
  } else {
    return firstName
  }
}
 
```
3. 参考文章
[走近Ts，用了爽，用后一直爽（二)](https://segmentfault.com/a/1190000038540091)
 [Vue3+TypeScript？看这一篇就够了](https://blog.csdn.net/qq_40280582/article/details/112444461)

[TS报错对照表](https://blog.csdn.net/weixin_42659625/article/details/81002985)

4. TS的第三方全局变量定义
```javascript
declare global {
    interface Window { MyNamespace: any; }
}
window.MyNamespace = window.MyNamespace || {};
```

5. Typescript 声明文件中的 `declare global` 和 普通 `declare` 区别 

在 `d.ts` 声明文件中，任何的`declare` 默认就是 `global` 的了，所以你在 `d.ts` 文件中是不能出现 `declare global` 的。只有在模块文件中的定义，如果想要全局就使用 `declare global`
[`declare global` 和 普通 `declare`](https://segmentfault.com/q/1010000016173914)

6. 直接引用js文件中的函数的时候,可能会报错文件没有类型 
>Could not find a declaration file for module '/xx/xx.js' implicitly has an 'any' type

解决方案：
 On the other hand, if you don't care about the typings of external libraries and want all libraries without typings to be imported as any, you can add this to a file with a .d.ts extension:
 如果你不关心一用文件的type,可以在`.d.ts` 文件中配置如下：
>declare module '*';
[stackoverflow上的问答](https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam)

## 二、基础类型
1. boolean
2. number
3. string 
4. undefined 
5. null
6. 数组
    有两种方式可以定义数组：
    * 元素类型后面接上[]，表示由此类型元素组成的一个数组
    > const c: number[] = [1, 2, 3];
    * 数组泛型，Array<元素类型>
    > const d: Array<number> = [1, 3];
7. enum 枚举 
8. any 
9. void
10. object
11. 联合类型（Union Types）
    表示取值可以为多种类型中的一种
12. 类型断言
    类型断言(Type Assertion): 可以用来手动指定一个值的类型
    通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 
    类型断言有两种形式。 其一是“尖括号”语法, 另一个为 as 语法
    语法:
        方式一: <类型>值
        方式二: 值 as 类型  tsx中只能用这种方式

    ```javascript
    /* 需求: 定义一个函数得到一个字符串或者数值数据的长度 */
    function getLength(x: number | string) {
        if ((<string>x).length) {
            return (x as string).length
        } else {
            return x.toString().length
        }
    }
    console.log(getLength('abcd'), getLength(1234))
    ```

13. 类型推断
    类型推断: TS会在没有明确的指定类型的时候推测出一个类型
    有下面2种情况: 1. 定义变量时赋值了, 推断为对应的类型. 2. 定义变量时没有赋值, 推断为any类型
    ```javascript
    /* 定义变量时赋值了, 推断为对应的类型 */
    let b9 = 123 // number
    // b9 = 'abc' // error

    /* 定义变量时没有赋值, 推断为any类型 */
    let b10  // any类型
    b10 = 123
    b10 = 'abc'
    ```
## 三、接口
1. 定义
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
接口类型的对象
    多了或者少了属性是不允许的
    可选属性: ?
    只读属性: readonly

2. 函数类型
   接口也可以描述函数类型
3. 类类型
  TypeScript 也能够用它来明确的强制一个类去符合某种契约
  * 类实现时候使用implements关键字
  * 一个类可以实现多个接口
4. 接口继承接口
和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
* extends
* 一个接口可以继承多个接口 

## 四、类
### 4.1. 修饰符
1. 默认为 public公共
public 在当前类里面，子类，类外面都可以访问
2. 私有 private
private 在当前类内部可访问，子类，类外部都无法访问。
3. 受保护的修饰符 protected
protected 在当前类和子类内部可以访问，类外部无法访问
4. readonly 修饰符

## 五、函数
1. 定义
> function cc(): void {}
2. 函数重载

## 六、泛型
指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。
泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持。
要求:传入的参数和返回的参数一致

### 6.1. 函数泛型
```JavaScript
function getDate<T>(value: T): T {
  return value;
}
console.log(getDate<number>(123));
```

tips: 这里的T可改成其他任意值但定义的值，和传入的参数以及返回的参数是一样的,一般默认写法是T，也是业内规范的选择。

### 6.2. 类的泛型
```JavaScript
class MinClass<T> {
  public list: T[] = [];
  //添加
  add(value: T): void {
    this.list.push(value);
  }
  
  //求最小值
  min(): T {
    //假设这个值最小
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
    //比较并获取最小值
    minNum = minNum < this.list[i] ? minNum : this.list[i];
    }
    return minNum;
  }
}
//实例化类 并且指定了类的T的类型是number
let minClass = new MinClass<number>(); 
minClass.add(23);
minClass.add(5);
minClass.add(2);
console.log(minClass.min());
 //实例化类 并且指定了类的T的类型是string，则其方法的传参和返回都是string类型
let minClass2 = new MinClass<string>();
minClass2.add("23");
minClass2.add("5");
minClass2.add("2");
console.log(minClass2.min());
```

### 6.3. 接口的泛型

1. 第一种写法

2. 第二种写法


## 七、其他

### 7.1  声明文件
  当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
  示例jQuery需要使用 `declare var` 来定义它的类型
  ```javascript
  declare var jQuery: (selector: string) => any;

  jQuery('#foo');
  ```
  一般声明文件都会单独写成一个 `xxx.d.ts` 文件
  很多的第三方库都定义了对应的声明文件库, 库文件名一般为 @types/xxx, 可以在 https://www.npmjs.com/package/package 进行搜索

### 7.2  内置对象
  JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。
  内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

  1. ECMAScript 的内置对象
  * Boolean
  * Number
  * String
  * Date
  * RegExp
  * Error

  2. BOM 和 DOM 的内置对象
  * Window
  * Document
  * HTMLElement
  * DocumentFragment
  * Event
  * NodeList