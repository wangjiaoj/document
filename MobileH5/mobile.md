## 一、关于移动端的布局方案
移动端常见的布局方案目前主要有两种，一种是rem方案，一种是vw方案，本质上来讲，都是按照移动端设备的宽度比例来做配适的。

## 二、基本概念

### 2.1、基本概念
* em:em是相对于父元素的font-size大小计算的，所以也可以用来配适移动端布局，但是因为布局嵌套等，还是建议使用rem布局

* rem:css3支持的一个相对长度单位，元素的font-size.即html标签的font-size. 

* vw:是Viewport's width的简写，是css3支持的一个相对长度单位，1vw表示相对于屏幕宽度（window.innerWidth）的1%;

* 物理像素(physical pixel)：
物理像素又被称为设备像素，它是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。

* 设备独立像素(density-independent pixel)：
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

* CSS像素：
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)。

* 设备像素比(device pixel ratio)：
 + 设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：设备像素比 ＝ 物理像素 / 设备独立像素
 + 在Javascript中，可以通过 window.devicePixelRatio 获取到当前设备的dpr。
 + 在css中，可以通过 -webkit-device-pixel-ratio,-webkit-min-device-pixel-ratio-webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配。
 + 有这样一个参数存在，实际上说明了在移动端设备上，css中的1px可能会不等于物理像素中的1px

    在css中我们一般使用px作为单位，在桌面浏览器中css的1个像素往往都是对应着电脑屏幕的1个物理像素，这可能会造成我们的一个错觉，那就是css中的像素就是设备的物理像素。但实际情况却并非如此，css中的像素只是一个抽象的单位，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的。在为桌面浏览器设计的网页中，我们无需对这个津津计较，但在移动设备上，必须弄明白这点。在早先的移动设备中，屏幕像素密度都比较低，如iphone3，它的分辨率为320x480，在iphone3上，一个css像素确实是等于一个屏幕物理像素的。后来随着技术的发展，移动设备的屏幕像素密度越来越高，从iphone4开始，苹果公司便推出了所谓的Retina屏，分辨率提高了一倍，变成640x960，但屏幕尺寸却没变化，这就意味着同样大小的屏幕上，像素却多了一倍，这时，一个css像素是等于两个物理像素的。其他品牌的移动设备也是这个道理。例如安卓设备根据屏幕像素密度可分为ldpi、mdpi、hdpi、xhdpi等不同的等级，分辨率也是五花八门，安卓设备上的一个css像素相当于多少个屏幕物理像素，也因设备的不同而不同，没有一个定论。
                                
    还有一个因素也会引起css中px的变化，那就是用户缩放。例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。关于这点，在文章后面的部分还会讲到。

    在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css中的px就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2
                   
### 2.2、viewport
    
1、ppk认为，移动设备上有三个viewport： layout viewport，visual viewport，ideal viewport。

* 浏览器默认的viewport叫做 layout viewport。它的宽度是大于浏览器可视区域的宽度的。
这个layout viewport的宽度可以通过 document.documentElement.clientWidth 来获取。
多数手机的layout width都是980.

* visual viewport表示浏览器可视区域的大小的宽度，可以通过window.innerWidth 来获取。

* 现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。

* 再总结一下：ppk把移动设备上的viewport分为layout viewport  、 visual viewport   和 ideal viewport  三类，其中的ideal viewport是最适合移动设备的viewport，ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度(单位用px)，那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。

2、head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是ideal viewport。那么怎么才能得到ideal viewport呢？这就该轮到meta标签出场了。

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度。

在苹果的规范中，meta viewport 有6个属性(暂且把content中的那些东西称为一个个属性和值)，如下：
属性| 值
-|-
width | 设置layout viewport  的宽度，为一个正整数，或字符串"device-width"|
initial-scale|	设置页面的初始缩放值，为一个数字，可以带小数|
minimum-scale| 允许用户的最小缩放值，为一个数字，可以带小数|
maximum-scale|	允许用户的最大缩放值，为一个数字，可以带小数|
height|	设置layout viewport  的高度，这个属性对我们并不重要，很少使用|
user-scalable|	是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许|
这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。



问题：如果width 和 initial-scale=1同时出现，并且还出现了冲突呢？
width=400表示把当前viewport的宽度设为400px，initial-scale=1则表示把当前viewport的宽度设为ideal viewport的宽度，那么浏览器到底该服从哪个命令呢？是书写顺序在后面的那个吗？不是。当遇到这种情况时，浏览器会取它们两个中较大的那个值。例如，当width=400，ideal viewport的宽度为320时，取的是400；当width=400， ideal viewport的宽度为480时，取的是ideal viewport的宽度。 


3、关于缩放以及initial-scale的默认值

initial-scale=1则表示把当前viewport的宽度设为ideal viewport的宽度。

首先我们先来讨论一下缩放的问题，缩放是相对于ideal viewport来缩放的，缩放值越大，当前viewport的宽度就会越小，反之亦然。例如在iphone中，ideal viewport的宽度是320px，如果我们设置 initial-scale=2 ，此时viewport的宽度会变为只有160px了，这也好理解，放大了一倍嘛，就是原来1px的东西变成2px了，但是1px变为2px并不是把原来的320px变为640px了，而是在实际宽度不变的情况下，1px变得跟原来的2px的长度一样了，所以放大2倍后原来需要320px才能填满的宽度现在只需要160px就做到了。因此，我们可以得出一个公式：

    visual viewport宽度 = ideal viewport宽度  / 当前缩放值

    当前缩放值 = ideal viewport宽度  / visual viewport宽度
  
 
[参考文章-移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.htmll)

[参考文章-翻译的ppk关于vieport的文章]( https://www.w3cplus.com/css/viewports.html)

## 三、rem方案的使用

根据上面的在具体使用过程中
 *  1、设置meta viewport标签 -- 判断页面上是否存在meta标签， 确保meta[name="viewport"]存在。
 ```javascript
  var docElem = document.documentElement,
        metaElem = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        // 将页面分为10块
        blocks = 10,
        // 需要限制的最小宽度
        defaultMinWidth = 320,
        // 需要限制的最大宽度
        defaultMaxWidth = 540,
            // 计算的基准值
        calcMaxWidth = 9999999;

     if (!metaElem) {
        metaElem = initMetaViewport();
    }
    function initMetaViewport() {
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width,initial-scale=1,user-scalable=no');
        //因为mata标签中的width 和 initial-scale同时设置的情况下会取最大值，所以实际上只要设置一个scale即可
        document.head.appendChild(meta);
        return meta;
    }
       
```

 * 2、设置meta标签中的scale
```javascript
 // 设置缩放
    function setScale(dpr) {
        metaElem.setAttribute('content', 'initial-scale=' + 1 / dpr + ',maximum-scale=' + 1 / dpr + ',minimum-scale=' + 1 / dpr + ',user-scalable=no');
    }
  ```
 *  3、计算rem 
   公式： rem = document.documentElement.clientWidth * dpr / blocks;
   blocks的值一般设置为10即可，也可以自己设置成其他值；
   如果已经先设置了scale，那么这个时候直接取docElem.clientWidth/blocks即可;
   如果有进行页面宽度最大最小配适的需求：结合css中的media查询设置页面body的最大最小宽度，在font-size计算过程中根据设置的页面最大最小的参数进行配适。

 ```javascript
   // 设置docElem字体大小
    function setFontSize() {
        var clientWidth = docElem.clientWidth;

        clientWidth = Math.max(clientWidth, defaultMinWidth * dpr)

        // 调整计算基准值
        if (calcMaxWidth === defaultMaxWidth) {
            clientWidth = Math.min(clientWidth, defaultMaxWidth * dpr);
        }

        docElem.style.fontSize = clientWidth / blocks + 'px';
    }
 ```
 *  4、横屏等页面resize情况的处理 
  ```javascript 
  window.addEventListener(window.orientationchange ? 'orientationchange' : 'resize', setFontSize, false);
  ```

 * 5、编写css样式

在开发过程中一般会提供750的UI设计稿（基于iphone6），在样式编写过程中需要使用rem作为单位来设置元素的宽高。可以借助sass和watch来帮助完成自动转化。

```javascript
/* 移动端页面设计稿宽度 */
$designwidth: 750;

/* 基准值 */
$blocks：10；
 
/* 单位px转化为rem */
@function px($px) {
    @return $px/$designwidth*$blocks+rem;
}
html,body{
    width:100%;
}
.block{
  width:px(750);
  height:px(100);
}
```

中间的牵涉到的一些细节问题，关于字体设置和页面最大最小配适。

```javascript

/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/* 设置容器拉伸的最小宽度 */
@mixin container-min-width() {
    margin-right: auto;
    margin-left: auto;
    min-width: $min-device-width;

    @media (-webkit-device-pixel-ratio: 2) {
        min-width: $min-device-width * 2;
    }

    @media (-webkit-device-pixel-ratio: 3) {
        min-width: $min-device-width * 3;
    }
}

/* 设置容器拉伸的最大宽度 */
@mixin container-max-width() {
    margin-right: auto;
    margin-left: auto;
    max-width: $max-device-width;

    @media (-webkit-device-pixel-ratio: 2) {
        max-width: $max-device-width * 2;
    }

    @media (-webkit-device-pixel-ratio: 3) {
        max-width: $max-device-width * 3;
    }
}

/* 设置字体大小，不使用rem单位， 根据dpr值分段调整 */
@mixin font-size($fontSize) {
    font-size: $fontSize / $design-dpr;

    [data-dpr="2"] & {
        font-size: $fontSize / $design-dpr * 2;
    }

    [data-dpr="3"] & {
        font-size: $fontSize / $design-dpr * 3;
    }
}
```
## 四、vw方案的使用
vw:是Viewport's width的简写，是css3支持的一个相对长度单位，1vw表示相对于屏幕宽度（window.innerWidth）的1%;
1、设置head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
2、具体配适中注意的问题
vw可以解决：
* 容器适配，可以使用vw
* 文本的适配，可以使用vw
* 大于1px的边框、圆角、阴影都可以使用vw
* 内距和外距，可以使用vw

存在的问题：1px在高清屏幕中的显示问题
1. 单边边框
2. 多边边框
3. 边框的圆角

使用transform以支持高清设备的边框1px（包括圆角）；
也可以考虑使用svg来解决；     




## 五、两种方案的比较和结合使用
### 5.1两种方案的比较
* rem方案：
+ 因为需要js去控制根元素上的font-size 可能会存在页面上闪一下的情况；
+ scale支持度问题

* vw方案：
+ 可能会存在部分机型的支持问题，但按照现在的时间点来看，这个问题已经不太明显了
+ 无法设置页面最大最小布局

[参考文章-细说移动端 经典的REM布局 与 新秀VW布局](https://www.cnblogs.com/imwtr/p/9648233.html#s4-1)

[参考文章]( https://www.w3cplus.com/css/vw-for-layout.html)

## 5.2两种方案的结合使用

为了解决纯VW布局不能设置最大最小宽度的问题，可以在vw方案中引入REM。

1、使用vw来设置html的font-size
通过配置html根元素的font-size为vw单位，并且配置最大最小的像素px值，在其他css代码中可以直接使用rem作为单位
```javascript
html {
    @include root-font-size();
}

```

```javascript
/* 移动端页面设计稿宽度 */
$design-width: 750;
/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;
/* 将移动端页面分为10块 */
$blocks: 10;
/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/*
    rem与px对应关系，1rem代表html font-size值（为一块的宽度），$rem即为$px对应占多少块

        $px                    $rem
    -------------    ===    ------------
    $design-width              $blocks
*/

/* html根元素的font-size定义，简单地将页面分为$blocks块，方便计算 */
@mixin root-font-size() {
    font-size: 100vw / $blocks;

    body {
        @include container-min-width();
    }

    /* 最小宽度定义 */
    @media screen and (max-width: $min-device-width) {
        font-size: $min-device-width / $blocks;
    }

    /* 最大宽度定义 */
    &[data-content-max] {
        body[data-content-max] {
            @include container-max-width();
        }

        @media screen and (min-width: $max-device-width) {
            font-size: $max-device-width / $blocks;
        }
    }
}
```
此处设置最大最小页面宽度的max-width直接使用宽度值，因为使用的是vw，视窗未缩放

```javascript
/* 设置容器拉伸的最小宽度 */
@mixin container-min-width() {
    margin-right: auto;
    margin-left: auto;
    min-width: $min-device-width;
}

/* 设置容器拉伸的最大宽度 */
@mixin container-max-width() {
    margin-right: auto;
    margin-left: auto;
    max-width: $max-device-width;
}
```
## 问题
可以思考下的问题：
1、rem方案中的1px的问题是怎么解决的？

2、上面给出的vw和rem混用方案中，设置元素的宽、高的时候用的vw还是rem作为单位？

项目中遇到的问题;
 1、keyup在iPhone的支持度问题
 iPhone在keyup事件上支持有问题，最后使用的change input keyup 三者相互结合解决的问题
 2、关于font-size的选择问题
   rem方案中直接使用rem作为font-size单位和css media查询根据dpr设置font-size的优劣和选择


### 六、调试

移动端js调试工具：eruda

```html
<script src="https://cdn.bootcss.com/eruda/1.3.1/eruda.js"></script>
<script>eruda.init();</script>
```
或者使用javascript引用

```javascript
(function () {
    var src = 'https://cdn.bootcss.com/eruda/1.3.1/eruda.js';
    if (!/eruda=true/.test(window.location.search)) return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt><script>eruda.init();</script>');
})();
```


关于移动端iframe嵌入的问题，注意不要使用百分比，使用rem,否则ios计算会有问题