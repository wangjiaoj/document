# react16架构
 [卡颂-react探秘-双缓存](https://react.iamkasong.com/process/doubleBuffer.html#%E4%BB%80%E4%B9%88%E6%98%AF-%E5%8F%8C%E7%BC%93%E5%AD%98)
## 一、React15架构
 React15架构可以分为两层：
 1. Reconciler（协调器）—— 负责找出变化的组件
 2. Renderer（渲染器）—— 负责将变化的组件渲染到页面上

Reconciler与Renderer是交替工作

### 1.1 Reconciler（协调器）
 每当有更新发生时，Reconciler会做如下工作：
* 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
* 将虚拟DOM和上次更新时的虚拟DOM对比
* 通过对比找出本次更新中变化的虚拟DOM
* 通知Renderer将变化的虚拟DOM渲染到页面上

### 1.2 Renderer（渲染器）
由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— ReactDOM  。



## 二、React16架构
React16架构可以分为三层：

1. Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
2. Reconciler（协调器）—— 负责找出变化的组件
3. Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### 2.1. Scheduler（调度器）

1. fiber介绍中说明fiber可以实现切片和中断,以及任务状态的保存和恢复,以及需要一套机制,通过浏览器判断是否有时间继续进行diff或暂停来进行调度控制

2. 既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。
其实部分浏览器已经实现了这个API，这就是requestIdleCallback (opens new window)。但是由于以下因素，React放弃使用：
* 浏览器兼容性
* 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低

基于以上原因，React实现了功能更完备的requestIdleCallbackpolyfill，这就是Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。

3. Scheduler是独立于React的库

### 2.2. Reconciler（协调器） 
1. 更新工作从递归变成了可以中断的循环过程。每次循环都会调用shouldYield判断当前是否有剩余时间。
2. 如果保持之前的二者交替的工作机制,中断更新时就会DOM渲染不完全的问题。所以Reconciler与Renderer不再是交替工作,当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记
3. 整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

### 2.3. Renderer（渲染器） 
Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。


### 2.4 源码内的术语
介绍几个 源码内的术语：
1. Reconciler工作的阶段被称为render阶段。因为在该阶段会调用组件的render方法。
2. Renderer工作的阶段被称为commit阶段。就像你完成一个需求的编码后执行git commit提交代码。commit阶段会把render阶段提交的信息渲染在页面上。
3. render与commit阶段统称为work，即React在工作中。相对应的，如果任务正在Scheduler内调度，就不属于work。
在架构篇我们会分别讲解Reconciler和Renderer的工作流程，所以章节名分别为render阶段和commit阶段。



### 三、双缓存
 

### 3.1 概念
当我们用canvas绘制动画，每一帧绘制前都会调用ctx.clearRect清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种在内存中构建并直接替换的技术叫做双缓存

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

### 3.2 两棵树的对应关系
1. 在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

2. React应用的根节点通过使current指针在不同Fiber树的rootFiber间切换来完成current Fiber树指向的切换。

即当workInProgress Fiber树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向workInProgress Fiber树，此时workInProgress Fiber树就变为current Fiber树。

每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。


#### 思考
为什么要双缓存,一个不够吗？另外假如一个是现在展示的,一个是构建中的，那么之前schedule那边有了更高优先级的任务,正在构建中的树是直接重新构建吗?那被打断的哪个构建中的树是直接就没有了?然后新构建的直接展示,然后在复用当前展示树成新的构建中树,重新进行低优先级的更新？


好像确实是这样。。。react就是打算用这个上用户可选的优先级功能？貌似17还是实验性质的
我们已经可以理解为什么 React 要采取双缓存 fiber tree 结构了。current fiber tree，记录上一次更新结束的状态；workInProgree fiber tree，更新过程中创建的 new tree，可随着更新优先级的变化随时重置。


[初探 React - 双缓存 fiber tree]( https://juejin.cn/post/6990228876081233928)


### 
[漫谈 react 系列(三): 三层 loop 弄懂 Concurrent 模式](https://juejin.cn/post/7022992730343079966)
` React Concurrent `模式，恍然大悟，才发现是自己浅薄了，原来双缓存 fiber tree 的作用不仅仅是作为 MVVM 框架中所谓的 `virtual node tree` 来实现响应式更新的，它更主要的是为了服务 Concurrent 模式。