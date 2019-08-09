# PS

## 一、基础知识部分

### 1.分辨率,矢量和位图,像素 dpi

1. 名词及单位
* resolution 分辨率 , raster 像素 ,  vactor 矢量
* in英寸, cm厘米 ,  mm毫米
* pt点:是一个标准印刷度量单位(一般一英寸72点) , pc派卡：也是一个印刷术语，一派卡等于12点
* Px 像素pixels

* PPI(Pixels Per Inch)即每英寸所拥有的像素（Pixel）数目，表示图像分辨率(网页一般72ppi即可)
* DPI(dot Per Inch)即每英寸长度上的点数,扫描仪和激光照排机上的分辨率，分辨率为2400DPI的扫描仪表示每英寸可采集2400个点或像素
* LPI是指印刷的挂网网线数，Line/inch,150LPI则表示每英寸加有150条网线，网线越多则表示网店越密集，印刷品表现力更丰富

2. 像素形状:像素的形状不一定是长方形的,PS中是可以设置像素长宽比的：视图-像素长宽比

3. 调整图片大小：
* 操作：图像-图像大小："重定图像像素"选项：使用PS进行图片缩小或放大时，最好使用"两次立放","邻近"的好处是计算速度比较快

### 2.色彩模型，色相饱和度，人眼模型

1. HSI颜色模式:人的视觉感知系统感知色彩的方式，以色调，饱和度，和强度三种基本特征量来感知颜色。
* 色调H(Hue)  饱和度S(saturation) 强度I(Intensity)

2. 色彩系的颜色具有三个基本属性:色相、彩度、明度.
* ctrl+u快捷\图像-调整-色相/饱和度(u): 调出色相H，饱和度A，明度I的调整弹窗
* 饱和度可定义为彩度除以明度，和彩度同样表征彩色偏离同亮度灰色的程度，是指色彩的艳艳程度
* ctrl+del 快捷键 打开拾色器


### 3.RGB
1. 光的三原色：红 绿 蓝
2. 光的成像原理：加色混色法  
3.在拾色器中调整H、S、B时也会引发RGB相应的变化

### 4.CMYK
1. 印刷成像原理：青、品、黄 、黑 减色混色法
2. 

### 5.Lab 灰度 位图 色彩空间



## 三、切图实践

* 关于PNG-8保存还是有白边的问题,在透明度下面一栏点选 “图案透明度仿色”再保存,但是PNG-8保存有时还会存在边缘模糊问题,最好可保存为png-24.
* 在切图时其他要图层要全部关闭,可参考使用alt关闭其他全部图层.
* 修改纯色图标颜色：图层样式 -> 颜色叠加