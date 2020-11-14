 
## 三、rem方案的使用

rem方案的第三方组件案例：lib-flexible+postcss-pxtorem的使用

### 3.1 考虑dpr作为1px处理方案的REM方案
根据上面的在具体使用过程中
1. 设置meta viewport标签 -- 判断页面上是否存在meta标签， 确保meta[name="viewport"]存在。
 ```javascript
  var docElem = document.documentElement,
        metaElem = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        // 将页面分为10块
        blocks = 10,
        // 需要限制的最小宽度
        defaultMinWidth = 320,     
        // 需要限制的最大宽度
        defaultMaxWidth = 540,
            // 计算的基准值
        calcMaxWidth = 9999999;

     if (!metaElem) {
        metaElem = initMetaViewport();
    }
    function initMetaViewport() {
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width,initial-scale=1,user-scalable=no');
        //因为mata标签中的width 和 initial-scale同时设置的情况下会取最大值，所以实际上只要设置一个scale即可
        document.head.appendChild(meta);
        return meta;
    }
       
```

2. 设置meta标签中的scale
```javascript
 // 设置缩放
    function setScale(dpr) {
        metaElem.setAttribute('content', 'initial-scale=' + 1 / dpr + ',maximum-scale=' + 1 / dpr + ',minimum-scale=' + 1 / dpr + ',user-scalable=no');
    }
  ```
3. 计算rem 

   公式：
   `rem = document.documentElement.clientWidth * dpr / blocks;`

   blocks的值一般设置为10即可，也可以自己设置成其他值；
   如果已经先设置了scale，那么这个时候直接取docElem.clientWidth/blocks即可;
   如果有进行页面宽度最大最小配适的需求：结合css中的media查询设置页面body的最大最小宽度，在font-size计算过程中根据设置的页面最大最小的参数进行配适。

 ```javascript
   // 设置docElem字体大小
    function setFontSize() {
        var clientWidth = docElem.clientWidth;

        clientWidth = Math.max(clientWidth, defaultMinWidth * dpr)

        // 调整计算基准值
        if (calcMaxWidth === defaultMaxWidth) {
            clientWidth = Math.min(clientWidth, defaultMaxWidth * dpr);
        }

        docElem.style.fontSize = clientWidth / blocks + 'px';
    }
 ```
 4. 横屏等页面resize情况的处理 
  ```javascript 
  window.addEventListener(window.orientationchange ? 'orientationchange' : 'resize', setFontSize, false);
  ```

 5. 编写css样式

在开发过程中一般会提供750的UI设计稿（基于iphone6），在样式编写过程中需要使用rem作为单位来设置元素的宽高。可以借助sass和watch来帮助完成自动转化。

```javascript
/* 移动端页面设计稿宽度 */
$designwidth: 750;

/* 基准值 */
$blocks：10；
 
/* 单位px转化为rem */
@function px($px) {
    @return $px/$designwidth*$blocks+rem;
}
html,body{
    width:100%;
}
.block{
  width:px(750);
  height:px(100);
}
```

中间的牵涉到的一些细节问题，关于字体设置和页面最大最小配适。

```javascript

/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/* 设置容器拉伸的最小宽度 */
@mixin container-min-width() {
    margin-right: auto;
    margin-left: auto;
    min-width: $min-device-width;

    @media (-webkit-device-pixel-ratio: 2) {
        min-width: $min-device-width * 2;
    }

    @media (-webkit-device-pixel-ratio: 3) {
        min-width: $min-device-width * 3;
    }
}

/* 设置容器拉伸的最大宽度 */
@mixin container-max-width() {
    margin-right: auto;
    margin-left: auto;
    max-width: $max-device-width;

    @media (-webkit-device-pixel-ratio: 2) {
        max-width: $max-device-width * 2;
    }

    @media (-webkit-device-pixel-ratio: 3) {
        max-width: $max-device-width * 3;
    }
}

/* 设置字体大小，不使用rem单位， 根据dpr值分段调整 */
@mixin font-size($fontSize) {
    font-size: $fontSize / $design-dpr;

    [data-dpr="2"] & {
        font-size: $fontSize / $design-dpr * 2;
    }

    [data-dpr="3"] & {
        font-size: $fontSize / $design-dpr * 3;
    }
}
```
### 3.2、不考虑dpr的rem自适应方案
dpr引入与移动端自适应布局的关系
[移动端尺寸自适应与dpr无关](https://segmentfault.com/a/1190000015409435?utm_source=tag-newest)

对于很多项目来说，其实1px问题并没有那么重要，也完全可以直接去掉dpr,不考虑dpr的1px问题。也有少数情况下的dpr的识别可能存在问题，比如qht的一个内嵌页面,就出现了dpr无法正常识别的问题

[移动端布局之postcss-px-to-viewport（兼容vant）](https://www.cnblogs.com/zhangnan35/p/12682925.html)

## 四、vw方案的使用
vw:是Viewport's width的简写，是css3支持的一个相对长度单位，1vw表示相对于屏幕宽度（window.innerWidth）的1%;
1. 设置head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
2. px转化为vw
安装post-css-to-viewport
在项目根目录下添加.postcssrc.js文件
```javascript
module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
};
```
3. 具体配适中注意的问题
vw可以解决：
* 容器适配，可以使用vw
* 文本的适配，可以使用vw
* 大于1px的边框、圆角、阴影都可以使用vw
* 内距和外距，可以使用vw

存在的问题：1px在高清屏幕中的显示问题
* 单边边框
* 多边边框
* 边框的圆角

使用transform以支持高清设备的边框1px（包括圆角）；
也可以考虑使用svg来解决；     




## 五、两种方案的比较和结合使用
### 5.1两种方案的比较
1. rem方案：
+ 因为需要js去控制根元素上的font-size 可能会存在页面上闪一下的情况；
+ scale支持度问题

2. vw方案：
+ 可能会存在部分机型的支持问题，但按照现在的时间点来看，这个问题已经不太明显了
+ 无法设置页面最大最小布局

[参考文章-细说移动端 经典的REM布局 与 新秀VW布局](https://www.cnblogs.com/imwtr/p/9648233.html#s4-1)

[参考文章]( https://www.w3cplus.com/css/vw-for-layout.html)

## 5.2两种方案的结合使用

为了解决纯VW布局不能设置最大最小宽度的问题，可以在vw方案中引入REM。

1. 使用vw来设置html的font-size
通过配置html根元素的font-size为vw单位，并且配置最大最小的像素px值，在其他css代码中可以直接使用rem作为单位
```javascript
html {
    @include root-font-size();
}

```

```javascript
/* 移动端页面设计稿宽度 */
$design-width: 750;
/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;
/* 将移动端页面分为10块 */
$blocks: 10;
/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/*
    rem与px对应关系，1rem代表html font-size值（为一块的宽度），$rem即为$px对应占多少块

        $px                    $rem
    -------------    ===    ------------
    $design-width              $blocks
*/

/* html根元素的font-size定义，简单地将页面分为$blocks块，方便计算 */
@mixin root-font-size() {
    font-size: 100vw / $blocks;

    body {
        @include container-min-width();
    }

    /* 最小宽度定义 */
    @media screen and (max-width: $min-device-width) {
        font-size: $min-device-width / $blocks;
    }

    /* 最大宽度定义 */
    &[data-content-max] {
        body[data-content-max] {
            @include container-max-width();
        }

        @media screen and (min-width: $max-device-width) {
            font-size: $max-device-width / $blocks;
        }
    }
}
```
此处设置最大最小页面宽度的max-width直接使用宽度值，因为使用的是vw，视窗未缩放

```javascript
/* 设置容器拉伸的最小宽度 */
@mixin container-min-width() {
    margin-right: auto;
    margin-left: auto;
    min-width: $min-device-width;
}

/* 设置容器拉伸的最大宽度 */
@mixin container-max-width() {
    margin-right: auto;
    margin-left: auto;
    max-width: $max-device-width;
}
```
## 问题
可以思考下的问题：
1、rem方案中的1px的问题是怎么解决的？

2、上面给出的vw和rem混用方案中，设置元素的宽、高的时候用的vw还是rem作为单位？

项目中遇到的问题;
 1、keyup在iPhone的支持度问题
 iPhone在keyup事件上支持有问题，最后使用的change input keyup 三者相互结合解决的问题
 2、关于font-size的选择问题
   rem方案中直接使用rem作为font-size单位和css media查询根据dpr设置font-size的优劣和选择


### 六、调试

移动端js调试工具：eruda

```html
<script src="https://cdn.bootcss.com/eruda/1.3.1/eruda.js"></script>
<script>eruda.init();</script>
```
或者使用javascript引用

```javascript
(function () {
    var src = 'https://cdn.bootcss.com/eruda/1.3.1/eruda.js';
    if (!/eruda=true/.test(window.location.search)) return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt><script>eruda.init();</script>');
})();
```


关于移动端iframe嵌入的问题，注意不要使用百分比，使用rem,否则ios计算会有问题