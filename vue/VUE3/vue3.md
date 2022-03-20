### 一、vue2和3部分差异
### 1.1双向绑定上的实现差异
在2.x版本中 Vue 使用了 Object.defineProperty() 方法改写了一个对象，在它的 getter 和 setter 里面埋入了响应式系统相关的逻辑，使得一个对象被修改时能够触发对应的逻辑。在3.0 版本中，Vue 会使用 Proxy 来完成这里的功能
### 1.2关于mixins和composition-api
mixins其实算是vue和react的相似写法，但是因为mixins带来的命名冲突和隐含的依赖关系，等原因被认为是有害的，在16年就被宣布将从react移除.
[译文：Vue3 Composition API 是如何取代 Vue Mixins 的？](http://caibaojian.com/vue3-composition-api.html)
VUE的API,常规的option配置写法随着业务增加,代码量也会随之膨胀,导致可维护性和服用性不高，而composition-api就是为了解决这个问题而生的

#### 1.3  option-api
vue3的option-api写法和vue2的一致

###  二、component—api

#### 2.1 setup基础使用
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

#### 2.2 composition-api
vue提供函数(部分)在setup中使用:
1. reactive
2. ref
3. toRefs
4. watchEffect
5. computed
6. watch
7. provide/inject
都是以函数形式进行调用



#### 2.3 ref和reactive区别

reactive 和 ref 都是用来定义响应式数据的。

* ref():返回一个响应式对象(RefImpl)，其内部值可通过其 value 属性被访问到。可以将其用于基本类型，也可以用于对象
* reactive(): 将一个对象作为其输入并返回一个对其的响应式Proxy对象(Proxy) 
 
1. reactive更推荐去定义复杂的数据类型,如对象, ref 更推荐定义基本类型，

2. ref 和 reactive 本质我们可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value
 
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
像在正常的 JavaScript 中声明基本类型变量和对象变量那样去使用 ref 和 reactive 即可只要用到 reactive 的时候，要记住从 composition 函数中返回反应式对象时得使用 toRefs()。这样做减少了过多使用 ref 时的开销
````javascript
// toRefs() 则将反应式对象转换为普通对象，该对象上的所有属性都自动转换为 ref
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
 
  return toRefs(state)
}
 
const {foo, bar} = useFeatureX();

````
toRefs: 针对组合函数返回响应式对对象时使用 toRefs, 本质上是帮我们做了一层getter和setter处理，解构就可以得到响应式的数据，这也就降低了一些关于ref的心智负担

但是要注toRefs是浅包裹,如果reactive对象a中存在嵌套的对象b,那么只用toRefs包裹a后，结果b中的数据依然会存在丧失响应的问题
示例见：
[Vue Composition API 陷阱](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496480&idx=1&sn=eec778b7d6a6709dfc86bd525ea89a52&source=41#wechat_redirect)



#### 2.5 生命周期的hooks
watchEffect


#### 2.6其他注意点
* 关于 watch:对于监听对象是分隔字符串时，需要在选项参数中指定 deep: true
* 迁移 vue3 时，setup 中只保留了不再有on,on,once, $off 等方法，只保留了 emit，
* vue3.X 中去掉了.sync,用v-model代替 并且同一个组件中不仅限于只有一个v-model
* 在 Vue3 中组件没有filters选项，迁移过程中，可以用computed/methods替代


#### 2.6 
生命周期的hooks

#### 2.7 getCurrentInstance
获取实例
官方文档不推荐在应用中使用，需要在setup中使用

## 三、 <script setup>
`<script setup>`是setup的语法糖
需要一些方法来完成定义props等定义
1. defineProps defineEmits
2. defineExpose
3. useSlots和useAttrs


## 四、样式问题
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



## 四、jsx
babel-preset-jsx




## 五、问题
解构可能带来的问题

 
 