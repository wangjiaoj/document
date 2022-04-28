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

 defineProps 或 defineEmits 要么用运行时声明， 要么使用类型声明。相关代码示例解释：
```vue
<template>
  <div class="studyContent">
    <div>{{a}}</div>
    <div>{{a2}}</div>
    <div>{{pbook.title}}</div>
  </div>
</template>
<script lang='ts' setup>
import { inject,ref,Ref } from "vue";
 
//! defineProps 或 defineEmits 只能是要么使用`运行时声明`，要么使用`类型声明`。同时使用两种声明方式会导致编译报错。
 
//> defineProps
// 仅限类型的 defineProps 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，提供了 withDefaults 编译器宏：
//? 运行时声明 的方式只能限制参数类型，无法限制是否必传、和默认值
// const props = defineProps({
//   child: String,
//   sda: String, //undefined
//   strData: String,
//   arrFor: Array
// })
 
//? 类型声明 的方式1：能限制是否必传 > defineProps 单独使用该api
// interface arrfor {
//   name:string,
//   children?:Array<arrfor>
// }
// const props = defineProps<{
//   child?: string|number,
//   sda?: string, //undefined
//   strData?: string,
//   arrFor: []
// }>();
 
 
//? 类型声明 的方式2：能限制是否必传，以及默认值
interface Props {
  child: string|number,
  sda?: string, // 未设置默认值，为 undefined
  strData: string,
  msg?: string
  labels?: string[],
  obj?:{a:number}
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two'],
  obj: () => { return {a:2} }
})
console.log(props,props.msg);
 
 
//> defineEmits
// // 等效this.$emit('eventName','data')
// const emits = defineEmits(['update', 'delete'])
// emits('delete','测试')
 
// emits的类型声明写法，()的e id只是形参名字，不影响其他。
const emit = defineEmits<{
  (e: 'elPsyKongroo', id: number): void
  (e: 'update', value: string): void
}>()
setTimeout(() => {
  // emit('elPsyKongroo', 2)
}, 1000*2);
 
//> defineExpose
interface exFace {
  ex1:Ref<string>,
  ex2?:number
}
let ex1 = ref('1')
let exObj:exFace = {
  ex1,
}
// 源码类型: const defineExpose: (exposed?: Record<string, any>) => void
defineExpose(exObj)
 
 
//> inject
// interface InjectionKey<T> extends Symbol {}
// // 没有默认值
// function inject<T>(key: InjectionKey<T> | string): T | undefined
// // 有默认值
// function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
 
// // 有工厂函数
// function inject<T>(
//   key: InjectionKey<T> | string,
//   defaultValue: () => T,
//   treatDefaultAsFactory: true
// ): T
let defaultFn = inject('ab12',()=>'雏见泽'+'棉流',true) 
console.log(defaultFn);
 
 
interface Book {
  title: string
  year?: number
}
let a = inject<Ref>('static') // 无默认值
  //! 即使在子组件可以直接修改，但最好不要这么做，将会影响到provide的父组件以及其他所有inject的子组件。
  //! 这会导致 溯源 非常麻烦，所以修改方式统一为在父组件provide一个方法，子组件调用进行修改！
  // a.value = '直接作死修改'
let pbook = inject<Book>('pbook') // 无默认值
let changeFn:(val:string)=>void = inject('changeFn') // 无默认值
let a2 = inject('static2','????') // 有默认值
let a3 = inject('static3') // 无默认值且未找到则为 undefined
let globalGuide = inject('guide') // 访问全局的
 
setTimeout(() => {
  changeFn('injectFn传参')
}, 5000);
</script>
  ```
## 三、 componsition-api 的编写注意事项
 
  ### 3.1  逻辑关注点抽取开发
  注意composition-api不只是需要在功能复用的时候才做抽取,而且可能需要从功能设计层面一开始就按照逻辑关注点等进行抽取开发,
  逻辑关注点是指表达同一个业务的代码内聚到一起，这也是单一职责的指导思想，我们内聚的不应该技术类型，而是业务逻辑，因为触发代码变更的往往是业务需求，因此把相同变更理由的代码放在一起，这才不会导致散弹式修改。维护性体现在代码是否符合单一职责原则，单一职责就是把相同的业务代码内聚到一个地方。
  [不要再用vue2的思维写vue3了](https://juejin.cn/post/6946387745208172558#heading-1)
  
  个人认为这方面的思维转变可以考虑参考react-hook的编写,个人看法composition-api其实就是向react-hook靠近
  
  [Vue3必学技巧-自定义Hooks-让写Vue3更畅快](https://juejin.cn/post/7083401842733875208)
