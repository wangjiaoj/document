## 一、按需引入elementUI
1. 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
更改.babelrc文件
````javascript
    "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
````
2. 创建文件导入自己需要的组件

````javascript
import { Select, Option, OptionGroup, Input, Tree, Dialog, Row, Col } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
  }
}

export default element
````
3. main.js
````javascript
// css样式还是需要全部引入
    import 'element-ui/lib/theme-chalk/index.css'
    import element from './element/index'
    Vue.use(element)
````

## 一、按需引入echart
1. 新建文件
````javascript
const echarts = require("echarts/lib/echarts")

require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/line");
require("echarts/lib/component/grid");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require('echarts/lib/component/graphic');
export default echarts;
````
2. main.js
````javascript
// common目录下的echarts, 按需引入
import echarts from 'common/echarts'
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts
````