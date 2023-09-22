# @vue/compiler-sfc 
https://juejin.cn/post/7115966428343189540?searchId=202309211321265C3BEDA4E4409493F47B#heading-2

SFC是vue中重要的一环，也是vue3中对于静态节点进行缓存提升的重要位置

SFC -- single file Component 单文件组件，以 .vue 进行结尾，这个文件浏览器也不会识别，最终也是要被转换成js代码
SFC中包含三块，template、script、style等三块代码，分别表示模版、脚本、样式三块

@vue/compiler-sfc的作用就是把单文件组件编译成为js代码



唯一的不同就是编译后的结果从原来的script上迁移到scriptSetup上