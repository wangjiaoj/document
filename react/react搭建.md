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
    但是这个版本有个process的问题,如果受限于node,不能升级到5，可以安装`npm i react-error-overlay@6.0.9 --save-dev`解决

### 1.2 问题
create-react-app:
1. cra创建的项目每一次重新启动会重置tsconfig.json
2. 自定义修改麻烦
   相对于vue-cli不好用的地方,react把很多东西都下方到社区了,类似于store


### 1.3 非入侵的修改:
 @craco/craco等见六



## 二、样式问题
### 2.1 react-全局样式
   如果只是简单配置css/less/sass的loader,
   在使用的时候直接`import "xx.css"`即可,此时变量是全局变量,
   如果是单页面应用中当前页面的样式就会影响到其他页面
 
   
### 2.2. 局部样式
全局样式问题,需要通过局部样式来解决
1.  css.module写法,可以实现局部生效样式
````javascript
.red{
  color:red
}
.login-bg{
 color:blue
}
 import style from './index.less'
 export default ()=>{
    return ( <div className={style['login-bg']}> <div className={style.red}></div></div>)
 }
````

2. creat-react-app默认支持css和sass的局部样式css.module写法

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
3. less类似功能实现
react-create-app 使用less需要手动引入
react-create-app进行enject,less直接参照css和sass方案配置即可

`@craco/craco`和``


## 三、typeScript支持问题

1. 第三方npm包引入,ts报错无法找到模块
    * npm包自己有TypeScript 声明的,可以安装@type/xx来获取声明
        如`npm install --save typescript  @types/react-dom`
        也有npm直接ts实现的,就可以考虑简单直接安装就可以
    * 不是所有库都有 TypeScript 的声明文件,可以自己写

    自己添加特定库的ts类型声明
        以`react-router-dom`为例
        (1)新建文件夹typings
        (2)新建文件：react-router-dom.d.ts
        (3)增加库的声明`declare module 'react-router-dom'`
        (4)然后在TS配置文件里增加typings文件引用`include:['src','typings']`
        (5)然后路由就正常使用了

3. ts范围声明
注意通过tsconfig文件中的include来设置范围声明


1. 声明
需要在`react-app-env.d`中配置一些声明来避免一些报错问题,例如
```javascript
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module "*.png";
declare module '*.less';
```


## 四、组件
1. UI:antd

> npm add antd
貌似没有类似vue的全局组件安装方法,都是需要使用的组件在对应页面进行安装的

antd在react严格模式下会报错
解决react警告：findDOMNode is deprecated in StrictMode. findDOMNode was passed an...
是因为Antd组件中有些使用了CSSTransition，但是CSSTransition中的部分代码的写法对于react而言，不是最新的写法，不是非常规范的写法，所以严格模式下的react就会抛出警告。但是这个实际并不影响使用，因为严格模式只会在开发模式下使用。在生产模式下就不会出现这样的警告了。
[antd在react严格模式的下报错](https://zhuanlan.zhihu.com/p/434372463)

## 六. cra非入侵的修改

### 6.1 `@craco/craco`:
1. `@craco/craco`可以进行非入侵式修改,来避免通过enject才能自定义的麻烦,限制最低create-react-app 4.0
> npm add @craco/craco 
* 目前最新版本的可以通过自带的alias和tsconfig.js扩展解决问题,无需再引入其他
* less也直接使用craco-less简单配置即可支持css.module
* 
### 6.2 @rescripts/cli
### 6.3 react-app-rewired

## 七、其他脚手架umi等