## 一、create-react-app搭建react
### 1.1 create-react-app简介
    create-react-app 是一个通过 npm 发布的安装包，
    5.0以前版本需要全局安装，5.0版本不再需要全局安装，并且需要卸载掉之前的版本，
    卸载不干净的时候可以通过在命令行中执行下面的命令进行清理
    >where create-react-app
    你也可以使用 create-react-app 提供的 `npm run eject` 命令将所有内建的配置暴露出来进行自定义,

1. node兼容
    cra 5.0 需要node14
    cra 4.0.3(4的最高版本) 还是支持node12的,最低支持版本未知 可能是node10
    但是这个版本有个process的问题,如果受限于node,不能升级到5，可以安装`npm i react-error-overlay@6.0.9 --save-dev`解决。目前react项目不考虑低版本node问题

### 1.2 问题
create-react-app:
1. cra创建的项目每一次重新启动会重置tsconfig.json
2. 自定义修改麻烦
   相对于vue-cli不好用的地方,react把很多东西都下方到社区了,类似于store

3. 修改配置可以使用`npm run enject`之后进行定制，也可以使用一些非入侵的修改的方案`@craco/craco`等


## 二、`npm run enject` 修改
### 2.1  局部样式
1. creat-react-app默认支持css和sass的局部样式css.module写法

具体配置如下
```javascript
   // enject之后可以看到关键的默认配置如下：
   //getStyleLoader(cssOptions, preProcessor)函数中此处关键位置
   //sass,less等经过sass,less的loader进行预处理之后还是统一在css-loader配置处生效
     {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },

     //css两种配置写法的
    getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        modules: {
            mode: 'icss',
        },
    }),
    getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        modules: {
            mode: 'local',
            getLocalIdent: getCSSModuleLocalIdent,
        },
    }),
```
2. less类似功能实现
react-create-app 使用less需要手动引入
react-create-app进行enject,less直接参照css和sass方案配置即可
 

## 三. cra非入侵的修改

### 2.1 `@craco/craco`:
1. `@craco/craco`可以进行非入侵式修改,来避免通过enject才能自定义的麻烦,限制最低create-react-app 4.0
> npm add @craco/craco 
* 目前最新版本的可以通过自带的alias和tsconfig.js扩展解决问题,无需再引入其他
* less也直接使用craco-less简单配置即可支持css.module
* 
### 2.2 `@rescripts/cli`
### 2.3 `react-app-rewired`

