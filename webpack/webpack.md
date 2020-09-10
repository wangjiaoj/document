## webpack
### 安装--save-dev和--save的选择
我们在使用npm install 安装模块或插件的时候，有两种命令把他们写入到 package.json 文件里面去，他们是：--save-dev或--save。

首先需要说明的是Dependencies一词的中文意思是依赖和附属的意思，而dev则是develop（开发）的简写。

所以它们的区别在 package.json 文件里面体现出来的就是，使用 --save-dev 安装的 插件，被写入到 devDependencies 域里面去，而使用 --save 安装的插件，则是被写入到 dependencies 区块里面去。

那 package.json 文件里面的 devDependencies  和 dependencies 对象区别：

* devDependencies  里面的插件只用于开发环境，不用于生产环境；
* dependencies  是需要发布到生产环境的。

dependencies依赖的包不仅开发环境能使用，生产环境也能使用。其实这句话是重点，按照这个观念很容易决定安装模块时是使用--save还是--save-dev。

### 部分命令
查看node_module 包中某一个包的版本：
> npm view xxx version


> npm -v          #显示版本，检查npm 是否正确安装。
  
> npm install express   #安装express模块
  
> npm install -g express  #全局安装express模块
  
> npm list         #列出已安装模块
  
>npm list <packagename> 这个指令用来查看某个模块是否安装了
> npm show express     #显示模块详情
  
> npm update        #升级当前目录下的项目的所有模块
  
> npm install <packagename>@v    #升级当前目录下的项目的指定模块到某一版本
  
> npm update -g express  #升级全局安装的express模块
  
> npm uninstall express  #删除指定的模块