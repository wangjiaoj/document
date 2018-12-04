## 那些年踩过的坑

     
### 一、正则表达式的贪婪，懒惰，独占模式


### 二、Input Type=number
* 存在的bug是输入非数字,会无法取得输入框的值,在不同版本的chrome中,表现状况也不一样,有的是连小数点也会无法获取输入框值,有的则不包括小数点。可能导致的问题：无法对输入结果进行正确的验证。
### 三、关于H5中新控件机制
开发者工具里面设置show shadow dom就可以查看这些html5控件的内部实现 
其实这些控件的实现 和react之类的组件是一样的,应该是react之类的再走这个标准路线 只是实现方式不一样 
input就是标签名  value  type就是组件的props  像数字控件之类的对value值的类型就有要求了 然后一起传递到组件自己内部
估计是type类型不一样  内部返回的html和行为也不一样
vue，angular就是直接把自己的组件标签写入到浏览器的页面里面了  
从这个层面理解vue的组件其实就像写一些像input这类带行为和特殊属性的控件  它不包含子元素
像div这种就是纯容器了 内部是一个slot 可以继续存放任意组件  然后可以嵌套 
vue也使用slot机制
### 四、setTimeoout和setInterval
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

### 五、Javascript:void(0)和#
* Javascript:void(0),其中void(0)可以阻止跳转到其他页面.后面如果跟一个有效id,就会定位到它的位置,如果单纯就是一个#,则会定位到页面top位置

### 六、关于换行的问题:
主要涉及到三个属性white-space;word-break;word-wrap;
* White-space:属性用于设置如何处理元素中的空白.
  +  normal :默认值,空白会被浏览器忽略.
  +  Pre:空白会被浏览器保留,其行为方式类似于HTML中的<pre>标签.
  +  Nowrap:文本不会换行,文本会在同一行上继续,直到遇到<br>标签为止.
  +  Pre-wrap:保留空白符序列,但是正常的进行换行.
  +  Pre-line:合并空白符序列,但是保留换行符.
  +  Inheri:从父元素继承.
* Word-break:
  + Normal:使用浏览器默认的换行规则.
  + Break-all:允许在单词内换行.
  + Keep-all:只能在半角空格或连字符处换行.
* Word-wrap:
  + Normal:只在允许的断字点换行(浏览器保持默认处理).
  + Break-word:在长单词或URL地址内部进行换行.
创建几种使用场景:
固定长度,超过长度显示...(需要设置white-space:nowarp,保证不换行);
使用连续的英文字符或数字时,超过设定的宽度:(设置word-break:break-all或者word-warp:break-word;区别在于允许一个单词换行和将一个完整单词放在下一行)
 


 


















	
