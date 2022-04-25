
## 六. proxy和Reflect
1. proxy概述
Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
    var proxy = new Proxy(target, handler);
Proxy对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
2. Proxy实例的方法
3. Proxy.revocable()
Proxy.revocable方法返回一个可取消的Proxy实例。
let target = {};let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123revoke();
proxy.foo // TypeError: Revoked

4. Reflect概述
5. Reflect对象的方法







