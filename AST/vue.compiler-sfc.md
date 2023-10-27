# @vue/compiler-sfc 
https://juejin.cn/post/7115966428343189540?searchId=202309211321265C3BEDA4E4409493F47B#heading-2

## 一 、 SFC
SFC是vue中重要的一环，也是vue3中对于静态节点进行缓存提升的重要位置
SFC -- single file Component 单文件组件，以 .vue 进行结尾，这个文件浏览器也不会识别，最终也是要被转换成js代码，@vue/compiler-sfc的作用就是把单文件组件编译成为js代码。
### 1.1 parse
>const descriptor = compilerSfc.parse(code).descriptor

descriptor中包含filename,source,template,script,scriptSetup,styles,customBlocks,cssVars,slotted,shouldForceReload
template、script、style等三块代码，分别表示模版、脚本、样式三块

唯一的不同就是编译后的结果从原来的script上迁移到scriptSetup上

### 1.2 template的结构