## 一、Vue2+TS实践
 一般考虑使用`vue-class-component`或`vue-property-decorator`的库, 但代码风格上相对有点凌乱


## 二、vue2+composition-api
直接安装`@vue/composition-api`
在vue3中从vue中引入的ref,reactive等直接从`@vue/composition-api`中引入即可
等到升级到vue3的时候，直接用vue替换掉`@vue/composition-api`即可
如果配合使用TS，那么为方便TS在Vue组件中正确的进行类型推断，可以从`@vue/composition-api`中引入`defineComponent`
详情见github文档，根据目前写法在vue2升级vue3中是应该是非常平滑的
vue2+compsition-api限定的一些方法

1. 在template中定义refs,之前写法是`this.$refs.xx`,可以使用context来获取`context.refs.xx`,该方案是vue2中`@vue/composition-api`限定,vue3中不存在。


## 三、vue2+TS
### 2.1. 库
1. 装饰器概念
函数体或者函数调用方式的情况下，给函数增加一些新功能
参考：[vue + typescript 踩坑笔记](https://blog.csdn.net/weixin_33984032/article/details/91446233) 或者找一下阮一峰的关于装饰器文章
2. vue2.x 跟 TS 的整合，需要`vue-class-component`或`vue-property-decorator`
* 要用 vue-class-component 强化 vue 组件，让 Script 支持 TypeScript 装饰器
* 用 vue-property-decorator 来增加更多结合 Vue 特性的装饰器

其中`vue-class-component`是vue的官方库，作用是以class的模式编写组件。这种编写方式使vue组件可以使用继承、混入等高级特性,使 Vue 组件更好的跟TS结合使用。
`vue-property-decorator`是社区基于`vue-class-component`出的(所以安装时仅需安装`vue-property-decorator`即可), 拓展出了很多操作符 `@Prop @Emit @Inject` 等;可以说是 `vue-class-component` 的一个超集,
 
`options`里面需要配置 decorator库不支持的属性, 比如`components, filters, directives`等。
 
 

简单的说就是用typescript写vue每次都需要写一些额外形式的代码，vue-class-component通过装饰器来减少这些重复的代码，vue-property-decorator则是在vue-class-component的基础上增加了一些装饰器

2. `vue-property-decorator`包含的装饰器有以下

* @Component

* @Prop

* @Watch

* @Emit

* @Provide

* @Inject

* @ProvideReactive
* @InjectReactive
* @Watch
* @Ref

* 还有@Model @PropSync 的这两个，不过一般很少用
https://blog.csdn.net/sllailcp/article/details/102542796/
3. 代码风格
```javascript
  import { Options, Vue } from 'vue-class-component';

@Component({
    components:{ componentA, componentB},
})
export default class Parent extends Vue{
  @Prop(Number) readonly propA!: number | undefined  //!:在typescript中这种写法的意思就是!前面的这个变量一定不是undefined或者null，!叫非空断言操作符。
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC!: string | boolean | undefined

  // data信息
  message = 'Vue2 code style'

  // 计算属性
  private get reversedMessage (): string[] {
      return this.message.split(' ').reverse().join('')
  }

  // method
  public changeMessage (): void {
    this.message = 'Good bye'
  }
}

```
