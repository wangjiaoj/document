## vue3使用问题

### 1. vue3 v-if的组件 ref 无效

https://mp.weixin.qq.com/s?__biz=MzIyMDkwODczNw==&mid=2247503939&idx=1&sn=849ce56fee8038c9f1fd12b6f166f7fc&chksm=97c64deda0b1c4fbdc5091586fa6a5bc40f156e0a43961894907c9ee3c467bf93f0d48f5f955&scene=21#wechat_redirect


### 2. watchEffect
watchEffet触发时机问题，
页面中试图通过watchEffet取值store中的项目选中区域数据currentRegion并生成当前页面数据的选中区域currentPageRegion
（当前页面的currentPageRegion不会影响store中的currentRegion，但是store中的currentRegion变动会影响到当前页面的currentPageRegion,当前页面可能会向下一级继续选择）
但是在修改自己当前页面的数据的时候，会触发watchEffet





### 二、arco
 表格组件,data中缺失字段会导致报错vnode未定义或丢失