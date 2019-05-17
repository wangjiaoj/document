# JS代码规范

## 一、注释
* 使用 // 作为单行注释。在评论对象上面另起一行使用单行注释。在注释前插入空行。

## 二、命名规范

* 使用驼峰式命名对象、函数和实例
* 使用帕斯卡式命名构造函数或类(大写开头)
* 给函数命名

```javascript
var log=function log(msg) {
}
```

* 如果文件导出一个类，文件名应该与类名完全相同

## 三、jQuery

使用 $ 作为存储 jQuery 对象的变量名前缀。

```javascript
// bad
var sidebar = $('.sidebar');

// good
var $sidebar = $('.sidebar');
```
缓存 jQuery 查询。