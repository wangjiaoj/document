# Vue3
## 一、`reactive` ,`ref`, `toRef` 和`toRefs` 
###  1.1 基础概念
  1. 这四个都是Vue3的CompositionAPI 创建响应式对象的方式：
  reactive 和 ref 都是用来定义响应式数据的。
  * ref():返回一个响应式对象(RefImpl)，其内部值可通过其 value 属性被访问到。
  * reactive(): 将一个对象作为其输入并返回一个对其的响应式Proxy对象(Proxy) 
  * toRef(): 可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。按我的理解就是要将响应式对象中的某个属性单独给外部使用时候。
  * toRefs和toRef 功能是一致的，但是可以批量创建多个ref对象。
 
  2. proxy
  Proxy有几个特点：

  * 代理的对象是不等于原始数据对象
  * 原始对象里头的数据和被Proxy包装的对象之间是有关联的。即当原始对象里头数据发生改变时，会影响代理对象；代理对象里头的数据发生变化对应的原始数据也会发生变化。

  * 需要记住：是对象里头的数据变化，并不能将原始变量的重新赋值，那是大换血了

  [深入源码理解reactive和ref](https://juejin.cn/post/6992976063479431175)

 


### 1.2 ref和reactive区别

  1. reactive更推荐去定义复杂的数据类型（如对象）, ref 更推荐定义基本类型(String，Number，Boolean，Symbol)

  2. ref 和 reactive 本质我们可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value;
    vue3利用proxy实现响应式，而proxy不能代理基础类型，vue3就只能给他包装成一个对象再进行代理，基础类型变成响应式读取值的时候需要.value

  3. 使用reactive定义的数组，直接重新赋值无响应
  直接赋值导致响应性丢失的原因是：重写赋值后,原来数据的代理函数和最新的代理函数不是同一个，无法触发
  ````javascript
      //失败示例
      setup(){
      let list = reactive([{title:"product001",detail:"my detail story"},
        {title:"product001",detail:"my detail story"},
        {title:"product001",detail:"my detail story"}])
        onMounted(() => {
          get_surveyData().then((res:any)=>{
            //失败 直接赋值丢失了响应性
            // list = res.list; 
            //成功赋值方案
            list.push(...res.list);
          }).catch()
        })      
      }

    //解决方案
    // 1. 直接使用ref
    // 2. 依然沿用reactive,使用{}包裹数组
  
  ````
  
  4. 注意：
  用 reactive 时，要注意如果使用了对象解构（destructure），会失去其响应性。所以需要定义一个指向对象的引用，并通过其访问状态属性。
  像在正常的 JavaScript 中声明基本类型变量和对象变量那样去使用 ref 和 reactive 即可,只要用到 reactive 的时候，要记住从 composition 函数中返回反应式对象时得使用 toRefs()。这样做减少了过多使用 ref 时的开销
  ````javascript
  // toRefs() 则将响应式对象转换为普通对象，该对象上的所有属性都自动转换为 ref
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
    return toRefs(state)
  }

  //消费组件 可以在使用的时候,在不丢失响应性的情况下对返回的对象进行解构/展开
  export default {
    setup() {
      // 可以在不失去响应性的情况下解构
      const { foo, bar } = useFeatureX()

      return {
        foo,
        bar
      }
    }
  }

  ````


### 1.3 `toRef` 和`toRefs` 
  toRefs: 针对组合函数返回响应式对对象时使用 toRefs, 本质上是帮我们做了一层getter和setter处理，解构就可以得到响应式的数据，这也就降低了一些关于ref的心智负担
  当被toRefs包裹的对象中的嵌套对象,注意不要将嵌套对象逐级结构/展开

  

存疑：
  要注意toRefs是浅包裹,如果reactive对象a中存在嵌套的对象b,那么只用toRefs包裹a后，结果b中的数据依然会存在丧失响应的问题
  示例:部分解决方案有点问题
  [Vue Composition API 陷阱](https://juejin.cn/post/6855473771013226503)


## 二、composition—api

### 2.1 setup基础使用
  1. setup(props,context)
    * props:用于获取组件中定义的props
    * context:setup中不能使用this,可以使用context获取插槽
  2. 在模板或被引用情况情况使用的变量和方法都要在最后return
  3. $refs使用:在setup中通过`const xx = ref(null)`再次定义,会在onMounted中自动给变量赋值proxy对象
  4. props变量监听(watch):使用函数作为监听名称传参
    > ()=>props.xx
  5. $emit使用:`context.emit()`
  6. route监听(watch),需要使用useRoute()函数调用后返回的对象作为监听对象名称
  7. 注意像inject只能在setup中调用一次,这个在componets-api中容易忽略
  ````vue
  <template>
    <div class="eidtPage">
      <div @click="changeHandle">{{text}}</div>
      <div ref="eidt"></div>
    </div>
  </template>
  <script>
  import {useRoute} from 'vue-router'
  import {watch,onMounted,inject} from 'vue';
  export default {
      props{
        id:{
          type:String,
          default:'',//option-api写法定义即可
        }
      },
      setup(props,context){
        const route = useRoute()
        const text = ref(null);
        const getInfo = inject('getUserInfo');
        //注意inject不要在setup中反复调用,只能调用一次
        onMounted(() => {
          //初次渲染后，Dom元素会被赋值给ref
          console.log(text.value);
        })    
        const popShow=()=>{
          edit.value.showPop()
        } 
        const changeHandle=()=>{
          context.emit()
        }
        watch(()=>props.id,(old,new)=>{
            //watch-props传参示例
        })
        watch(route,(from,to)=>{
            //watch-route示例
        })
        return {
          text,
          popShow
        }
      }
  }
  </script>  
  ````



### 2.2 vue提供函数(部分)在setup中使用:
  1. reactive
  2. ref
  3. toRefs
  4. watchEffect
  5. computed
  6. watch
  7. provide/inject
  都是以函数形式进行调用





### 2.3 生命周期的hooks
  watchEffect
  watch

### 2.4 其他注意点
  1. 语法上
  * 关于 watch:对于监听对象是分隔字符串时，需要在选项参数中指定 deep: true
  2. 心智模型问题
  * 心智模型上需要注意关于hook引用解构带来的问题
  * 另外可能主要要注意composition-api不只是需要在功能复用的时候才做抽取,而且可能需要从功能设计层面一开始就按照逻辑关注点等进行抽取开发,
  逻辑关注点是指表达同一个业务的代码内聚到一起，这也是单一职责的指导思想，我们内聚的不应该技术类型，而是业务逻辑，因为触发代码变更的往往是业务需求，因此把相同变更理由的代码放在一起，这才不会导致散弹式修改。维护性体现在代码是否符合单一职责原则，单一职责就是把相同的业务代码内聚到一个地方。
  [不要再用vue2的思维写vue3了](https://juejin.cn/post/6946387745208172558#heading-1)
  个人认为这方面的思维转变可以考虑参考react-hook的编写,个人看法composition-api其实就是向react-hook靠近


## 三、vue3其他新特性
### 3.1 废弃
  1. 迁移 vue3 时，setup 中只保留了不再有on,once, $off 等方法，只保留了 emit，部分eventBus功能可能需要自行实现
  2. ue3.X 中去掉了.sync,用v-model代替 并且同一个组件中不仅限于只有一个v-model
  3. 在 Vue3 中组件没有filters选项，迁移过程中，可以用computed/methods替代
### 3.2 新增特性
  1. Fragment 
  Vue 3 现在正式支持了多根节点的组件，也就是片段Fragment,应该是参考了react的Fragment
  2. Suspense 实验性
### 3.2 内置新组件
  1. <Teleport></Teleport> 
  Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件。
  参数:to
  
  生命周期的hooks

#### 3.2 API
1. getCurrentInstance
获取实例
官方文档不推荐在应用中使用，需要在setup中使用



#### 3.3
patchFag静态标识
优化跨端问题
v-memo缓存html模板
自定义渲染器
css动态变量注入

## 四、 <script setup>
  `<script setup>`是setup的语法糖
  需要一些方法来完成定义props等定义
  1. defineProps 和defineEmits API 来替代 props 和 emits
  2. defineExpose来主动暴露组件属性
  3. useSlots和useAttrs
  写法：
  1. `<script setup>`中无需return 声明的变量、函数以及import引入的内容，即可在`<template/>`使用
  2. `<script setup>`语法糖里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>`中的代码会在每次组件实例被创建的时候执行
  3.`<script setup>`引入组件将自动注册

## 五、样式问题
  vue3中深度选择器>>>和/deep/和::v-deep被弃用
  需要使用.deep(<inner-selector>)方式改变原来的/deep/和::v-deep使用方式
  ````javascript
    <style>
    //警告例子
    /deep/ .main{
      background:#333;
    }
    >>> .main{
      background:#333;
    }
    //正确例子
    .deep(.deep){
      background:#333;
    }
    
    </style>
  ````
  有时候使用的时候却不会提示,需要再确认下



## 六、jsx
  babel-preset-jsx




## 七、问题
  解构可能带来的问题

 
 