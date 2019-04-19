## chrome
 chrome浏览器默认设置能显示的最小字体是12px,也就是说如果给css样式小于12px,那么还会显示12px.这需要手动设置才行.但浏览器用户一般都不会去设置这个.所以让字体不要小于12像素,否则chrome浏览器没法显示。

## 关于IE代码兼容

### 一、基本兼容手段
 1.1、babel打包
    webpack:ES3ify-loader

 1.2、引入profill来模拟低版本浏览器可能不存在的新API

 1.3、注意css降级和一些超低版本浏览器的css hack

### 二、IE11 中需要特别注意的代码兼容性问题
#### 2.1、css3兼容

 IE11对flex布局的支持比较差，需要兼容IE11的时候，慎重使用flex布局
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### 2.2、 关于文本超长显示。。。
  需要注意增加word-wrap:break-word;

### 三、IE8及其以上版本中需要特别注意的代码兼容性问题
* 1、css3慎重使用
* 2、placeholder在IE8不支持需要模拟
* 3、IE9因为安全性特殊设计，在上传组件上会比较特别
* 4、IE8对base64的解码有限制，如果图片进行64位编码后大于32K，则超过32K的部分不能被解码。
 
### 四、IE版本兼容
4.1.条件注解的支持
[IE10以及以上版本，将不再支持条件注解](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/hh801214(v=vs.85))
IE10以及以上版本，将不再支持条件注解，那么在IE10中使用下面这个判断是无效的。IE10及其以上的这个特性并不会影响IE仿真下的低版本IE这一功能。
```javascript
<!--[if IE]>
            <style type="text/css">
                body{ background: red;}
            </style>
<![endif]-->
```
解决方案
4.1.1 方法一：使用IE兼容性标记X-UA-Compatible,设置IE=EmulateIE9属性指示浏览器采用IE9渲染技术,在html网页的head里加入上面的元标记
```javascript
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
```

4.1.2 方法二：使用媒体查询语句+-ms-high-contrast属性
CSS的媒体查询语句(media query)是一种高级的CSS条件语句，它能根据一些属性和属性值计算判断CSS是否可以生效。在这里，我们要使用一个IE10/11独有的属性，它就是-ms-high-contrast，只有IE10/11实现了这个属性，它可以有两个值active或none，使用下面的媒体查询语句：
```javascript
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
/* IE10+ CSS styles go here */
}
```
火狐浏览器、谷歌浏览器不能识别这个属性，所以不会执行这个查询语句里的CSS，从而实现了条件性执行的效果。

4.1.3 方法三：使用Javascript判断浏览器的类型
先用JavaSCript判断是否是IE浏览器，如果是，就在页面的<html>标记上添加一个“ie”的类名：
```javascript
var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf('MSIE ');
var new_ie = ua.indexOf('Trident/');
if ((old_ie > -1) || (new_ie > -1)) {
    ms_ie = true;
     alert("IE浏览器")
}
if ( ms_ie ) {
   document.documentElement.className += " ie";
}
//有了这个标志性css class后，我们就可以在CSS里区别性的编写css代码了。
.testClass{
    /*这里写通用的css*/ 
}

.ie .testClass{
    /*这里写专门针对IE的css*/
}

