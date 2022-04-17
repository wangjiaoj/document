
## 一、sass
 sass 的 3 代编译器,前两者都已经退出舞台,放弃维护

1. ruby sass
 
2. node-sass
社区里用 c++ 实现了 sass 的编译器，叫做 LibSass，和 node 做了集成，就是 node-sass 这个包。
只不过，node-sass 因为是一个 c++ 模块，所以安装的时候要和 node 版本对应，不然就会编译报错，这点比较麻烦。

3. dart-sass
dart-sass 毫无疑问是用 dart 来写的 sass 编译器。dart 是 flutter 的编程语言，可以编译为 js，所以它提供的 npm 是 js 的，不需要像 node-sass 一样和 node 版本有绑定关系。

现在已经统一改名叫sass

[关于node-sass和对应的node版本问题](https://juejin.cn/post/7041524739591897124)
另外建议使用dart-sass 废用node-sass
[dart-sass 废用node-sass](https://juejin.cn/post/6991631111705067528)


 

 



1. nvm情况的sass问题最后没解决

> npm remove node-sass
> npm add dart-sass