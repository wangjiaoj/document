## 一、antdv

1. select
 v-model:value问题


 2. upload问题

 一直uploading，没有done状态
 后来通过修改绑定的myFileList=list触发了done
 但是再后来抽取成hook之后，因为ts报错注释了myFileList=list反而不再出现该问题 




 2. hook写法上传组件
 hook是否必须是在里面有自定义响应式数据