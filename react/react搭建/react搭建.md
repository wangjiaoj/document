# react搭建
## 一、cra等见文档
  还有其他脚手架umi等
  
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
需要使用less
> npm add antd
貌似没有类似vue的全局组件安装方法,都是需要使用的组件在对应页面进行安装的

antd在react严格模式下会报错
解决react警告：findDOMNode is deprecated in StrictMode. findDOMNode was passed an...
是因为Antd组件中有些使用了CSSTransition，但是CSSTransition中的部分代码的写法对于react而言，不是最新的写法，不是非常规范的写法，所以严格模式下的react就会抛出警告。但是这个实际并不影响使用，因为严格模式只会在开发模式下使用。在生产模式下就不会出现这样的警告了。
[antd在react严格模式的下报错](https://zhuanlan.zhihu.com/p/434372463)
