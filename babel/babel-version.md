
## 一、babel6->babel7
1. 包迁移变化
babel像其他知名开源项目一样逐步从Multirepo(Multiple Repository）转换到Monorepo,迁移变化导致`babel-xx` 到 `@bebel/xx `的变化（6->7）

比如:`babel-preset-env`从`https://github.com/babel/babel-preset-env/`迁移到babel主仓库中`https://github.com/babel/babel/tree/master/packages/babel-preset-env`
babel6: `babel-present-env`
babel7: `@babel/present-env`


babel6:`babel-polyfill`和`babel-runtime`  和 `babel-plugin-transform-runtime`
babel7:`@babel/polyfill`和`@babel/runtime` 和 `@babel/plugin-transform-runtime`

### 1.2 babel7配套升级要求

babel 7.0 要求 nodejs >= 6。

babel：
* babel-core
* babel-cli
* babel-loader

其中
* babel-loader 8.x对应babel-core 7.x
* babel-loader 7.x对应babel-core 6.x

babel7升级之后需要升级配套loader等
* babel-eslint v9: https://github.com/babel/babel-eslint/releases/tag/v9.0.0
* babel-loader v8: https://github.com/babel/babel-loader/releases/tag/v8.0.0
* gulp-babel v8: https://github.com/babel/gulp-babel/releases/tag/v8.0.0
* rollup-plugin-babel v4: https://github.com/rollup/rollup-plugin-babel/tag/v4.0.3

3. babel7变化
移除了stage-x
增加core-js


preset 的变更：淘汰 es201x，删除 stage-x，强推 env (重点)

要指定版本 类似7.0.0会安装最新版本
[结合Babel 7.4.0 谈一下Babel-runtime 和 Babel-polyfill](https://juejin.cn/post/6844903869353295879)
[深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.cn/post/6844903956905197576)


升级命令：
># 不安装到本地而是直接运行命令，npm 的新功能
> npx babel-upgrade --write

[babel升级7.x的心得](https://www.cnblogs.com/longlongdan/p/12169974.html)