# `<script setup>`单文件组件
  官方推荐的结合TS的Vue3最佳实践`TS+setup+Volar`

## 一、简介
  `<script setup>`是setup的语法糖
  
### 1.1 需要一些方法来完成定义props等
  1. defineProps 和defineEmits API 来替代 props 和 emits
  2. defineExpose来主动暴露组件属性
     使用 `<script setup>` 的组件是默认关闭的，也即通过模板 `ref` 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。需要通过该方法进行暴露
    
  3. useSlots和useAttrs
  
### 1.2  写法：
  1. `<script setup>`中无需return 声明的变量、函数以及import引入的内容，即可在`<template/>`使用
  2. `<script setup>`语法糖里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>`中的代码会在每次组件实例被创建的时候执行
  3. `<script setup>`引入组件将自动注册


## 二、存在问题：
   一是目前 defineProps 还不支持使用从其他文件导入的 TS 类型，官网的原文是：

    现在还不支持复杂的类型和从其它文件进行类型导入。理论上来说，将来是可能实现类型导入的。
    这块需要补全

  用运行时声明，
  要么使用类型声明。


## 三、 componsition-api 的编写注意事项
 
  ### 3.1  逻辑关注点抽取开发
  注意composition-api不只是需要在功能复用的时候才做抽取,而且可能需要从功能设计层面一开始就按照逻辑关注点等进行抽取开发,
  逻辑关注点是指表达同一个业务的代码内聚到一起，这也是单一职责的指导思想，我们内聚的不应该技术类型，而是业务逻辑，因为触发代码变更的往往是业务需求，因此把相同变更理由的代码放在一起，这才不会导致散弹式修改。维护性体现在代码是否符合单一职责原则，单一职责就是把相同的业务代码内聚到一个地方。
  [不要再用vue2的思维写vue3了](https://juejin.cn/post/6946387745208172558#heading-1)
  
  个人认为这方面的思维转变可以考虑参考react-hook的编写,个人看法composition-api其实就是向react-hook靠近
  
  [Vue3必学技巧-自定义Hooks-让写Vue3更畅快](https://juejin.cn/post/7083401842733875208)