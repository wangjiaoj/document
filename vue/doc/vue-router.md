## 一、vuex


## 二、vue-router


### 2.1. 路由拦截
 关于beforeEach,修改参数，后继续调用next可能造成死循环
* 比如在beforeEach中给请求添加query参数,添加完成后，继续调用next()并传参当前页面路由path,会死循环,这类处理应该只能用来处理某些条件下强制跳转到到某个默认页面。

### 2.2. history/hash

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
inject:["reload"],
this.reload();
````
子页面相同地址反复跳转使用的时候
````javascript
inject:["reload"],
this.$router.replace({xxxx})
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

3. 设置成动态地址
最开始有些情况可以考虑配置成动态路由

  
### 2.4 
