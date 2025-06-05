参考文档：[懒人神器：svg-sprite-loader实现自己的Icon组件](https://segmentfault.com/a/1190000015367490)

# 一、svg的symbol标签特性

思路：利用symbol标签特性处理
<symbol>标记的作用是定义一个图像模板，你可以使用<use>标记实例化它，然后在SVG文档中反复使用，这种用法非常的高效。<symbol>本身不会输出任何图像，只有使用<use>实例化后才会显示。
symbol标签做svg合集之后，使用use标签引用id的方式进行引用，避免同一个svg反复引入，项目中只引入一次。


````html
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
````

这个方式可以考虑直接下载好的类似字体文件cdn引入
也可以自己本地打包：svg-sprite-loader



# 二、svg-sprite-loader 
svg-sprite-loader 利用svg的symbol元素，将每个icon包括在symbol中，通过use元素使用该symbol。将加载的 svg 图片放到页面中，其它地方通过 `<use>` 复用
打包出来svg实际上是在js文件中,加载到html中