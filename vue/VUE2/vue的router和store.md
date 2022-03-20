## 一、vuex
 

## 二、vue-router
### 2.1. 路由拦截
 关于beforeEach,修改参数，后继续调用next可能造成死循环
* 比如在beforeEach中给请求添加query参数,添加完成后，继续调用next()并传参当前页面路由path,会死循环,这类处理应该只能用来处理某些条件下强制跳转到到某个默认页面。

### 2.2. history/hash
使用H5的新 History API

### 2.3. 关于同地址反复访问问题
router-view是复用的，单纯的改变id号并不会刷新router-view
1. 实现页面的局部刷新（`<router-view>`页面刷新）
利用生命周期,在父层 app.vue 中声明 reload 方法，用 v-if 控制 router-view 的显示或隐藏，从而控制页面的再次加载，并向其子组件注入依赖。

父页面定义
````javascript
  <router-view v-if="isRouterAlive">
  methods:{
    reload(){
        this.isRouterAlive = false;
        this.$nexTick(function(){
            this.isRouterAlive = true;
        })
    }
  }
  provide(){
      return {
          relaod:this.reload
      }
  }
````
子页面使用
````javascript
//子页面接收父组件的定义方法
inject:["reload"],

//子页面相同地址反复跳转-调用
this.$router.replace({path:xxxx,query:yyy})
this.reload();
````

2. watch
watch 来监听路由的变化，然后先push一个空路由，再返回上一页
````javascript
 watch:{
        '$route': function (to, from) {
            let NewPage = '_empty' + '?time=' + new Date().getTime()/1000 //定义一个空页面
            this.$router.push(NewPage)
            this.$router.go(-1) // 返回上一个页面
        }  
    }
````
或者还是watch 来监听路由的变化,然后各自页面监听处理逻辑

像是新闻详情页面,本身含有其他新闻链接,只在自己页面会存在同地址反复跳转的问题,就可以考虑直接当前页面路由监听即可。

3. 设置成动态地址
最开始适用于动态路由的情况,可以在设计阶段就考虑配置成动态路由

````javascript
{
    path:"/market/:id",
    name:'market',
    component：resolve=>require(["../../view/xx],resolve)
    children:[{XXX}]
}
````
  
### 2.4 关于动态路由

