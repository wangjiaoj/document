
## 十、ready与load执行方式区别

### 10.1 JQuery中使用的有：

```javascript
   $(function(){      })
   $(document).ready(function(){   })
   $( window ).on( "load", function(){   })
//其中$(function(){})是$(document).ready(function(){})的简写形式
```

JavaScript 中的以下代码 :

```javascript
Window.onload = function (){
    // 代码 
} 
//等价于 JQuery 代码如下：
$(window).load(function (){
  // 代码 
}); 


//但是二者也有不同

Window.onload = function (){ } //只能写一次  
$(window).load(function (){ }); //可以写多次



 //document ready
$(document).ready(function(){
    ...code...
})
//document ready 简写
$(function(){
    ...code...
})
//document load
$(document).load(function(){
    ...code...
})
```

### 10.2 ready与load

1. ready与load谁先执行：
    ready与load那一个先执行，那一个后执行？答案是ready先执行，load后执行。
2. DOM文档加载的步骤：

* 要想理解为什么ready先执行，load后执行就要先聊一下DOM文档加载的步骤：
  + (1) 解析HTML结构。
  + (2) 加载外部脚本和样式表文件。
  + (3) 解析并执行脚本代码。
  + (4) 构造HTML DOM模型。//ready
  + (5) 加载图片等外部文件。
  + (6) 页面加载完毕。//load
* 从上面的描述中大家应该已经理解了吧，ready在第（4）步完成之后就执行了。但是load要在第（6）步完成之后才执行。

3. ready事件：ready事件在DOM结构绘制完成之后就会执行。这样能确保就算有大量的媒体文件没加载出来，JS代码一样可以执行。
4. load事件：load事件必须等到网页中所有内容全部加载完毕之后才被执行。如果一个网页中有大量的图片的话，则就会出现这种情况：网页文档已经呈现出来，但由于网页数据还没有完全加载完毕，导致load事件不能够即时被触发。
5. 总结：

* 相信大家已经了解了ready与load的区别，其实如果页面中要是没有图片之类的媒体文件的话ready与load是差不多的，但是页面中有文件就不一样了，所以还是推荐大家在工作中用ready。
* 简单总结,具体这两者的区别如下：
  + 1.执行时间         window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。         $(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。 
  + 2.编写个数不同       window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个          $(document).ready()可以同时编写多个，并且都可以得到执行 
  + 3.简化写法          window.onload没有简化写法          $(document).ready(function(){})可以简写成$(function(){});
 