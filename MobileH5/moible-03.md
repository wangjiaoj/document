## 一、手机端方案整理对比
## 1.1 em 
   目前维护的项目中应该没有em的
## 1.2 rem
   
## 1.3 vw

## 1.4 vant 
使用px实现的，可以通过插件等方式配饰rem布局

### vant转化为rem和vw的方案   
vant提供了转化为rem和vw的两个方案
(vant-demo)[https://github.com/youzan/vant-demo/tree/master/vant]

(Vant UI 组件库如何做rem适配?)[https://www.cnblogs.com/changxue/p/11322855.html]
假如设计稿750
````javascript
const path = require('path');

module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,
        unitPrecision: 6,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }

}
````


### 使用vw来做rem转换的简单方案
目前的项目punch/trade

该方案不考虑dpr
1. html的font-size计算
html的字体大小px-rem计算公式
>`document.documentElement.clientWidth / blocks = 1rem;`


 html的字体大小vw-rem计算公式
>`blocks=7.2;   100vw/blocks=1rem;`

 计算可得html使用vw设置的字号:13.88888889vw,页面最大宽度7.2rem

>`html{ font-size：13.88888889vw}`

2. 设计稿公式转换
>`designWidth/blocks=1rem; 1px = 1rem*blocks/designWidth`

vant-375px,UI设计稿刚好也是375px

````less
html{
  font-size:100vw/7.2;
}
@body-width:7.2rem;
.px2rem(@name，@px){
  @{name}：7.2/375*@px*1rem
}
@media screen and(min-width:720px){
  html{
    font-size:100px;
  }
}
````
2. 设计稿公式转换的另一种方法

安装postcss-pxtorem,在项目根目录下添加.postcssrc.js文件
```javascript
module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-pxtorem": {
      rootValue: 375/7.2, // 根节点1rem对应px 公式：设计稿尺寸/block
    }
  }
}
 ````
100vw

75  
37.5

100/
### 横屏问题解决


https://github.com/youzan/vant-demo


### 其他小问题
期货通不支持scale