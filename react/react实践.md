## react
## 一、创建工具
1. create-react-app 
create-react-app 是一个通过 npm 发布的安装包，
5.0以前版本需要全局安装，5.0版本不再需要全局安装，并且需要卸载掉之前的版本，
卸载不干净的时候可以通过在命令行中执行下面的命令进行清理
>where create-react-app
你也可以使用 create-react-app 提供的 yarn run eject 命令将所有内建的配置暴露出来
还有其他一些安装工具，比umi等

## 二、react-router
 V6版本API变动较大,
v6以前版本, 集中路由管理之前要依赖`react-router-config`,升级到V6之后，使用`useRoutes`即可实现集中路由管理
[升react-router v6后，react-router-config不能用了？——react-router v6实现集中式路由](https://juejin.cn/post/7052933770260938783)

此外也有一些不同的关于router的看法[React-Router v4之后为什么不用config来管理路由？使用react-router新特性做模块加载吧](https://juejin.cn/post/7054407734166290463)
[Config Router：一个 React Router 路由守卫及集中配置管理工具](https://juejin.cn/post/7029980146115280910)

### 2.1 v6之前版本
1. react-router从 4.x 版本开始就开始采取 组件即路由 的理念。

使用`react-router-config`实现集中路由管理的示例和文章：

>import { renderRoutes} from 'react-router-config';
[`react-router-config`集中管理路由](https://juejin.cn/post/6959835598198669343)

### 2.2. V6版本的
[React-Router V6 使用详解(干货)](https://juejin.cn/post/7033313711947251743#heading-1)





## UI:antd

> npm add antd
貌似没有类似vue的全局组件安装方法,都是需要使用的组件在对应页面进行安装的

1.