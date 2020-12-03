 
# rem和vw实践方案

1. vw手机兼容度
vw，vh，vmax,vmin支持度： 
* 安卓5-6.x  webview chrominum81 以及以上版本均致支持
* ios:8      以及以上版本均致支持

2. rem手机兼容度
* rem可以比vw兼容更多的老手机,但实际上如果不是产品特殊要求或目标用户特殊,其实目前已经可以选用vw方案了

3. 开发前要注意UI稿大小,如果使用第三方UI库,还需要注意第三方UI库的设计稿大小,注意两者统一问题。比如vant设计稿大小是375。

4. 根据需要选择是否设置页面最大宽度,很多情况下并不需要设置页面最大宽度,设置页面最大宽度可能出于一些大概兼容PC端需求(注意只是兼容)。但注意fixed布局可能给最大宽度带来的影响。可能需要fiexed布局组为遮罩或位置固定后，有效内容部分容器再进行布局居中?

5. 关于vant
* Vant 中的样式默认使用 px 作为单位,页面元素主要是固定大小(如按钮)和flex,fixed布局实现的。
* Rem 布局适配
Vant 中的样式默认使用 px 作为单位，如果需要使用 rem 单位，推荐使用：postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem


## 一、rem方案的使用

1. rem方案的经典第三方组件案例：lib-flexible+postcss-pxtorem的使用。

2. `1.1方案`主要描述代码实际处理过程，实际使用按照`1.3 组件库组件REM方案`使用即可。

3. 淘宝的dpr方案利用scale缩放实际上是想要解决1px的问题,因为早期的ios不支持0.5px,但也存在早期的android不支持scale的问题。因此淘宝2015年开源的flexible方案中的逻辑判断是：ios>=2的dpr=2,ios>=3的dpr=3,android的dpr=1。

4. 移动端尺寸自适应与dpr无关,除了淘宝方案外,其他方案都得处理1px的问题,但也减少针对不同dpr设备做响应式处理的麻烦,而且其中也没有一种一劳永逸的方案能解决全部问题。而作为新出来的单位vm,是时候该入坑了

### 1.1 考虑dpr利用scale作为1px处理方案的REM方案

在具体使用过程中处理方案如下：

#### 1. 设置meta viewport标签 


 判断页面上是否存在meta标签， 确保meta[name="viewport"]存在。

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

#### 2. 设置meta标签中的scale
```javascript
 // 设置缩放
    function setScale(dpr) {
        metaElem.setAttribute('content', 'initial-scale=' + 1 / dpr + ',maximum-scale=' + 1 / dpr + ',minimum-scale=' + 1 / dpr + ',user-scalable=no');
    }
  ```

#### 3. 计算rem 

   mata标签的scale调整之后 `document.documentElement.clientWidth`大小也会随之变化
    
   公式：
   `rem = document.documentElement.clientWidth / blocks;`

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
#### 4. 横屏等页面resize情况的处理 
  ```javascript 
  window.addEventListener(window.orientationchange ? 'orientationchange' : 'resize', setFontSize, false);
  ```
 
#### 5. 编写css样式

在开发过程中一般会提供750的UI设计稿（基于iphone6），在样式编写过程中需要使用rem作为单位来设置元素的宽高。两种解决思路，一种是使用sass/less编写转化公式,另一种是使用postcss-pxtorem插件直接进行转化。

* 注意css mediaQuery中的大小是按照layout-viewport中尺寸大小来的

开发时需要注意UI提供的稿子大小,偶尔也会被提供375的UI稿。下方方案按照750UI稿为例:

 1.  sass编写转化公式

```css

/* 移动端页面设计稿宽度 */
$design-width: 750;

/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;

/* 基准值 */
$blocks：10;
 
/* 单位px转化为rem */
@function px($px) {
    @return $px/$design-width*$blocks+rem;
}

 
```

中间的牵涉到的一些细节问题，关于字体设置和页面最大最小配适。
这一部分实际上也可以不写在css中，直接通过js页面初始化时获取dpr,动态计算后插入到样式中。如果存在一些特殊dpr需要特殊处理的时候,动态插入可以保证实际采用的dpr计算得到的html字体大小和body的最大最小宽度限制一致,效果应该是优于css的。

使用css解决示例：

```css
/*sass公式*/
/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

html{
  @include root-width();
}
@mixin root-width() {
    /* 最小宽度定义 */
    body {
        @include container-min-width();
    }
    /* 最大宽度定义 */
    &[data-content-max] {
        body[data-content-max] {
            @include container-max-width();
        }
    }
}
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
2. 使用postcss-pxtorem插件直接进行转化

安装postcss-pxtorem,在项目根目录下添加.postcssrc.js文件
```javascript
module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-pxtorem": {
      rootValue: 75, // 根节点1rem对应px 公式：设计稿尺寸/block
      unitPrecision: 5, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      minPixelValue: 12, // 默认值1，小于或等于12px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude:function(file){
          //文件名中不含有h5的忽略
          return file.indexOf('h5')==-1
      }, // 设置忽略文件，用正则做目录名匹配 [/node_modules/]或者函数返回也可以，返回true表示忽略
 
    }
  }
};
```
这种自动转化方案下,如果需要设置页面最大最小宽度最好配合使用js计算插入,就可以完美跳过sass/less公式。

自动转化方案中个别css样式忽略转化成rem写法：
```css
.convert {
    font-size: 16px; // converted to 1rem
}
 
/*`Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers*/ 
.ignore {
    border: 1Px solid; // ignored
    border-width: 2PX; // ignored
}
```

### 1.2、不考虑dpr的rem自适应方案
dpr引入与移动端自适应布局的关系
[移动端尺寸自适应与dpr无关](https://segmentfault.com/a/1190000015409435?utm_source=tag-newest)

对于很多项目来说，其实1px问题并没有那么重要，也完全可以直接去掉dpr,不考虑dpr的1px问题。也有少数情况下的dpr的识别可能存在问题，比如qht的一个内嵌页面,就出现了dpr无法正常识别的问题。


实现逻辑：在上面1.1方案的基础上，dpr全部处理为1即可，也就是meta标签后续不用做scale。

1. 设置meta viewport标签 

2. 计算rem
font-size计算把dpr=1即可,公式：
> rem = document.documentElement.clientWidth  / blocks;

3. 横屏等页面resize情况的处理

4. css样式编写
 * sass/less转换公式写法,dpr=1即可
 * postcss-pxtorem方案编写css,配置不变 
 * 1px的问题通过media查询解决或直接不解决

### 1.3 组件库组件REM方案
结合1.1和1.2的思路，现在在前端组件库中提供rem组件完成rem初始化，需要结合sass/less公式或者postcss-pxtorem来编写css使用
初始化：
```html
 <meta name="viewport" data-content-max  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
`data-content-max`标识开启最大最小页面宽度限制

```javascript
  import InitRem from '@libs/rem/1.0.0/index.js'
  InitRem({
     useDPR:true,//是否使用dpr,少数场景下可能无法使用dpr
     isControlMaxMinWidth:true,//是否配置页面最大最小宽度 默认false 是通过js动态计算插入实现的 无需再进行css特殊处理
     defalutMinWidth:320,//配置页面最大最小宽度情况下的自小宽度
     defalutMaxWidth:540,//配置页面最大最小宽度情况下的自大宽度
  })
```
注意使用vant组件的时候，vant组件是375大小编写的

## 二、vw方案的使用
* vw:是Viewport's width的简写，是css3支持的一个相对长度单位，1vw表示相对于屏幕宽度（window.innerWidth）的1%;


[移动端布局之postcss-px-to-viewport（兼容vant）](https://www.cnblogs.com/zhangnan35/p/12682925.html)


1. 设置head中的meta viewport 标签：
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
2. px转化为vw
安装postcss-px-to-viewport
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




## 三、两种方案的比较和结合使用
### 3.1两种方案的比较
1. rem方案：
+ 因为需要js去控制根元素上的font-size 可能会存在页面上闪一下的情况,最好考虑单独引入初始化
+ scale支持度问题,即便同一款手机,不同app上的内置浏览器

2. vw方案：
+ 可能会存在部分机型的支持问题，但按照现在的时间点来看，这个问题已经不太明显了
+ 无法设置页面最大最小布局

[参考文章-细说移动端 经典的REM布局 与 新秀VW布局](https://www.cnblogs.com/imwtr/p/9648233.html#s4-1)

[参考文章]( https://www.w3cplus.com/css/vw-for-layout.html)

### 3.2两种方案的结合使用

为了解决纯VW布局不能设置最大最小宽度的问题，可以在vw方案中引入REM。
1. scale=1,不做动态调整,不考虑dpr
2. 假如需要考虑页面最大最小宽度,直接利用media查询来调整html最大最小font-size和body最大最小宽度即可。

#### 3.2.1 scss/less控制页面最大最小方案
使用vw来设置html的font-size
通过配置html根元素的font-size为vw单位，并且配置最大最小的像素px值，在其他css代码中可以直接使用rem作为单位

sass编写
```css
html {
    @include root-font-size();
}

```
sass编写

```css
/* 移动端页面设计稿宽度 */
$design-width: 750;

/* 将移动端页面分为10块 */
$blocks: 10;
/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/* 单位px转化为rem */
@function px($px) {
    @return $px/$design-width*$blocks+rem;
}

/*
    rem与px对应关系，1rem代表html font-size值（为一块的宽度），$rem即为$px对应占多少块

        $px                    $rem
    -------------    ===    ------------
    $design-width              $blocks
*/

/* html根元素的font-size定义，简单地将页面分为$blocks块，方便计算 */
@mixin root-font-size() {
    font-size: 100vw / $blocks;

    /* 最小宽度定义 */
    body {
        @include container-min-width();
    }

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

````Javascript
//       sass
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
````
也可以考虑自己改写成js

#### 3.2.2 项目示例
目前的项目eduction-trade使用该方案,在页面最大最小限制方面，zhi
 
1. html的font-size计算
原本的html的字体大小px-rem计算公式
>`document.documentElement.clientWidth / blocks = 1rem;`

则html的字体大小vw-rem
>`html{ font-size：100vw/blocks}`
 blocks=7.2,计算可得html使用vw设置的字号:13.88888889vw,页面最大宽度7.2rem
 需要在html页面中直接插入或者标识出转化忽略


2. 设计稿公式转换
>`designWidth/blocks=1rem; 1px = 1rem*blocks/designWidth`

vant-375px,UI设计稿刚好也是375px

````less
@block：7.2;
@body-width:7.2rem;
@design-width:375;
html{
  font-size:100vw/@block;
}

.px2rem(@name，@px){
  @{name}：@block/@design-width*@px*1rem
}
@media screen and(min-width:720px){
  html{
    font-size:100px;
  }
}
````
2. 设计稿公式转换的另一种方法

安装postcss-pxtorem
在项目根目录下添加.postcssrc.js文件

```javascript
module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-pxtorem": {
      rootValue: 375/7.2, // 根节点1rem对应px 公式：设计稿尺寸/block
    }
  }
}
 ```


## 四、问题
可以思考下的问题：
1、rem方案中的1px的问题是怎么解决的？

2、上面给出的vw和rem混用方案中，设置元素的宽、高的时候用的vw还是rem作为单位？

项目中遇到的问题;
 1. keyup在iPhone的支持度问题

 iPhone在keyup事件上支持有问题，最后使用的change input keyup 三者相互结合解决的问题
 
 2. 关于font-size的选择问题

   rem方案中直接使用rem作为font-size单位和css media查询根据dpr设置font-size的优劣和选择


### 五、调试

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