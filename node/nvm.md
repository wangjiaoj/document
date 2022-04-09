## nvm
使用nvm安装管理nodejs：

[Windows下安装及使用NVM ](https://www.cnblogs.com/jing-tian/p/11225123.html#_label0)
[Windows下安装及使用NVM ](https://blog.csdn.net/qq_32682137/article/details/82684898)



重点：使用管理员身份运行cmd，不然在nvm use node_version时会报乱码错误。

nvm list [available]：列出已经安装的node.js版本。
nvm list available 显示可下载版本的部分列表
nvm install 版本号 安装指定的版本的nodejs
nvm use 版本号 使用指定版本的nodejs
nvm on： 启用node.js版本管理。
nvm off： 禁用node.js版本管理(不卸载任何东西)
nvm use [version] [arch]： 切换到使用指定的nodejs版本。可以指定32/64位[arch]。
nvm version： 显示当前运行的nvm版本，可以简写为nvm v