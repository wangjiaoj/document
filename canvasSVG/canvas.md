# Canvas

## 1 2D上下文 

### 1. 1 填充,描边,矩形,阴影,渐变

1. 填充:
fillStyle(属性)、描边:strokeStyle(属性);这两个属性的值可以是字符串,渐变对象或模式对象;

2. 矩形是唯一一种可以直接在2D上下文中绘制的形状;

* 绘制矩形(方法):
  + fillReact():绘制矩形会填充指定颜色,配合fillStyle使用,
  + strokeRect():绘制矩形使用指定颜色描边,配合strokeStle使用,
  + clearRect():清除画布上的矩形区域
* 三个方法均接受4个参数:x坐标,y坐标,高度,宽度;

3. 阴影:根据以下几个属性,会自动为形状或路径绘制出阴影

* 阴影颜色:shadowColor,默认黑色
* X轴方向的阴影偏移量:  shadowOffsetX,默认0
* Y轴方向的阴影偏移量:  shadowOffsetY,默认0
* 模糊的像素数:shadowBlur,默认0;

4. 渐变:

* 创建渐变对象的两个方法:
  + 线性渐变:createLinearGradient(),接收4个参数,起点x,y坐标和重点x,y坐标
  + 径向渐变:createRadialGradient(),接收6个参数,对应两个圆的圆心和半径;
* 创建渐变对象之后,下一步就是使用addColorStop()方法来指定色标,这个方法接收两个参数:色标位置和CSS颜色值,色标位置是一个0(开始的颜色)到1(结束的颜色)之间的数字.
* 实例:

```javascript
　var  gradient=context.createLinearGradient(10,10,50,50);
　gradient.addColorStop(0,"white");
　gradient.addColorStop(1,"black");
　context.fillStyle=gradient;
　context.strokeStyle="blue";
　context.fillRect(10,10,50,50);
```

### 1. 2 绘制路径

* 绘制路径,首先要调用startPath(),表示开始绘制新路径;
* 实际地绘制路径的具体方法有:
  + 弧线:arc()
  + 弧线:arcTo()
  + 曲线:bezierCurveTo()
  + 直线:lineTo()
  + 游标移动:moveTo()
  + 二次曲线:quadratiCurveTo()
  + 矩形路径:rect();
* 绘制连接到路径起点的路径:closePacth();
* 填充颜色:设置fillStyle属性后,调用fill()方法;
* 描边:设置strokeStyle等属性后,调用stroke()方法;
* 创建剪切区域:调用clip()方法;

### 1. 3 绘制文本

* 两个方法:fillText(),strokeText()两个方法都可以接收4个参数:绘制文本字符串,x坐标,y坐标和可选的最大像素宽度;
* 方法相关属性:font,textAlign,textBaseLine,此外还有相对应的fillStyle和strokeStyle;
* 辅助确定文本大小的方法:measureText();

### 1. 4 变换

* 创建绘制上下文时,会以默认值初始化变换矩阵,在默认的变换矩阵下,所有处理都按照描述直接绘制;
* 修改变换矩阵的方法:
  + 围绕原点旋转图像angle弧度:rotate(angle)
  + 缩放图像:scale(scaleX,scaleY)
  + 移动原点到(x,y):translate(x,y)
  + 直接修改变换矩阵:transform()
* 将变换矩阵重置为默认状态,然后在调用transform():setTransform();
* 虽然没有什么办法把上下文中一切都重置会默认状态,但可以通过save()来保存上下文设置和变换,并通过restore()来返回上一级设置;

### 1.5 绘制图像

　　绘制图像方法:drawImage(),有三种不同的参数组合

* drawImage(img,x,y):HTML`<img>`元素,绘制图像起点坐标:x,y
* drawImage(img,x,y,height,width):绘制图片目标高度和目标宽度:height,width(可以有缩放或放大的效果)
* drawImage(img,x1,y1,height1,width1,x2,y2,height2,width2):源图像坐标:x1,y1;源图像宽度高度:height1,width1;目标图像坐标:x2,y2;目标图像宽度高度:height2,width2;(可只显示部分图像)

除了可以传递img元素外,也可以传递`<canvas>`元素作为参数,结合使用drawImage和其他方法,可以对图像进行各种基本操作,操作结果可以通过toDataUrl()方法(该方法不是上下文对象的方法,是canvas对象的方法)获得,不过图像不能来自其他域.

### 1.6 模式,使用图像数据,合成

* 1、模式其实就是重复的图像,可以用来填充或描边图形;

  + 创建模式:createPatter(),两个参数:一个HTML`<img>` 元素和一个表示如何重复图像的字符串,它的值和background-position的属性值相同;
第一个参数也可以是一个`<video>`元素,或者一个`<canvas>`元素;

  + 实例:

```javascript
　var img=document.getElementById("img");
　var pattern=context.createPattern(img,"repeat");
　context.fillStyle=pattern;
　context.fillRect(0,0,84,84)
```



* 2、图像数据:

* 使用getImageData()获得原始图像数据,
* 该方法接收4个参数:要获取其数据的画面区域x坐标和y坐标以及该区域的像素宽度和高度;
* 返回的对象是一个ImageData的实例,每一个ImageData对象都有三个属性:width,height,data,data是一个数组,保存着每一个像素的数据.

* 3、合成:

* 两个会应用到上下文中所有绘制操作的属性:globalAlpha和globalComposition-Operation.
* globalAlpha是一个介于0和1之间的值(包括0和1),用于指定所有绘制的透明度;
* globalCompositionOperation表示后绘制的图像怎样和先绘制的图形结合.



## 3D上下文(WebGL上下文)

　　　WebGL是针对Canvas的3D上下文.