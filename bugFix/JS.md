## 那些年踩过的坑

     
### 一、正则表达式的贪婪，懒惰，独占模式


### 二、setTimeoout和setInterval
```javascript
//无法直接调用带参函数
function test(arg){console.log(arg)};
var a="xx";
setTimeout(test(a),5000);//会立即执行,而非5s之后执行
//补救方法:
setTimeout(function(){test(a);},5000);
setTimeout(test,5000,a);
```
另外关于setTimeout有两种形式:

```javascript
  setTimeout(code,interval)code是一个字符串
  setTimeout(func,interval,args) func是一个函数.
```

### 三、Javascript:void(0)和#
* Javascript:void(0),其中void(0)可以阻止跳转到其他页面.后面如果跟一个有效id,就会定位到它的位置,如果单纯就是一个#,则会定位到页面top位置


### 四、特殊时间格式转换问题:
1. RFC 3339格式

* 常规时间格式转换为RFC 3339格式：toISOString  。
* RFC 3339格式转换为正常时间格式，chrome支持直接new Date转换,但是ios不支持,会报错。

```javascript
var date = new Date();
date.toISOString();
//RFC 3339 format
//"2019-12-24T12:54:12.000Z"
```

```javascript
   //ios不兼容RFC 3339格式直接new Date转化问题兼容方案
  function formate(date) {
     var e = date.split("T")
       , n = e[0].split("-")
        , i = e[1].split(".000")[0].split(":");
     return parseInt(n[0]) + "/" + parseInt(n[1]) + "/" + parseInt(n[2]) + " " + parseInt(i[0]) + ":" + parseInt(i[1]) + ":" + parseInt(i[2])
 }
 //chrome可以直接new Date转化
 var str = "2019-03-18T10:58:37+08:00";
 var date = new Date(str).toJSON();
```
* Date 实例引用一个具体的时间点。 调用 toJSON() 返回一个 JSON 格式字符串(使用 toISOString())，表示该日期对象的值。默认情况下，这个方法常用于 JSON序列化Date对象。




### 五、小数运算误差问题
Java和JavaScript中计算小数运算时，都会先将十进制的小数换算到对应的二进制，一部分小数并不能完整的换算为二进制，这里就出现了第一次的误差。待小数都换算为二进制后，再进行二进制间的运算，得到二进制结果。然后再将二进制结果换算为十进制，这里通常会出现第二次的误差。

对JavaScript小数计算进行特殊处理

### 六、Number ParseFloat parseInt区别















	
