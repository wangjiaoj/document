### 一、vue2和3部分差异
### 1.1双向绑定上的实现差异
在2.x版本中 Vue 使用了 Object.defineProperty() 方法改写了一个对象，在它的 getter 和 setter 里面埋入了响应式系统相关的逻辑，使得一个对象被修改时能够触发对应的逻辑。在3.0 版本中，Vue 会使用 Proxy 来完成这里的功能
### 1.2关于mixins和composition-api
mixins其实算是vue和react的相似写法，但是因为mixins带来的命名冲突和隐含的依赖关系，等原因被认为是有害的，在16年就被宣布将从react移除.
[译文：Vue3 Composition API 是如何取代 Vue Mixins 的？](http://caibaojian.com/vue3-composition-api.html)
VUE的API,常规的option配置写法随着业务增加,代码量也会随之膨胀,导致可维护性和服用性不高，而composition-api就是为了解决这个问题而生的

###  二、component—api

#### 2.1 option-api

#### 2.2 composition-api
提供函数:
1. reactive
2. ref
3. toRefs
4. watchEffect
5. computed
6. watch
7. provide/inject
都是以函数形式进行调用
关于watch的route监听,需要使用useRoute()函数调用后返回的对象作为监听对象名称
#### 2.3 ref和reactive区别
如果打印ref定义的数据,打印结果是一个被对象包裹的响应的数据,使用reactive的方式和纯变量声明的方式打印结果是一样的
1. reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型，

2. ref 和 reactive 本质我们可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value

使用ref定义基本数据类型,ref也可以定义数组和对象,不过,疑似是实际上还是使用了reactive
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
生命周期的hooks

#### 2.4 setup
setup(props,context)

1. 在setup中通过ref再次定义
````javascript
<template>
  <div ref="eidt"></div>
</template>
<script>
export default {
    setup(){
      const edit = ref(null);
      onMounted(() => {
        //初次渲染后，Dom元素会被赋值给ref
        console.log(edit.value);
      })     
      return {
        edit
      }
    }
}
</script>  
````
 
#### 2.5 getCurrentInstance
获取实例
官方文档不推荐在应用中使用，需要在setup中使用

## 样式问题
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


 
 