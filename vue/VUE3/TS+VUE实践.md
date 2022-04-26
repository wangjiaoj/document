# VUE3+TS实践
1. 参考文档
  [走近Ts，用了爽，用后一直爽（二)](https://segmentfault.com/a/1190000038540091)

  [Vue3拥抱TypeScript的正确姿势](https://juejin.cn/post/6875713523968802829)

  [优雅的在Vue3中使用Vuex「TypeScript版」](https://www.imsle.com/archives/105.html)


  [import type { DefineComponent } from ‘vue‘ 报错](https://blog.csdn.net/lanseguhui/article/details/117809376?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-117809376.pc_agg_new_rank&utm_term=Vue+defineComponent+%E4%B8%8D%E5%86%99+%E4%B9%9F%E6%8A%A5%E9%94%99&spm=1000.2123.3001.4430)


 
## 一、vue3+TS实践
 1. VSCODE注意禁用vetur(给vue2用的),安装Volar插件 
 2. 推荐`defineComponent`,无论是options-api还是composition-api,均可结合defineComponent进行使用,并且在代码上也相对于更加易于阅读
 3. 也可以沿用vue2跟TS的结合方案:`vue-class-component`或`vue-property-decorator`库,进行代码编写,但是鉴于之前vue2和这些库结合的装饰器写法,不推荐这些库的装饰器语法进行vue3+TS应用
 4. 最佳实践：推荐使用`defineComponent`或者直接使用`script setup`语法糖
  
  
### 1.1. Vue3+TS 结合defineComponent示例
  无论是options-api还是componsition-api,均可结合defineComponent进行使用。

1. `options-api + defineComponent`代码示例:

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

2. `composition-api + ts`代码示例：
  ```javascript
  <template>
     <div>{{text}}</div>
  </template>
  import {ref, defineComponent, onMounted ,watch,provide} from 'vue'
  import {useRouter, useRoute } from 'vue-router'
  interface projectInfoType  {
      title:string,
      content:string
  }           
  interface scheduleType  {
      title:string,
      name:string,
      date:string,
      state:number
  }
  interface applyListType{
      projectInfo:Array<projectInfoType>,
      schedule:Array<scheduleType>
  }
  const Component = defineComponent({
    name:'',
    components:{},
    setup(){
      const router = useRouter()
      const route = useRoute()
      const text = ref()
      let applyList:applyListType = reactive({
          projectInfo:[],
          schedule:[]
      })
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

### 1.2. defineComponent, PropType
  > import { defineComponent, PropType } from 'vue';
  defineComponent用于类型推断
 

### 1.3. 关于vue插件
  使用vue3之后,vetur给出类似如下报错(也可能是其他类似内容报错)
  >Module ‘“vue“‘ has no exported member ‘ref‘
  查找原因是vetur报的错，大概是vue3+ts检测,功能还没更新过来(上次更新在2019年,应该是适用vue2了)
  重新安装Volar插件`Vue Language Features (Volar)`(针对Vue3的插件)和`TypeScript Vue Plugin (Volar)`



## 二、TS使用中问题

 
1. 别名问题
   处vue-cli配置外,还需要在tsconfig.json中重新设置
   >path:{"'@/*'":"src/*"}

2. 声明
  关于历史项目升级vue3+TS，可能存在部分js文件无法及时全部更新成ts,另外就是依赖的一些模块
  一些模块需要在`shims-vue.d.ts`中声明
  `shims-vue.d.ts`示例：
  ```javascript
  declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  declare module '*';//解决引入js文件报错问题
  ```

## 四、TS+setup+Volar最佳实践

### 4.1. 官方推荐的最佳实践是TS+setup+Volar
  详细见setUp最佳实践
目前也比较推荐在业务代码中使用该方案，主要是在代码组织上，可以更清晰的体现vue3  componsition-api开发模式下的关注逻辑的开发思路， 相较于vue2 option-api中把一块功能逻辑拆散到computed,methods,watch中不同位置，vue3 componsition-api可以让开发把同一块功能逻辑组织到一起，易于后续维护等

### 4.2 实践
1. setup 宏报错
  `defineEmits,defineProps`等是vue定义宏,无需引入,但要解决eslint报错

  ```javascript
   //.eslintrc:
   env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
  ```

  配置后如果报错 `Environment key "vue/setup-compiler-macros" is unknown`,根据提示可知，是当前依赖包`eslint-plugin-vue` 中没有`vue/setup-compiler-macros` 规则，故需升级`eslint-plugin-vue`


2. 组件命名报错
`eslint-plugin-vue`升级后出现组件命名报错问题
在vue/cli-plugin-eslint v7.20.0版本之后就引用了`vue/multi-word-component-names`规则，所以在编译的时候判定此次错误。
要求是根组件（App.vue）外，自定义组件名称应该由多单词组成，防止和html标签冲突。
[vue eslint报错：Component name "index" should always be multi-word.eslintvue/multi-word-component-names的三种解决方式](https://blog.csdn.net/u013078755/article/details/123581070)

但是鉴于之前组件命名是目录下index的形式,可以设置特定忽略
`.eslintrc`配置忽略个别组件名：
```javascript
   //:
   // 添加组件命名忽略规则
    "vue/multi-word-component-names": ["error",{
       "ignores": ["index"]//需要忽略的组件名
    }]
  ```



3. 自动引入配置
 * 你是否厌烦了每次使用 vue 时，需要额外的 import vue 的 api
你是否厌烦了每次使用 组件库 时，需要额外的 按需引入 组件
你是否厌烦了有时使用 第三方组件库 时，需要额外的 引入 css 样式
你是否厌烦了每次使用 图标 时，需要额外的 import

 * `unplugin-auto-import`：自动按需引入 vue\vue-router\pinia 等的 api
 * `unplugin-vue-components`：自动按需引入 第三方的组件库组件 和 我们自定义的组件
 * `unplugin-icons`：可以自动按需引入 所使用的图标，而不用手动 import
 * `vite-plugin-style-import`：自动按需引入 我们手动引入的组件的css样式

 `unplugin-auto-import`  better than  ` vue-global-api `

 
[几个插件，让你的Vue代码 “学会” 自动按需引入](https://juejin.cn/post/7062648728405934087)







