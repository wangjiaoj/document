# process.nextTick
## 一、基础概念
1. process.nextTick 是一个node.js中的概念

2. Node.js是单线程的，除了系统IO之外，在它的事件轮询过程中，同一时间只会处理一个事件。你可以把事件轮询想象成一个大的队列，在每个时间点上，系统只会处理一个事件。即使你的电脑有多个CPU核心，你也无法同时并行的处理多个事件。但也就是这种特性使得node.js适合处理I／O型的应用，不适合那种CPU运算型的应用。在每个I／O型的应用中，你只需要给每一个输入输出定义一个回调函数即可，他们会自动加入到事件轮询的处理队列里。当I／O操作完成后，这个回调函数会被触发。然后系统会继续处理其他的请求。

3. 在这种处理模式下，process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行。
````javascript
function foo() {
    console.error('foo');
}
 
process.nextTick(foo);
console.error('bar');
//执行结果
//bar
//foo
````