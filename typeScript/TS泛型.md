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
   
  * 要求:传入的参数和返回的参数一致


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
  
### 6.5 泛型工具类型
    
  1. typeof
  typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，

  2. keyof
  keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

  在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
  为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。
  其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 `keyof { [x: string]: Person } `的结果会返回 string | number。


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
  `Partial<T>` 将类型的属性变成可选

  Required
  Required将类型的属性变成必选

  Readonly
  `Readonly<T>` 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

  Pick
  `Pick<T, K extends keyof T>`从某个类型中挑出一些属性出来

  Record
  `Record<K extends keyof any, T>` 的作用是将 K 中所有的属性的值转化为 T 类型。

  ReturnType
  用来得到一个函数的返回值类型

  Exclude
  `Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。

  Extract
  `Extract<T, U>` 的作用是从 T 中提取出 U。

  Omit
  `Omit<T, K extends keyof any>` 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。


NonNullable<T> - 用于从类型T中去除undefined和null类型
 
InstanceType<T> - 获取构造函数的实例类型
