
移除了stage-x
增加core-js


preset 的变更：淘汰 es201x，删除 stage-x，强推 env (重点)

要指定版本 类似7.0.0会安装最新版本

结合Babel 7.4.0 谈一下Babel-runtime 和 Babel-polyfill
https://juejin.cn/post/6844903869353295879

深入浅出 Babel 上篇：架构和原理 + 实战
https://juejin.cn/post/6844903956905197576

升级命令：
># 不安装到本地而是直接运行命令，npm 的新功能
> npx babel-upgrade --write

[babel升级7.x的心得](https://www.cnblogs.com/longlongdan/p/12169974.html)