qiankun是基于singlespa框架的一个上层应用，它提供了完整的生命周期，和一些钩子函数，通过路由匹配来动态加载注册微应用，同时提供了一系列api对微应用做管理和预加载等，它相对singlespa来说进步是比较大的。

所以---qiankun实质上是singlespa的一个封装，基于我们在上一节看到的，singlespa是通过输出一个manifest.json 通过标识入口信息动态构造script渲染实现的微前端应用，类似下面的图：



https://www.cnblogs.com/goloving/p/14881461.html


[webpack5子应用加载失败](https://github.com/umijs/qiankun/issues/1092)