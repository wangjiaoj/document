## 一、关于移动端的布局方案
移动端常见的布局方案目前主要有两种，一种是rem方案，一种是vw方案
## 二、基本概念
* 物理像素(physical pixel)
物理像素又被称为设备像素，它是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

* 设备独立像素(density-independent pixel)
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

* CSS像素
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

* 屏幕密度
屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

* 设备像素比(device pixel ratio)
+ 设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到
：设备像素比 ＝ 物理像素 / 设备独立像素
+ 在Javascript中，可以通过 window.devicePixelRatio 获取到当前设备的dpr。
+ 在css中，可以通过 -webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配。


* rem:root em,根元素的font-size.即<html>的font-size.rem是相对于html的font-size

    rem = document.documentElement.clientWidth * dpr / 10
    https://www.w3cplus.com/css/vw-for-layout.html
https://www.w3cplus.com/css/viewports.html
https://www.w3cplus.com/css/flex-item-calculate.html
    https://www.cnblogs.com/imwtr/p/9648233.html#s4-1