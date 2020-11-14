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

不考虑dpr
`html font-size： document.documentElement.clientWidth / blocks = 1rem;`

* html使用vw设置的字号:13.88888889vw
`blcok=7.2       html font-size：100vw/blcok`

* 设计稿公式转换
`designWidth/block=1rem; 1px = 1rem*block/designWidth`

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

100vw

75  
37.5

100/
### 横屏问题解决


https://github.com/youzan/vant-demo


### 其他小问题
期货通不支持scale