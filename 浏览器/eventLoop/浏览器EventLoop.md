# 浏览器EventLoop
需要区分一下Node.js的EventLoop和浏览器的差异。

## 一、浏览器进程
 
[你真的理解$nextTick么](https://juejin.cn/post/6844903843197616136)

1. 浏览器（多进程）包含
* Browser进程（浏览器的主进程）、
* 第三方插件进程
* GPU进程（浏览器渲染进程）

2. 其中GPU进程（多线程）和Web前端密切相关，包含以下线程：
* GUI渲染线程
* JS引擎线程
* 事件触发线程（和EventLoop密切相关）
* 定时触发器线程
* 异步HTTP请求线程

这TM跟隔壁说法不一样啊啊啊啊啊啊啊啊啊啊啊


 GUI渲染线程和JS引擎线程是互斥的，为了防止DOM渲染的不一致性，其中一个线程执行时另一个线程会被挂起。
 


渲染树

css
[总是一知半解的Event Loop](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226694&idx=1&sn=01908e1c5089010733e723c99947b311&chksm=bd495bc28a3ed2d4d92c024910eb2b0367d0b22ee8e2587fee9253a359ebf99dba63338f3ccb&scene=21#wechat_redirect)


 ["参考文章：浏览器加载、解析、渲染的过程"](http://blog.csdn.net/xiaozhuxmen/article/details/52014901)