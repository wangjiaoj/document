#　ES2015以及后续一些新的用法
2015年6月正式发布ES6，也称为ES2015，此后的每一年都会进行部分内容进行修订并在6月发布对应年号的ES版本，比如ES2016~ES2020。ES2020是ECMAScript语言规范的第11版，也被称为es11。
 


## ES2020
[ES2020](https://www.jianshu.com/p/3e59df36342a)
* 可选链操作符 `?.` ,注意：可选链只能用于访问属性，不能用来被赋值。
* 链合并运算符 `??`,它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。
与链判断运算符`?.`配合使用,ex：`const userName = list?.info?.base?.userName ?? 'userName';`
* import()函数，支持动态加载模块
 import()函数返回一个Promise对象，加载模块成功以后，这个模块会作为一个对象，当作then回调的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
 ```javascript
 import(`./home.js`)  // home.js中export const export1 = ''; ....
  .then(({export1, export2})=> 
    // 加载成功的回调
  })
  .catch(err => {
    // 加载失败的回调
  });
```


## ES2021
