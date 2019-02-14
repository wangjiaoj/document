
#### 设备像素比dpr：
* 也就是我们经常在谷歌控制台移动端调试顶端会看到的一个值。
* 设备像素比dpr = 设备像素dp  / 设备独立像素dips（css像素-垂直方向或水平方向）。
* 可以通过JS来获取：window.devicePixelRatio

### rem:root em,根元素的font-size.即<html>的font-size.rem是相对于html的font-size

    rem = document.documentElement.clientWidth * dpr / 10