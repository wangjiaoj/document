# babel 插件编写

## 配置
1. test 测试目录
2. 设置


## 实际项目调试
$ # 先去到模块目录，把它 link 到全局
$ cd path/to/babel-plugin-var-let
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd path/to/my-project
$ npm link babel-plugin-var-let
实际上报错了'ERR_MODULE_NOT_FOUND'
 Cannot find package 'D:\myGit\document\demo-babel7\node_modules\babel-plugin-var-let\' imported from D:\myGit\document\demo-babel7\babel-virtual-resolve-base.js


 