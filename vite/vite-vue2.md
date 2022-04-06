# vue2项目vite打包优化

## 一、准备
1. 浏览器检查,浏览器要支持ES
2. 在根目录创建html文件,并且引入js
>   <script type="module" src="/src/main.ts"></script>
3. 编写vite.config.js
https://github.com/nabaonan/todos-action
## vite配置
1. [awesome-vite](https://github.com/vitejs/awesome-vite) 一些配置实例项目和插件
2. 依赖工具包
* [vite-plugin-vue2]()
* [@originjs/vite-plugin-commonjs]()
* [ScriptSetup]()
* [vite-plugin-style-import](https://www.npmjs.com/package/vite-plugin-style-import)
* ['vite-plugin-html']()
2. 配置
````javascript
import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { UserConfigExport } from 'vite'
import { createStyleImportPlugin} from 'vite-plugin-style-import'
import ScriptSetup from "unplugin-vue2-script-setup/vite";
export default defineConfig ({
  return {
    // 1. If you are using the ant-design series, you need to configure this
    // 2. Make sure less is installed in the dependency `yarn add less -D`
    css: {
      preprocessorOptions: {
        less: {
          //支持变量和函数
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
        createVuePlugin({
        jsx: true,
        // vueTemplateOptions: {
        //   compilerOptions: {
        //     whitespace: "condense",
        //   },
        // },
        }),

        ScriptSetup({
        /* options */
        }),
        viteCommonjs(),
        createStyleImportPlugin({
            libs: [
            // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
            {
                libraryName: 'ant-design-vue',
                esModule: true,
                resolveStyle: (name) => {
                return `ant-design-vue/es/${name}/style/index`
                },
            },
            ],
        }),
    ],
    // 配置别名
    resolve: {
        alias: [
          "@"： resolve("src"),
          "~@"： resolve("src"),  
        ],
    },
  }
})
````


https://juejin.cn/post/7068207148768952333#heading-4

[vite 参考](https://segmentfault.com/a/1190000041200999)
## vite配置中遇到的麻烦问题
1. js中含有jsx
这个问题除了react遇到以外,vue2的很多使用antdv等UI框架在配置表格的Column中也比较频繁的出现，
[vite预编译](https://cn.vitejs.dev/guide/dep-pre-bundling.html#the-why)

问题原因在于依赖预构建问题

[vue2 老项目迁移 vite ,含有jsx](https://juejin.cn/post/7068207148768952333#heading-4)
[react-vite-几种解决jsx的方法](https://zhuanlan.zhihu.com/p/413899979)


解决方案：
* 手动或脚本修改：文件后缀 js => jsx,.vue文件中带有jsx语法, 则在script标签下增加jsx标识
* 修改依赖预构建配置，再添加babel插件@babel/plugin-transform-react-jsx




[vue3-jsx以及写法](https://juejin.cn/post/6915640119982718989)
3.0 有解决方案：@vitejs/plugin-vue-jsx


### 二、   其他未解决问题
1.  
3. vite如何导入未经过编译的node_modules包？
e-cli有transpileDependencies配置
https://segmentfault.com/q/1010000039187535



### webpack5
webpack5也现在有WASM，
像webpack5的Module Federation一样共享依赖吗
