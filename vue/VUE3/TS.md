# TS实践

## 一、注意问题
1. TS上的类型声明type都要使用小写
2. 参考文章
[走近Ts，用了爽，用后一直爽（二)](https://segmentfault.com/a/1190000038540091)
 [Vue3+TypeScript？看这一篇就够了](https://blog.csdn.net/qq_40280582/article/details/112444461)

[TS报错对照表](https://blog.csdn.net/weixin_42659625/article/details/81002985)

## 二、基础类型
1. boolean
2. number
3. string 
4. undefined 
5. null
6. 数组
    有两种方式可以定义数组：
    * 元素类型后面接上[]，表示由此类型元素组成的一个数组
    * 数组泛型，Array<元素类型>
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
1. 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
接口类型的对象
    多了或者少了属性是不允许的
    可选属性: ?
    只读属性: readonly

2. 函数类型：接口也可以描述函数类型
3. 类类型：TypeScript 也能够用它来明确的强制一个类去符合某种契约
  * 类实现时候使用implements关键字
  * 一个类可以实现多个接口
4. 接口继承接口
和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
* extends
* 一个接口可以继承多个接口 
## 四、类
## 五、函数
## 六、泛型

## 七、其他
### 7.1  声明文件
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
需要使用 declare var 来定义它的类型
示例jQuery
 ```javascript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
 ```
一般声明文件都会单独写成一个 xxx.d.ts 文件
很多的第三方库都定义了对应的声明文件库, 库文件名一般为 @types/xxx, 可以在 https://www.npmjs.com/package/package 进行搜索
### 7.2  内置对象
JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。
内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

1. ECMAScript 的内置对象
Boolean
Number
String
Date
RegExp
Error

2. BOM 和 DOM 的内置对象
Window
Document
HTMLElement
DocumentFragment
Event
NodeList