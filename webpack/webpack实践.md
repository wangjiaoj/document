# webpack实践
目前主要是webpack4
## 一、splitChunks
cacheGroup问题
> test: /[\\/]node_modules[\\/]/,
如果希望按照node_modluele类型进行分别打包，可以参考此处配置，通过配置name函数来实现分别打包
[webpack官网splitchunk配置](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks)
如果想要把node_modules中某一部分单独打包出来，也可以多配置几个拆分，比如前一个先打包出vue,后面的vendor就会打包剩下的其他包。(部分情况也可以考虑使用externals和copy单独把vue抽出来)
````javascript
cacheGroup:{
    vueCommon:{
    test: /[\\/]node_modules[\\/]vue[\\/]/,
    },
    vendor:{
    test: /[\\/]node_modules[\\/]/,
    }
}
```
 