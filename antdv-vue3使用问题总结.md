# antdv-vue3使用问题总结
## 一、组件问题
1. select
 v-model:value问题


 2. upload问题

 一直uploading，没有done状态
 后来通过修改绑定的myFileList=list触发了done
 但是再后来抽取成hook之后，因为ts报错注释了myFileList=list反而不再出现该问题 




 2. hook写法上传组件
 hook是否必须是在里面有自定义响应式数据

 ## 二、table
 1. columns使用问题
 使用ref定义columns,修改值后偶放组件加载问题
 直接js定义columns,修改值后偶放组件加载问题
 解决方案:使用computed来定义columns

 2. sorter控制
 去掉排序


 3. 表头筛选等功能icon
