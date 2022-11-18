 
 # vue-esint相关配置全解析
 
 [代码规范化之vue篇](https://juejin.cn/post/6844904053177057288)
## "plugin:vue/essential"改为"plugin:vue/recommended"
修改.eslintrc.js配置：

how？extends字段内容由"plugin:vue/essential"改为"plugin:vue/recommended"
why？看eslint-plugin-vue available rules ，"plugin:vue/essential" 仅包含Base Rules和Priority A:Essential，"plugin:vue/recommended" 包含Base Rules、Priority A:Essential、Priority B: Strongly Recommended、Priority C: Recommended。想要有vue/attributes-order和 vue/order-in-components，so...


 

 ## 
 

