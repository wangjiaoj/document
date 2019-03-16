## 一、关于移动端的布局方案
移动端常见的布局方案目前主要有两种，一种是rem方案，一种是vw方案，本质上来讲，都是按照移动端设备的宽度比例来做配适的。

## 二、基本概念

### 2.1、基本概念
* rem:css3支持的一个相对长度单位，元素的font-size.即<html>的font-size. 

* vw:是Viewport's width的简写，是css3支持的一个相对长度单位，1vw表示相对于屏幕宽度（window.innerWidth）的1%;

* 物理像素(physical pixel)
物理像素又被称为设备像素，它是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。

* 设备独立像素(density-independent pixel)
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

* CSS像素
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)。

* 设备像素比(device pixel ratio)
+ 设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：设备像素比 ＝ 物理像素 / 设备独立像素
+ 在Javascript中，可以通过 window.devicePixelRatio 获取到当前设备的dpr。
+ 在css中，可以通过 -webkit-device-pixel-ratio,-webkit-min-device-pixel-ratio-webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配。
+ 有这样一个参数存在，实际上说明了在移动端设备上，css中的1px可能会不等于物理像素中的1px

    在css中我们一般使用px作为单位，在桌面浏览器中css的1个像素往往都是对应着电脑屏幕的1个物理像素，这可能会造成我们的一个错觉，那就是css中的像素就是设备的物理像素。但实际情况却并非如此，css中的像素只是一个抽象的单位，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的。在为桌面浏览器设计的网页中，我们无需对这个津津计较，但在移动设备上，必须弄明白这点。在早先的移动设备中，屏幕像素密度都比较低，如iphone3，它的分辨率为320x480，在iphone3上，一个css像素确实是等于一个屏幕物理像素的。后来随着技术的发展，移动设备的屏幕像素密度越来越高，从iphone4开始，苹果公司便推出了所谓的Retina屏，分辨率提高了一倍，变成640x960，但屏幕尺寸却没变化，这就意味着同样大小的屏幕上，像素却多了一倍，这时，一个css像素是等于两个物理像素的。其他品牌的移动设备也是这个道理。例如安卓设备根据屏幕像素密度可分为ldpi、mdpi、hdpi、xhdpi等不同的等级，分辨率也是五花八门，安卓设备上的一个css像素相当于多少个屏幕物理像素，也因设备的不同而不同，没有一个定论。
                                
    还有一个因素也会引起css中px的变化，那就是用户缩放。例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。关于这点，在文章后面的部分还会讲到。

    在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css中的px就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2
                   ------在后续的rem方案里我们会首先把屏幕宽度的这个问题利用dpr修正回来 ，另外会通过禁止缩放来解决缩放给px带来的变化
### 2.2、viewport
    
ppk认为，移动设备上有三个viewport。

* 浏览器默认的viewport叫做 layout viewport。它的宽度是大于浏览器可视区域的宽度的。
这个layout viewport的宽度可以通过 document.documentElement.clientWidth 来获取。
多数手机的layout width都是980.

* visual viewport表示浏览器可视区域的大小的宽度，可以通过window.innerWidth 来获取。

* 现在我们已经有两个viewport了：layout viewport 和 visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。

移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是ideal viewport。那么怎么才能得到ideal viewport呢？这就该轮到meta标签出场了。

head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度。

在苹果的规范中，meta viewport 有6个属性(暂且把content中的那些东西称为一个个属性和值)，如下：

width	设置layout viewport  的宽度，为一个正整数，或字符串"width-device"
initial-scale	设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale	允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale	允许用户的最大缩放值，为一个数字，可以带小数
height	设置layout viewport  的高度，这个属性对我们并不重要，很少使用
user-scalable	是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许
这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

问题：如果width 和 initial-scale=1同时出现，并且还出现了冲突呢？
width=400表示把当前viewport的宽度设为400px，initial-scale=1则表示把当前viewport的宽度设为ideal viewport的宽度，那么浏览器到底该服从哪个命令呢？是书写顺序在后面的那个吗？不是。当遇到这种情况时，浏览器会取它们两个中较大的那个值。例如，当width=400，ideal viewport的宽度为320时，取的是400；当width=400， ideal viewport的宽度为480时，取的是ideal viewport的宽度。 


1、关于缩放以及initial-scale的默认值

    首先我们先来讨论一下缩放的问题，前面已经提到过，缩放是相对于ideal viewport来缩放的，缩放值越大，当前viewport的宽度就会越小，反之亦然。例如在iphone中，ideal viewport的宽度是320px，如果我们设置 initial-scale=2 ，此时viewport的宽度会变为只有160px了，这也好理解，放大了一倍嘛，就是原来1px的东西变成2px了，但是1px变为2px并不是把原来的320px变为640px了，而是在实际宽度不变的情况下，1px变得跟原来的2px的长度一样了，所以放大2倍后原来需要320px才能填满的宽度现在只需要160px就做到了。因此，我们可以得出一个公式：

    visual viewport宽度 = ideal viewport宽度  / 当前缩放值

    当前缩放值 = ideal viewport宽度  / visual viewport宽度
  
    参考文章(https://www.cnblogs.com/2050/p/3877280.html)

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
        console.log(docEl.clientWidth);
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

    ### vw方案的使用
    可以考虑比较新的VW布局，无需使用JS，虽说在移动端 iOS 8 以上以及 Android 4.4 以上才获得支持，不过还是值得一用的。如果需要兼容，可以尝试 viewport-units-buggyfill