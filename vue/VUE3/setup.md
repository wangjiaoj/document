# `<script setup>`单文件组件
  官方推荐的结合TS的Vue3最佳实践`TS+setup+Volar`
## 一、简介
  `<script setup>`是setup的语法糖
  
  需要一些方法来完成定义props等定义
  1. defineProps 和defineEmits API 来替代 props 和 emits
  2. defineExpose来主动暴露组件属性
  3. useSlots和useAttrs
  
  写法：
  1. `<script setup>`中无需return 声明的变量、函数以及import引入的内容，即可在`<template/>`使用
  2. `<script setup>`语法糖里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>`中的代码会在每次组件实例被创建的时候执行
  3. `<script setup>`引入组件将自动注册


## 二、


用运行时声明，
要么使用类型声明。