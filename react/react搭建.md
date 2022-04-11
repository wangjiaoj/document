## 一、create-react-app搭建react
### 1.1 create-react-app简介
create-react-app 是一个通过 npm 发布的安装包，
5.0以前版本需要全局安装，5.0版本不再需要全局安装，并且需要卸载掉之前的版本，
卸载不干净的时候可以通过在命令行中执行下面的命令进行清理
>where create-react-app
你也可以使用 create-react-app 提供的 `npm run eject` 命令将所有内建的配置暴露出来进行自定义,


create-react-app 5.0 需要node14
create-reate-app 4.0.3 还是支持node12的,最低支持版本未知 可能是node10

### 1.2 问题
create-react-app:
1. cra创建的项目每一次重新启动会重置tsconfig.json
2. 自定义修改麻烦
   相对于vue-cli不好用的地方,react把很多东西都下方到社区了,类似于store


### 1.3 非入侵的修改:
1. @craco/craco可以进行非入侵式修改
* 目前最新版本的可以通过自带的alias和tsconfig.js扩展解决问题,无需再引入其他
* less也直接使用craco-less简单配置即可支持css.module
* 



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

需要在`react-app-env.d`中配置一些声明来避免一些报错问题,例如
```javascript
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module "*.png";
declare module '*.less';
```




## 六. 其他脚手架umi等