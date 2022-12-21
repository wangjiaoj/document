# vue2的composition-api实践

## 一、`@vue/composition-api`
直接安装`@vue/composition-api`
在vue3中从vue中引入的ref,reactive等直接从`@vue/composition-api`中引入即可
等到升级到vue3的时候，直接用vue替换掉`@vue/composition-api`即可
如果配合使用TS，那么为方便TS在Vue组件中正确的进行类型推断，可以从`@vue/composition-api`中引入`defineComponent`
详情见github文档，根据目前写法在vue2升级vue3中是应该是非常平滑的


### 1.1 `@vue/composition-api`限定方法

1. 在template中定义refs：
   原有vue2写法是`this.$refs.xx`,
   现在可以在`setup(props,context)`中使用context来获取`context.refs.xx`
   该方案是vue2中`@vue/composition-api`限定,vue3中不存在。

## 二、vue2.7