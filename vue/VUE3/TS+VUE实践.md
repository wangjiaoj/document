# vue+TS实践
Vue2+TS 一般考虑使用`vue-class-component`或`vue-property-decorator`的库
代码风格上相对有点混乱

Vue3+Ts 
## 一、TS使用中问题

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

## 二、vue3+TS实践
1. 关于vue插件
使用vue3之后,vetur给出类似如下报错(也可能是其他类似内容报错)
>Module ‘“vue“‘ has no exported member ‘ref‘
查找原因是vetur报的错，大概是vue3+ts检测,功能还没更新过来(上次更新在2019年,应该是适用vue2了)
重新安装Volar插件`Vue Language Features (Volar)`(针对Vue3的插件)和`TypeScript Vue Plugin (Volar)`


## 三、vue2+TS


1. 库
目前 2.x 跟 TS 的整合，通常需要基于 `vue-class-component` 来用基于 class 的组件书写方式
`vue-class-component`和`vue-property-decorator`

`vue-class-component`是vue 的官方库，作用是以class的模式编写组件。这种编写方式使vue组件可以使用继承、混入等高级特性,更重要的是使 Vue 组件更好的跟TS结合使用。

` vue-property-decorator `是社区出的,基于vue-class-component 拓展出了很多操作符 @Prop @Emit @Inject 等;可以说是 vue-class-component 的一个超集, 使代码更为简洁明了,options里面需要配置 decorator库不支持的属性, 比如components, filters, directives等。
 

`vue-class-component`
```javascript
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      msg: String
    }
  })
  export default class HelloWorld extends Vue {
    msg!: string;
  }
```

vue-property-decorator 基于 vue-class-component 开发而成，所以安装时仅需安装 vue-property-decorator 即可。

[走近Ts，用了爽，用后一直爽（二)](https://segmentfault.com/a/1190000038540091)

[Vue3拥抱TypeScript的正确姿势](https://juejin.cn/post/6875713523968802829)

[优雅的在Vue3中使用Vuex「TypeScript版」](https://www.imsle.com/archives/105.html)





https://blog.csdn.net/lanseguhui/article/details/117809376?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-117809376.pc_agg_new_rank&utm_term=Vue+defineComponent+%E4%B8%8D%E5%86%99+%E4%B9%9F%E6%8A%A5%E9%94%99&spm=1000.2123.3001.4430

[TS报错对照表](https://blog.csdn.net/weixin_42659625/article/details/81002985)

```javascript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*';
