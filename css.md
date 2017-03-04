# CSS3
## 一、CSS3
### 1、新弹性盒模型
* box-orient属性用于设置盒模型内部元素的排列方式
* box-sizing属性用于改变容器的盒模型组成方式
* box-direction 属性用于改变容器的显示顺序,使之反向排列。
* box-pack 属性可以用于设置子容器在水平框中的水平位置，以及垂直框中的垂直位置，它共有四种可能值：start，end，justify 和 center。
* ox-align 属性用于规定如何对齐框的子元素。，共有五个值：start，end，center，baseline 和 stretch。

## 二、CSS优化

### 1、慎重选择高消耗样式(Expensive Styles)
* 1)合理安排selectors(Selectors瘦身)
* 2)高消耗属性？->会之前需要浏览器进行大量计算：
　　　border-shadows    border-radius
　　　transparency       transforms
　　　CSS filters (性能杀手)

### 2、避免过分重绘（Repaints）
   常见的重绘元素：
　　　Color    border-style   visibility   background
　　　Text-decoration background-image background-position   background-position
　　　Outline-color  outline  outline-style   border-radius
　　　 Outline-width  box-shadow  background-size

### 3、 CSS WILL Change
* 思路：把GPU利用起来
* 适用场景:transform、opacity等
* 使用位置：提前告知浏览器

### 4、requestAnimationFrame
* 让视觉更新安札浏览器的最有时间来安排计划：60FPS
* 取代setTimeout 和 setInterval hack
* 和pageVisibility的冲突

## 三、CSS揭秘

### 总结
1. 要多多利用伪类，对减少html嵌套复杂度，实现一些背景效果等作用不错

### 1、浏览器支持及回退机制

1. 浏览器前缀，利用层叠机制，把标准语法排在最后
2. @supports
3. 使用javascript给根元素添加一些辅助类，然后可以针对支持或不支持某些特性的浏览器来分别编写样式 
* e.g

```javascript
if("clipPath" in $0.style){
    //但是判断为true并不意味着浏览器就一定真的支持这个css特性
}
```


### 2、背景与边框

#### 2.1 多重边框

1. 考虑使用box-shadow或outline来作为边框，但outline并不紧贴box-radius,box-shadow会紧贴边框
2. linear-gradient做斜条纹时要注意根据角度计算无缝贴片，但使用repeating-linear-gradient就不用担心这个问题


### 3、形状

#### 3.1 平行四边想

* 因为skew()会使得内部的文字也发生变形，如果只想让背景变形，字体不变，那么可以使用为元素，将为元素作为背景进行相应的变形的来实现这样的效果
 

### 4、投影


#### 4.1 box-shadow
* 背景根据两个偏移参数进行偏移，然后根据模糊半径进行模糊，后面模糊后的背景和原背景重合的部分会被剪切掉,中间还有一个参数：扩张半径 可扩大或缩小投影的尺寸

### 5、用户体验


[滚动条样式](http://blog.csdn.net/hanshileiai/article/details/40398177)
[具体实例](http://www.xuanfengge.com/demo/201311/scroll/css3-scroll.html)
