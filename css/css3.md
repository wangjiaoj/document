# CSS3
## 一、CSS3
### 1.1 新弹性盒模型
1. box-orient属性用于设置盒模型内部元素的排列方式
2. box-sizing属性用于改变容器的盒模型组成方式
   * border-box 怪异盒模型
   * content-box 标准盒模型
   css3引入这个属性可以自由选择盒模型
3. box-direction 属性用于改变容器的显示顺序,使之反向排列。
4. box-pack 属性可以用于设置子容器在水平框中的水平位置，以及垂直框中的垂直位置，它共有四种可能值：start，end，justify 和 center。
5. box-align 属性用于规定如何对齐框的子元素。，共有五个值：start，end，center，baseline 和 stretch。

## 二、CSS优化
   css优化除了一些高消耗属性和选择器以外，重点在于回流和重绘
   要了解回流和重绘,首先要了解浏览器渲染加载过程

   ["参考文章：浏览器加载、解析、渲染的过程"](http://blog.csdn.net/xiaozhuxmen/article/details/52014901)

### 2.1、慎重选择高消耗样式(Expensive Styles)
  1. 合理安排selectors(Selectors瘦身)
  2. 高消耗属性？->会之前需要浏览器进行大量计算：
　　　border-shadows    border-radius
　　　transparency       transforms
　　　CSS filters (性能杀手)

### 2.2、避免过分重绘（Repaints）
   常见的重绘元素：
　　　Color    border-style   visibility   background
　　　Text-decoration background-image background-position   background-position
　　　Outline-color  outline  outline-style   border-radius
　　　 Outline-width  box-shadow  background-size

### 2.3、 CSS WILL Change
* 思路：把GPU利用起来
* 适用场景:transform、opacity等
* 使用位置：提前告知浏览器

### 2.4、requestAnimationFrame
* 让视觉更新安札浏览器的最有时间来安排计划：60FPS
* 取代setTimeout 和 setInterval hack
* 和pageVisibility的冲突

### 2.5、回流(reflow)与重绘(repaint)
  1. 回流reflow:浏览器发现某个部分发生了变化影响了布局，就需要去重新渲染；
  2. 重绘repaint：如果只改变了某个元素的颜色等视觉效果的时候，就会引发重绘，如opacity,background-color,visibility等；
  3. 回流一定会伴随着重绘，重绘可以自己单独发生
     Reflow要比Repaint更花费时间，也就更影响性能。所以在写代码的时候，要尽量避免过多的Reflow

  4. 引发回流的操作例子：
    + 页面渲染初始化；
    + dom结构改变，比如删除节点
    + render树变化，比如减少padding,字体大小改变
    + 窗口resize;
    + 获取某些属性的值：
         1)offsetTop,offsetLft,offsetHeight,offsetWidth
         2)scrollTop/Left/Width/Height
         3)width,height
         5)调用了getComputerStyle() 或者IE 的currentStyle
         
         dispaly:none会引发回流+重绘
         
   

 

## 三、不太熟悉的几种css用法
### 3.1、text-indent

## 四、Flex (css3)
   [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
### 4.1. 概念
   1. Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
   2. 采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
   3. 项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size

### 4.2. 容器属性
   主轴：横轴   交叉轴：纵轴
   1. flex-direction       
     属性决定主轴的方向（即项目的排列方向）    
         从左到右 从右到左 从上到下 从下到上
   2. flex-wrap            :
      属性定义，如果一条轴线排不下，如何换行        
      换行 不换行：第一行在上方   
      不换行：第一行在下方
   3. flex-flow            
     flex-direction属性和flex-wrap属性的简写形式
   4. justify-content      
       属性定义了项目在主轴上的对齐方式。           
        左对齐 右对齐 居中 两端对齐
   5. align-items          ：
        属性定义项目在交叉轴上如何对齐。
   6. align-content        ：
      属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

### 4.3. 项目属性
   1. order      :
   属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
   2. flex-grow     :
   <number>属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
   3. flex-shrink   :
   <number>属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
   4. flex-basis    :
   定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
   5. flex
   6. align-self    :
     align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。


## 五、grid
## 5.1

justify 横向
align  纵向