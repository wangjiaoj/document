# VUE+TS实践(以VUE3和TS为主)
1. TS上的类型声明尽量type都使用小写

 
## 二、vue3+TS实践
1. Vue3+TS
 VSCODE注意禁用vetur(给vue2用的),安装Volar插件 
 实践上推荐`defineComponent`,无论是option-api还是component-api的编程方式都可以支持,并且在代码上也相对于更加易于阅读
 options-api代码示例:
```javascript
import { defineComponent, PropType } from 'vue'

interface Student {
  name: string
  class: string
  age: number
}

const Component = defineComponent({
  props: {
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    student: {
      type: Object as PropType<Student>,
      required: true
    }
  },
  data() {
     return {
      	message: 'Vue3 code style'
    }
  },
  computed: {
    reversedMessage(): string {
      return this.message.split(' ').reverse().join('')
    }
  },
  methods:{

  }
})

```
vue 对 props 进行复杂类型验证的时候，就直接用 PropType 进行强制转换， data 中返回的数据也能在不显式定义类型的时候推断出大多类型， computed 也只用返回类型的计算属性即可，代码清晰，逻辑简单，同时也保证了 vue 结构的完整性。

component-api代码示例：
```javascript
<template>
<div>{{text}}</div>
</template>
import {ref, defineComponent, onMounted ,watch,provide} from 'vue'
import {useRouter, useRoute } from 'vue-router'
const Component = defineComponent({
  name:'',
  components:{

  },
  setup(){
    const router = useRouter()
    const route = useRoute()
    const text = ref()
    onMounted(()=>{
      //
    })
    watch(route,(from,to)=>{

    })
    return {
      text
    }
  }
})

```

2. defineComponent, PropType
> import { defineComponent, PropType } from 'vue';
古纳于
 

3. 关于vue插件
使用vue3之后,vetur给出类似如下报错(也可能是其他类似内容报错)
>Module ‘“vue“‘ has no exported member ‘ref‘
查找原因是vetur报的错，大概是vue3+ts检测,功能还没更新过来(上次更新在2019年,应该是适用vue2了)
重新安装Volar插件`Vue Language Features (Volar)`(针对Vue3的插件)和`TypeScript Vue Plugin (Volar)`



## 二、TS使用中问题

### 1.1. TS的第三方全局变量定义
```javascript
declare global {
    interface Window { MyNamespace: any; }
}
window.MyNamespace = window.MyNamespace || {};
```
 

### 1.2. TS报错
1. 直接引用js文件中的函数的时候,可能会报错文件没有类型 
>Could not find a declaration file for module '/xx/xx.js' implicitly has an 'any' type

解决方案：
 On the other hand, if you don't care about the typings of external libraries and want all libraries without typings to be imported as any, you can add this to a file with a .d.ts extension:
 如果你不关心一用文件的type,可以在`.d.ts` 文件中配置如下：
>declare module '*';
[stackoverflow上的问答](https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam)
2. vue + typescript：Property 'xxx' does not exist on type 'Vue'
> this.$parent.paymentType();
修改为
>(this as any).$parent.paymentType();
类似像是inject之类的注入函数也可能报错类似问题,也可以用该方案解决

## 三、 HOOK

[走近Ts，用了爽，用后一直爽（二)](https://segmentfault.com/a/1190000038540091)

[Vue3拥抱TypeScript的正确姿势](https://juejin.cn/post/6875713523968802829)

[优雅的在Vue3中使用Vuex「TypeScript版」](https://www.imsle.com/archives/105.html)


[Vue Composition API 陷阱](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496480&idx=1&sn=eec778b7d6a6709dfc86bd525ea89a52&source=41#wechat_redirect)



https://blog.csdn.net/lanseguhui/article/details/117809376?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-117809376.pc_agg_new_rank&utm_term=Vue+defineComponent+%E4%B8%8D%E5%86%99+%E4%B9%9F%E6%8A%A5%E9%94%99&spm=1000.2123.3001.4430

[TS报错对照表](https://blog.csdn.net/weixin_42659625/article/details/81002985)

```javascript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*';
