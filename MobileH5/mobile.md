## 一、关于移动端的布局方案
移动端常见的布局方案目前主要有两种，一种是rem方案，一种是vw方案，本质上来讲，都是按照移动端设备的宽度比例来做配适的。

## 二、基本概念

### 2.1、基本概念
* rem:css3支持的一个相对长度单位，元素的font-size.即<html>的font-size. 

* vw:css3支持的一个相对长度单位，1vw表示相对于屏幕宽度的1%;

* 物理像素(physical pixel)
物理像素又被称为设备像素，它是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。

* 设备独立像素(density-independent pixel)
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

* CSS像素
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

* 屏幕密度
屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

* 设备像素比(device pixel ratio)
+ 设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：设备像素比 ＝ 物理像素 / 设备独立像素
+ 在Javascript中，可以通过 window.devicePixelRatio 获取到当前设备的dpr。
+ 在css中，可以通过 -webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配。

### 2.2、viewport
    
* 浏览器默认的viewport叫做 layout viewport。它的宽度是大于浏览器可视区域的宽度的。
这个layout viewport的宽度可以通过 document.documentElement.clientWidth 来获取。

* visual viewport表示浏览器可视区域的大小的宽度，可以通过window.innerWidth 来获取。
  移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是ideal viewport。那么怎么才能得到ideal viewport呢？这就该轮到meta标签出场了。

head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。

在苹果的规范中，meta viewport 有6个属性(暂且把content中的那些东西称为一个个属性和值)，如下：

width	设置layout viewport  的宽度，为一个正整数，或字符串"width-device"
initial-scale	设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale	允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale	允许用户的最大缩放值，为一个数字，可以带小数
height	设置layout viewport  的高度，这个属性对我们并不重要，很少使用
user-scalable	是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许
这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

 
 
## rem方案的使用
   在具体使用过程中可以利用
   1、计算scale
   2、计算rem = document.documentElement.clientWidth * dpr / 10

```javascript
        var dpr, rem, scale;
        var docEl = document.documentElement;
        var fontEl = document.createElement('style');
        var metaEl = document.querySelector('meta[name="viewport"]');

        dpr = window.devicePixelRatio || 1;
        rem = docEl.clientWidth * dpr / 10;
        scale = 1 / dpr;

        // 设置viewport，进行缩放，达到高清效果
        metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

        // 设置data-dpr属性，留作的css hack之用
        docEl.setAttribute('data-dpr', dpr);

        // 动态写入样式
        docEl.firstElementChild.appendChild(fontEl);
        fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

        window.dpr = dpr;
        window.rem = rem;
```

    https://www.w3cplus.com/css/vw-for-layout.html
https://www.w3cplus.com/css/viewports.html
https://www.w3cplus.com/css/flex-item-calculate.html
    https://www.cnblogs.com/imwtr/p/9648233.html#s4-1