# node和npm命令
 
 registry.npm.taobao.org 切换到了 registry.npmmirror.com
 查看当前的npm镜像设置：npm config list
 2、清空缓存：npm cache clean --force

3、然后修改镜像即可：npm config set registry https://registry.npmjs.org/ （或npm config delete registry）

npm config set registry https://registry.npmmirror.com

## 一、设置安装镜像文件
>npm get config registry
>npm set config registry

1. 修改 下载仓库为淘宝镜像

　 npm config set registry https://registry.npmmirror.com

2. 如果要发布自己的镜像需要修改回来

　 npm config set registry https://registry.npmmirror.com

3. 安装cnpm

　npm install -g cnpm --registry=https://registry.npmmirror.com

2022 年更新  

淘宝出了新域名地址

https://registry.npmmirror.com
https://registry.npmmirror.com
 

##  二、npm 命令
1. 查看全局安装的包
> npm list -g --depth 0

 
 ## 三、`npm run xxx`的过程

 ### 3.1. `npm run xxx`的几种情况
  `npm run xxx`的时候，首先会去项目的package.json文件里找scripts 里找对应的xxx，然后执行 xxx的命令。
  例如启动vue项目 npm run serve的时候，实际上就是执行了vue-cli-service serve 这条命令。
  ```javascript
    {
        "name": "h5",
        "version": "1.0.7",
        "private": true,
        "scripts": {
            "serve": "vue-cli-service serve"
        },
    }
  ```
  其实这里要分情况讨论了,假如自行编写了node脚本,并在scripts中配置了指向该文件的执行命令，如`import:'./config/import.js'`,那么`npm run import`实质上就是运行了`node ./config/import.js`
  另外就是一些被封装好的类似`vue-cli-service serve`的情况了,在script中他们并没有明确指向某一个js文件，他是如何找到对应js文件执行的呢。
   

 ### 3.2. `vue-cli-service serve`过程

1. 为什么不直接执行而要执行`npm run serve` 呢？
直接执行`vue-cli-service serve`，会报错，因为操作系统中没有存在`vue-cli-service`这一条指令

2. 安装依赖是通过`npm i xxx `来执行的，例如 `npm i @vue/cli-service`，npm 在 安装这个依赖的时候，就会`node_modules/.bin/` 目录中创建好`vue-cli-service` 为名的几个可执行文件。

3. `node_modules/.bin` 目录下的文件，实质上是一个个软链接。这些软链接可以映射到具体执行的js文件
`./bin/vue-cli-service`内容如下：
文件顶部写着` #!/bin/sh` ,表示这是一个脚本
```js
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
else 
  node  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
fi
exit $ret
```

4. 从 `package-lock.json` 中可知，`npm i`时 ，npm 将 `bin/vue-cli-service.js` 作为 bin 声明了，将该文件软链接到 `./node_modules/.bin `目录下，而 npm 还会自动把`node_modules/.bin`加入`$PATH`，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。
假如我们在安装包时，使用 `npm install -g xxx `来安装，那么会将其中的 `bin` 文件加入到全局，比如` create-react-app `和 `vue-cli` ，在全局安装后，就可以直接使用如` vue-cli projectName` 这样的命令来创建项目了。
 

5. 总结:`npm i `的时候，npm 就帮我们把这种软连接配置好了，其实这种软连接相当于一种映射，执行`npm run xxx `的时候，就会到 `node_modules/bin`中找对应的映射文件，然后再找到相应的js文件来执行。
[运行 npm run xxx 的时候发生了什么？]( https://juejin.cn/post/7078924628525056007)
 

 

 ### 3.3 扩展思路
 这个是不是其实也可用来相似对照pnpm命令的执行，应该实质上差不多，只不过pnpm指向的映射更复杂