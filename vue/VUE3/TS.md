# TS实践
 
## 一、注意问题
### 1.1 TS上的类型都要使用小写
  1. JavaScript 中以下类型被视为原始类型：string、boolean、number、bigint、symbol、null 和 undefined。
  2. 原始类型 number、string、boolean、symbol容易混淆的首字母大写的 Number、String、Boolean、Symbol 类型，后者是相应原始类型的包装对象，姑且把它们称之为对象类型
  从类型兼容性上看，原始类型兼容对应的对象类型，反过来对象类型不兼容对应的原始类型
  3. 尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。 object 和Object,{}存在差别

### 1.2 可选参数

  1. 在TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能
  ```javascript
  function buildName(firstName: string='A', lastName?: string): string {
    if (lastName) {
      return firstName + '-' + lastName
    } else {
      return firstName
    }
  }
  
  ```
### 1.3 索引签名
在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
```javascript
interface StringArray { 
  // 字符串索引 -> keyof StringArray => string | number 
  [index: string]: string;
}

interface StringArray1 { 
  // 数字索引 -> keyof StringArray1 => number 
  [index: number]: string;
}
```
当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。


### 1.4 其他
  1. 参考文章
  [非常全面的typescript](https://mp.weixin.qq.com/s/lkEKHBU4dqJ_9qbJJnBiPA)
  [走近Ts，用了爽，用后一直爽](https://segmentfault.com/a/1190000031793196)
  [Vue3+TypeScript？看这一篇就够了](https://blog.csdn.net/qq_40280582/article/details/112444461)

  [TS报错对照表](https://blog.csdn.net/weixin_42659625/article/details/81002985)

  2. TS的第三方全局变量定义
  ```javascript
  declare global {
      interface Window { MyNamespace: any; }
  }
  window.MyNamespace = window.MyNamespace || {};
  ```

  3. Typescript 声明文件中的 `declare global` 和 普通 `declare` 区别 

  在 `d.ts` 声明文件中，任何的`declare` 默认就是 `global` 的了，所以你在 `d.ts` 文件中是不能出现 `declare global` 的。只有在模块文件中的定义，如果想要全局就使用 `declare global`
  [`declare global` 和 普通 `declare`](https://segmentfault.com/q/1010000016173914)

  4. 直接引用js文件中的函数的时候,可能会报错文件没有类型 
  >Could not find a declaration file for module '/xx/xx.js' implicitly has an 'any' type

  解决方案：
  On the other hand, if you don't care about the typings of external libraries and want all libraries without typings to be imported as any, you can add this to a file with a .d.ts extension:
  如果你不关心一用文件的type,可以在`.d.ts` 文件中配置如下：
  >declare module '*';
  [stackoverflow上的问答](https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam)

## 二、基础类型

## 2.1 基础类型
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
      表示取值可以为多种类型中的一种，使用 | 分隔每个类型。

### 2.2 类型断言
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

### 2.3 类型推断
  1. 类型推断: TS会在没有明确的指定类型的时候推测出一个类型;
    有默认值或初始化值的才能类型推断,在 TypeScript 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。
    示例：
    ```javascript
    /* 定义变量时赋值了, 推断为对应的类型 */
    let b9 = 123 // number
    // b9 = 'abc' // error

    /* 定义变量时没有赋值, 推断为any类型 */
    let b10  // any类型
    b10 = 123
    b10 = 'abc'
    ```
 
  2. 非空断言

  3. 确定赋值断言

### 2.4 字面量类型
  1. TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型

  2. 定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个联合类型
  几个组合成联合变量之后，这玩意儿是不是有点像枚举？
  const情况下的缺省类型推断就是按照字面量类型来推断的
  3. 类型拓宽(Type Widening)
  4. 类型缩小(Type Narrowing)


### 2.5 类型别名
  1. type 类型别名用来给一个类型起个新名字。类型别名常用于联合类型。
  2. 交叉类型
    交叉类型是将多个类型合并为一个类型。使用&定义交叉类型。
    交叉类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型
    ```javascript
    type IntersectionType = { id: number; name: string; } & { age: number }; 
    const mixed: IntersectionType = {  
      id: 1,   
      name: 'name',  
      age: 18
    }
    ```



## 三、接口
### 3.1. 定义
  在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
  接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
  接口一般首字母大写。
  接口类型的对象
      多了或者少了属性是不允许的
      可选属性: ?
      只读属性: readonly
  ```javascript
  interface Person {  
      name: string;  
      age?: number; // 这里真实的类型应该为：number | undefined 
      [propName: string]: string | number | undefined;
      //索引签名
  }

  let tom: Person = {  
      name: 'Tom',   
      age: 25,   
      gender: 'male'
  };
  ```


### 3.2. 函数类型
   接口也可以描述函数类型
   ```javascript
    interface SetPoint { 
      (x: number, y: number): void;
    }
   ```
### 3.3. 类类型
  TypeScript 也能够用它来明确的强制一个类去符合某种契约
  * 类实现时候使用implements关键字
  * 一个类可以实现多个接口
  ```javascript
  interface Animals {
    name: string;
    eat(): void;
  }

  class Dogs implements Animals {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    eat() {}
  }
  ```

### 3.4. 接口继承
  和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
  * extends
  * 一个接口可以继承多个接口 
  ```javascript
  interface Dog {
    eat(): void;
  }

  interface Persons extends Dog {
    work(): void;
  }

  class Cat {
    code() {
      console.log("猫在敲代码");
    }
  }

  //可继承类后再实现接口
  class SuperMan extends Cat implements Persons {
    eat(): void {
      console.log(1);
    }
    work(): void {
      console.log(2);
    }
  }
  let superMan = new SuperMan();
  superMan.code();
  ```

### 3.5 接口(interface)与类型别名（type）的区别
  实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。
  1. 概念 
  * TypeScript 的核心原则之一是对值所具有的结构进行类型检查。而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
  * type(类型别名)会给一个类型起个新名字。type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。
 2. Objects / Functions 描述对象或函数的类型，但是语法不同
    ```javascript
    //描述函数的类型
    interface SetPoint { 
      (x: number, y: number): void;
    }
    type SetPoint = (x: number, y: number) => void;
    ```

 3. 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
 4. 接口可以定义多次,类型别名不可以
    接口可以定义多次，会被自动合并为单个接口。
 5. 两者的扩展方式不同
    接口的扩展就是继承，通过 extends 来实现。
    类型别名的扩展就是交叉类型，通过 & 来实现。


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
### 6.1 概念
  1. 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。
  泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持。
  函数、类、接口均可使用泛型
  ```JavaScript
  //函数泛型示例
  function identity <T, U>(value: T, message: U) : T {  
    console.log(message);  
    return value;
  }
  console.log(identity<Number, string>(68, "Semlinker"));
  //除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号
  console.log(identity(68, "Semlinker"));
  ```
  其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

  K（Key）：表示对象中的键类型；
  V（Value）：表示对象中的值类型；
  E（Element）：表示元素类型。
   
  ** 要求:传入的参数和返回的参数一致


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


  区分函数和类中函数方法:也许是key直接就(),还是()前面有名字？？

### 6.3. 接口的泛型

  1. 第一种写法
  ```javascript
  interface ConfigFn {
    //规范参数类型,返回值类型
    <T>(value: T): T;
  }

  let getData: ConfigFn = function <T>(value: T): T {
    return value;
  };

  console.log(getData<string>("z11"));
  ```

  2. 第二种写法
  ```javascript
  interface ConfigFn<T> {
    //参数类型 ，返回值类型
    (value: T): T;
  }

  //接口方法
  function getData<T>(value: T): T {
    return value;
  }

  //使用接口
  let myGetDate: ConfigFn<string> = getData;
  console.log(myGetDate("3"));
  ```

### 6.4. 泛型约束
  通过extends增加约束示例:
  ```javascript
  interface Sizeable {
    size: number;
  }
  function trace<T extends Sizeable>(arg: T): T {
    console.log(arg.size);  
    return arg;
  }
  ```
  其他进行泛型约束的方式见7.3 

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



### 7.3 泛型工具类型
    
  1. typeof
  typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，

  2. keyof
  keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

  在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
  为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。
  其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 keyof { [x: string]: Person } 的结果会返回 string | number。


  3. in
  in 用来遍历枚举类型：


  4. infer
  在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

  5. extends
  有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

  6. 索引类型
  通过 索引类型查询和 索引访问 操作符

  7. 映射类型
  根据旧的类型创建出新的类型, 我们称之为映射类型

  8. 内置的工具类型

  Partial
  Partial<T> 将类型的属性变成可选

  Required
  Required将类型的属性变成必选

  Readonly
  Readonly<T> 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

  Pick
  Pick 从某个类型中挑出一些属性出来

  Record
  Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

  ReturnType
  用来得到一个函数的返回值类型

  Exclude
  Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。

  Extract
  Extract<T, U> 的作用是从 T 中提取出 U。

  Omit
  Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。
