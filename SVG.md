# SVG

## 1、SVG简介

### 1. 1 SVG简介

1. SVG是什么

* SVG 使用 XML 格式定义的可伸缩矢量图图形(Scalable Vector Graphics), 图像在放大或改变尺寸的情况下其图形质量不会有所损失,是万维网联盟的标准,与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体.

2. 与其他图像格式相比，使用 SVG 的优势在于：

* SVG 与 JPEG 和 GIF 图像比起来，尺寸更小，且可压缩性更强,可伸缩;
* 图像可在任何的分辨率下被高质量地打印;SVG 可在图像质量不下降的情况下被放大;
* SVG 图像中的文本是可选的，同时也是可搜索的（很适合制作地图）;
* SVG 可以与 Java 技术一起运行;SVG 是开放的标准;SVG 文件是纯粹的 XML.;

### 1. 2 SVG引入

1. HTML页面中的SVG
* 使用`<embed>`标签:

```javascript
   <embed src="rect.svg" width="300" height="100" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" /> 
```

* 使用`<object>`标签:

```javascript
   <object data="rect.svg" width="300" height="100" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
```

* 使用`<iframe>`标签:

2. 打开方式

* 在浏览器中直接打开;
* 在HTML中使用<img>标签引用;
* 直接在html中使用SVG标签
* 作为CSS背景

### 1. 3 SVG基本图形和属性

1. 基本图形:`<rect><circle><ellipse><line><polyline><polygon>` 矩形    圆形      椭圆    直线    折线       多边形

2. 属性:fill  stroke  stroke-width  transform

* 相关的属性还有fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
* stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）

### 1. 4 SVG形状

1. 矩形`<rect>`

```javascript
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" rx="20" ry="20" width="250" height="100" style="fill:red;stroke:black; stroke-width:5;opacity:0.5"/>
</svg>
```

* x 、y 属性定义矩形的坐标；rx 和 ry 属性可使矩形产生圆角；width height.

2. 圆形`<circle>`

```javascript
<svg width="100%" height="100%" version="1.1"　xmlns="http://www.w3.org/2000/svg">
　　<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
 </svg>
```

* cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0);r 属性定义圆的半径.

3. 椭圆`<ellipse>`

* cx 属性定义圆点的 x 坐标;cy 属性定义圆点的 y 坐标;
* rx 属性定义水平半径;ry 属性定义垂直半径;

4. 线条`<line>`

* x1 属性和y1 属性在 x 轴定义线条的开始坐标.
* x2 属性和y2 属性在 x 轴定义线条的结束.

5. 多边形`<polygon>`

```javascript
　<svg width="100%" height="100%" version="1.1"　xmlns="http://www.w3.org/2000/svg">
　　 <polygon points="220,100 300,210 170,250" style="fill:#cccccc;stroke:#000000;stroke-width:1"/>
　</svg>
```

* points 属性定义多边形每个角的 x 和 y 坐标 

6. 折线`<polyLine>`

* 同多变形的使用方式相同,都是points属性定义经过的每个点坐标;

7. 路径`<path>`

 * `<path>` 标签用来定义路径。下面的命令可用于路径数据：

|                                      |                        |
| ------------------------------------ |:----------------------:|
| M = moveto                           |      M/m(x,y)+         |
| L = lineto                           |      L/l(x,y)+         |
| H = horizontal lineto                |      H/h(x,y)+         |
| V = vertical lineto                  |      V/v(x,y)+         |
| C = curveto                          |                        |
| S = smooth curveto                   |                        |
| Q = quadratic Belzier curve          |                        |
| T = smooth quadratic Belzier curveto |                        |
| A = elliptical Arc                   |                        |
| Z = closepath                        |                        |

* 注释：
  + 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
  + 最后参数表示最终要到达的位置
  + 上一个命令结束的位置就是下一个命令开始的位置
  + 命令可以重复参数是表示重复执行同一条命令


### 1. 5填充,描边和变换

* 属性:fill  stroke  stroke-width  transform




## 2、 坐标系统与坐标变换

### 2. 1 SVG世界,视野,视窗的概念

* SVG代码控制世界

* SVG的width,height的属性---控制视窗(viewport)

* SVG中viewbox,preserveAspectRatio--控制视野(viewbox)

* SVG标签中可以定义width和Height属性,来表示SVG渲染区域的大小,也可以使用样式表来定义.

  这个区域大小,就是视窗,视窗实际上就是浏览器开辟出来用来渲染SVG内容的一个区域.

```javascript
<svg xmlns=”XX” width=”800” height=”600” viewBox=”0 0 400 300” preserveAspectRatio=”xMidYMid meet”> 
　　 <!--svg content-->
</svg>
```

* 视野就是观看世界的矩形是哪一个,使用viewbox定义,当视窗和视野大小一致时,浏览器就可以把视野完美的填充到视窗内,可如果大小不一致,就会存在一个如何填充的问题,填充策略使用perserveAspectRatio来指定.
* preserveAspectRatio属性的值为空格分隔的两个值组合而成。例如上面的xMidYMid和meet,第1个值表示，viewBox如何与SVG viewport对齐；第2个值表示，如何维持高宽比（如果有）.
* 其中，第1个值又是由两部分组成的。前半部分表示x方向对齐，后半部分表示y方向对齐。家族成员如下：

| 值	   | 含义                                        |
| ----- |:------------------------------------------:|
| xMin	| viewport和viewBox左边对齐                   |
| xMid	| viewport和viewBox x轴中心对齐               |
| xMax	| viewport和viewBox右边对齐                   |
| YMin	| viewport和viewBox上边缘对齐。注意Y是大写。    |
| YMid	| viewport和viewBox y轴中心点对齐。注意Y是大写。|
| YMax	| viewport和viewBox下边缘对齐。注意Y是大写。    |

* x, y自由组合就可以了.

* preserveAspectRatio属性第2部分的值支持下面3个：


| 值       | 含义                                        |
| -------- |:-------------------------------------------:|
| meet     | 保持纵横比缩放viewBox适应viewport             |
| slice    | 保持纵横比同时比例小的方向放大填满viewport     |
| none     | 扭曲纵横比以充分适应viewport                  |


### 2. 2 SVG中的图形分组

* SVG 中使用`<g>` 标签来进行分组

### 2. 3 坐标系统概述

* SVG使用的坐标系统是笛卡尔直角坐标系,包括一个原点和两条相互垂直的数轴,基于原点和数轴的定义,又可以定义角度的含义.由于svg的阅读媒介一般是屏幕,所以这里的坐标轴都是Y轴朝下,另外角度是从X轴正方向到Y轴正方向的旋转方向是正角度.  

### 2. 4 四个坐标系

1. 用户坐标系(user coordinate)/原始坐标系

* 世界的坐标系;
* 我们设置的viewbox,视野大小,说的就是观察用户坐标系中的哪个区域.
* 用户坐标系是最原始的坐标系,其他坐标系都是从他开始的;

2. 自身坐标系(current coordinate)

* 每个图形或分组独立与生俱来的一个坐标系,这个坐标系用于定义自己的形状;

3. 前驱坐标系(previous coordinate)

* 父容器的坐标系;前驱坐标系经过变换transform后变成图形自身的坐标系;

4. 参考坐标系(reference coordinate)

* 使用其他坐标系来考究自身使用情况时使用;

### 2. 5 坐标变换

1. 定义  SVG中，坐标变换是对一个坐标系到另一个坐标系的变换的描述
2. 线性变换
3. 线性变换列表: 表示一系列的变换，结果为变换的矩阵的乘积;后面的变换乘在前面
4. Transform属性

* 前驱坐标系：父容器的坐标系
* Transform属性：定义前驱坐标系到自身坐标系的变换
* 语法：
  + rotate(<deg>)*------旋转
  + translate(<x>,<y>)*-----
  + scale(<sx>,<sy>)*-----调整比例
  + `matrix(<a>,<b>,<c>,<d>,<e>,<f>)*`

### 2. 6坐标观察 

* getBBox() 获取当前元素所占的矩形区域
* getCTM() 获得视窗坐标系到当前元素自身坐标系的变换矩阵
* getScreenCTM()  获得浏览器坐标系到当前自身元素的变换矩阵
* getTransformToElement()   获得从指定元素的自身坐标系到当前元素的自身坐标系的变换矩阵


### 3、 SVG滤镜

* SVG 滤镜用来向形状和文本添加特殊的效果。

* `<filter>` 标签用来定义 SVG 滤镜。`<filter>` 标签必须嵌套在 `<defs>` 标签内。`<defs>` 标签是 definitions 的缩写，它允许对诸如滤镜等特殊元素进行定义。

* 在 SVG 中，可用的滤镜有：

　　　feBlend　feColorMatrix　feComponentTransfer　feComposite　　feConvolveMatrix　feDiffuseLighting

　　　feDisplacementMap　　　feFlood　　feGaussianBlur　　　feImage

　　　feMerge　　feMorphology　　feOffset　　feSpecularLighting

　　　feTile　　feTurbulence　　　feDistantLight　　fePointLight　　feSpotLight

* 注释：您可以在每个 SVG 元素上使用多个滤镜！
* 高斯模糊（Gaussian Blur实例：


``` javascript
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
　<defs>
　　　<filter id="Gaussian_Blur">
　　　  <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
　　　</filter>
　</defs>
　<ellipse cx="200" cy="150" rx="70" ry="40"　style="fill:#ff0000;stroke:#000000;　stroke-width:2;filter:url(#Gaussian_Blur)"/>
</svg>
```

* 代码解释：
  + `<filter>` 标签的 id 属性可为滤镜定义一个唯一的名称（同一滤镜可被文档中的多个元素使用）.
  + filter:url 属性用来把元素链接到滤镜。当链接滤镜 id 时，必须使用 # .
  + 滤镜效果是通过`<feGaussianBlur>`标签进行定义的。fe 后缀可用于所有的滤镜.
  + `<feGaussianBlur>` 标签的 `stdDeviation` 属性可定义模糊的程度.
  + in="SourceGraphic" 这个部分定义了由整个图像创建效果.

## 4、 SVG颜色、渐变、笔刷

### 4. 1 SVG颜色

　　　RGB、HSL

### 4. 2 SVG渐变

* 在 SVG 中，有两种主要的渐变类型：线性渐变和放射性渐变,
* 两种标签必须嵌套在 <defs> 的内部。<defs> 标签是 definitions 的缩写，它可对诸如渐变之类的特殊元素进行定义。

1. 线性渐变:`<linearGradient>`

```javascript
<svg width="100%" height="100%" version="1.1"　xmlns="http://www.w3.org/2000/svg">
   <defs>
       <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(255,255,0);　stop-opacity:1"/>
        <stop offset="100%" style="stop-color:rgb(255,0,0); stop-opacity:1"/>
      </linearGradient>
    </defs>
　　<ellipse cx="200" cy="190" rx="85" ry="55"　style="fill:url(#orange_red)"/>
</svg>
```

解释:

* `<linearGradient>` 标签的 id 属性可为渐变定义一个唯一的名称
* fill:url(#orange_red) 属性把 ellipse 元素链接到此渐变
* 引用必须"gradientUnits="'userSpaceOnUse' or 'objectBoundingBox'.使用视图框或对象，以确定相对位置矢量点。 （默认为'objectBoundingBox）"
* gradientTransform="适用于渐变的转变"
* `<linearGradient>` 标签的 x1、x2、y1、y2 属性可定义渐变的开始和结束位置
* 渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 `<stop>` 标签来规定。offset 属性用来定义渐变的开始和结束位置。

2. 放射性渐变:`<radialGradient>`

```javascript
<svg width="100%" height="100%" version="1.1"　xmlns="http://www.w3.org/2000/svg">
　　 <defs>
        <radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"　fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:rgb(200,200,200);　stop-opacity:0"/>
            <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1"/>
        </radialGradient>
　　　</defs>
　　　<ellipse cx="230" cy="200" rx="110" ry="100"　style="fill:url(#grey_blue)"/>
</svg>
```

代码解释：

* `<radialGradient>` 标签的 id 属性可为渐变定义一个唯一的名称，fill:url(#grey_blue) 属性把 ellipse 元素链接到此渐变，

* cx、cy 和 r 属性定义外圈，而 fx 和 fy 定义内圈 渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 `<stop>` 标签来规定。offset 属性用来定义渐变的开始和结束位置。

### 4. 3 笔刷`<pattern>`

* id="用于引用这个模式的唯一ID。"必需的。
* patternUnits="userSpaceOnUse'或'objectBoundingBox"。第二个值X，Y，width，height 一个会使用模式对象的边框的小部分，单位（％）。
* patternContentUnits="'userSpaceOnUse'或 'objectBoundingBox'"
* patternTransform="允许整个表达式进行转换"
* x="模式的偏移量，来自左上角（默认为0）"
* y="模式的偏移量，来自左上角（默认为0）"
* width="模式平铺的宽度（默认为100％）"
* height="模式平铺的高度（默认为100％）"
* viewBox="各点"看到"这个SVG绘图区域。由空格或逗号分隔的4个值。(min x, min y, width, height)"
* xlink:href="另一种模式，其属性值是默认值以及任何子类可以继承。递归"

