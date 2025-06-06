## 一、 SVG引入
SVG 使用 XML 格式定义的可伸缩矢量图图形(Scalable Vector Graphics), 图像在放大或改变尺寸的情况下其图形质量不会有所损失

1. HTML页面中使用`<embed>` ,`<object>`,`<iframe>`,`<img>`等标签引用;

2. 作为CSS背景 ;

## 二、项目打包中使用svg
几种思路介绍：[阿里巴巴适量图标Web 端使用](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)
[Vue 加载 svg icon](https://www.jianshu.com/p/3d3730fe155c)
### 2.1 直接在代码中插入svg,应该是将svg图标作为组件之类的用法
问题：同一个svg可能反复引入

### 2.2 使用图标字体cdn的方式，但是直接不在本地管理svg图标,本质上是字体
使用方法上:
1. unicode 引用
unicode是字体在网页端最原始的应用方式，特点是：
* 兼容性最好，支持ie6+，及所有现代浏览器。
* 支持按字体的方式去动态调整图标大小，颜色等等。
* 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。
* 注意：新版iconfont支持多色图标，这些多色图标在unicode模式下将不能使用，如果有需求建议使用symbol的引用方式

2. font-class 引用
font-class是unicode使用方式的一种变种，主要是解决unicode书写不直观，语意不明确的问题。
与unicode使用方式相比，具有如下特点：
* 兼容性良好，支持ie8+，及所有现代浏览器。
* 相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。
* 因为使用class来定义图标，所以当要替换图标时，只需要修改class里面的unicode引用。
* 不过因为本质上还是使用的字体，所以多色图标还是不支持的。

````css
.ico-star:before {
    content: "\ea14";
}
````

### 2.3 利用symbol标签特性处理
结合svg-sprite-loader使用，见`svg使用-svg-sprite-loader`

## 三、vue-cli中用到的一些svg的loader
1. svg-sprite-loader
见`svg使用-svg-sprite-loader`

2. vue-svg-loader ：
vue-svg-loader-Webpack加载器，可让您将SVG文件用作Vue组件 
````vue
<template>
  <nav>
    <a href="https://github.com/vuejs/vue">
      <VueLogo />
      Vue
    </a>
    <a href="https://github.com/svg/svgo">
      <SVGOLogo />
      SVGO
    </a>
    <a href="https://github.com/webpack/webpack">
      <WebpackLogo />
      webpack
    </a>
  </nav>
</template>
<script>
import VueLogo from './public/vue.svg';
import SVGOLogo from './public/svgo.svg';
import WebpackLogo from './public/webpack.svg';

export default {
  name: 'Example',
  components: {
    VueLogo,
    SVGOLogo,
    WebpackLogo,
  },
};
</script>
````
 3. url-loader:svg转化为base64
 简单粗暴,可以考虑限制一下大小
 webpack5-已被废弃

 ### 四、base64

两者使用在不同分辨率下放大缩小都不会失真或者变模糊??


[CSS中内联SVG图片有比Base64更好的形式](https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/)
