# vue笔记

## 一、SPA和MPA
关于SPA和MPA的选用，首选的一个条件其实应该是SEO的需求，如果有明确的SEO需求，就有必要考虑MPA，负责在SEO上可能会要多花点时间(SSR)。
另外可以考虑SPA+MPA混用，比如管理员和用户考虑是否有必要拆解成两个页面之类的，再或者SPA应用下的分享页面之类的。

## 二、vue\vuex\vue-router\iview\生命周期


###　2.1 vue-router

#### 2.1.1. 路由拦截
 关于beforeEach,修改参数，后继续调用next可能造成死循环
* 比如在beforeEach中给请求添加query参数,添加完成后，继续调用next()并传参当前页面路由path,会死循环,这类处理应该只能用来处理某些条件下强制跳转到到某个默认页面。

2. history/hash

#### 2.1.3. 关于同地址反复访问问题
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

  
#### 2.1.4 

### 2.3 VUE生命周期中的$mount挂载过程

## 三、vue

### 3.1计算属性computed
不能使用箭头函数.this指向会存在问题

### 3.2.data初始化
1. vue中没有在data初始化的参数，直接在template中使用，会出现一些意外的问题。比如当作参数进行一些数据判断，会判断失效。

　
### 3.3 渲染函数 & JSX

this.$createElement

特殊组件的jsx写法
https://segmentfault.com/q/1010000009550441

部分情况下vue支持jsx
示例：antdv的table组件中的cusomRender
````javascript
cusomRender:(text,row,index)=>{
    if(typeof text =="object"){
        return (<div on-click={()=>this.handle(text)}>{ text.value}</div>)
    }
}
````



 



### 四、一些需要注意的问题
1. vue watch变量之后，修改参数，但根据这个参数重新computer的参数未变化

2. watch tableList 修改表格渲染后高度   computer的是否展示滚动条参数未变化
