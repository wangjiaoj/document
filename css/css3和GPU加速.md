CSS3和GPU加速

CSS3加速原理
浏览器接收到页面文档后，会将文档中的标记语言解析为DOM树。DOM树和CSS结合后形成浏览器构建页面的渲染树。渲染树中包含了大量的渲染元素，每一个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理，而图层在GPU中 transform 是不会触发 repaint 的，这一点非常类似3D绘图功能，最终这些使用 transform 的图层都会由独立的合成器进程进行处理。
 
[CSS3硬件加速 - GPU加速](https://blog.csdn.net/u011140116/article/details/122898455)