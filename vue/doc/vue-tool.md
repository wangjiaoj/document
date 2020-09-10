## require问题

先来说一下export default 与 require 和 import 的关系
通过export default导出的，如果你使用import xxx from 'xxx' 就可以直接使用，但如果你使用require('xxx')，却需要xxx.default 来使用.

vue-loader升级到13.x之后，require就必须要带上`.default`,也就是`require('./aa.vue).default`。
之前版本之所以可以直接使用`require('./aa.vue)`,应该是之前版本的vue-loader没有明确这个使用差异问题。

[export、exports、modules.exports 和 require 、import 的一些组合套路和坑](https://www.cnblogs.com/CyLee/p/5836069.html)