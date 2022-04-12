## 一、react-router
1. 基础
  关于react-router,使用上类似vue-router的路由守卫和路由集中管理的嵌套结构都需要自己实现。
  路由集中管理的嵌套结构,可以自行实现，也可以借助其他npm包实现,比如v6之前版本的`react-router-config`。
  关于导航守卫功能，需要我们利用react-route提供的部分api自行实现
  [React学习之实现React Router导航守卫【React React Router】](https://juejin.cn/post/7028742447702212644)
  [Config Router：一个 React Router 路由守卫及集中配置管理工具](https://juejin.cn/post/7029980146115280910)

2. 关于懒加载
   与vue-router类似都可以通过import()引入路由，进行了代码拆分
   


此外也有一些不同的关于router的看法[React-Router v4之后为什么不用config来管理路由？使用react-router新特性做模块加载吧](https://juejin.cn/post/7054407734166290463)

### 1.2 v6变化

V6版本API变动较大,v6以前版本, 集中路由管理之前要依赖`react-router-config`,升级到V6之后，使用`useRoutes`即可实现集中路由管理
[升react-router v6后，react-router-config不能用了？——react-router v6实现集中式路由](https://juejin.cn/post/7052933770260938783)

 react-router从 4.x 版本开始就开始采取 组件即路由 的理念。


## 二、 V5使用

### 2.1. 启用全局路由模式
全局路由有常用两种路由模式可选：HashRouter 和 BrowserRouter
* <HashRouter>：URL中采用的是hash(#)部分去创建路由，类似www.example.com/#/
* <BrowserRouter>：URL采用真实的URL资源,也就是vue的history模式

### 2.2 标签
  1. <Switch>
      一组路由
  2. <route>
      基础路由,需要在<Switch>中使用
      支持component和render两种方法进行渲染
      ```javascript
          import Profile from './Profile';
          // v5
          <Route path=":userId" component={Profile} />
          <Route
            path=":userId"
            render={routeProps => (
              <Profile routeProps={routeProps} animate={true} />
            )}
          />

          //路由懒加载-引入组件方式
           const Login = lazy(()=>import('../pages/login')) ;
      ```
      可以配合react.lazy和import()语法进行路由懒加载配置
  3. <link>
    导航组件 
  4. <Redirect>
     重定向,匹配/跳转到login
     `<Redirect exact from="/" to="/login" />`

  5. useHistory
    路由切换hook
    ````javascript
    // v5
    import { useHistory } from 'react-router-dom';

    function MyButton() {
      let history = useHistory();
      function handleClick() {
        history.push('/home');
      };
      return <button onClick={handleClick}>Submit</button>;
    };

    //路由切换
    // v5
    history.push('/home');
    history.replace('/home');
    ````



### 2.3 `react-router-config`
其实自己实现也不是很复杂
[浅析react-router-config的使用](https://juejin.cn/post/6911497890822029326)

1. 使用`react-router-config`实现集中路由管理的示例和文章：

>import { renderRoutes} from 'react-router-config';

[`react-router-config`集中管理路由](https://juejin.cn/post/6959835598198669343)

## 三、 V6版本
[React-Router V6 使用详解(干货)](https://juejin.cn/post/7033313711947251743#heading-1)

[reactrouter官方文档](https://reactrouter.com/docs/en/v6)

[React-Router v6 新特性解读及迁移指南](https://juejin.cn/post/6844904096059621389)

### 3.1 变更

1. `<Switch>`重命名为`<Routes>`。
2. `<Route>`统一使用elment属性,去掉原有的component和render
  
  ````javascript
  import Profile from './Profile';

  // v5
  <Route path=":userId" component={Profile} />
  <Route
    path=":userId"
    render={routeProps => (
      <Profile routeProps={routeProps} animate={true} />
    )}
  />

  // v6
  <Route path=":userId" element={<Profile />} />
  <Route path=":userId" element={<Profile animate={true} />} />
  ````
3. <Redirect> 替换为<Navigate/>
  ````javascript
  import Profile from './Profile';

  // v5
  <Redirect to="/login"/>
   
  // v6
  <Navigate to="/login"/>
  ````
4. <Link/>使用变动
    // 如果当前url为/home 
// V5
<Link to="page1"> -> <Link to="/page1">
// V6做法
<Link to="page1"> -> <Link to="/home/page1">
当前在 /home 我需要跳转到/home/page1，在V5中是存在路由歧义的，但是V6已经修复了
5. 新标签 <Outlet/>
   类似于vue的router-view
6. 嵌套路由变得更简单。
7. 用useNavigate代替useHistory。
8. 新钩子useRoutes代替react-router-config。


### 3.2 hook调用事项

  提供了一些Hook方法，注意是不能在class 组件中调用的 Hook的

  之前曾经在class组件中使用`useNavigate`,结果报错