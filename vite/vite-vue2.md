# vue2项目vite打包优化

## 一、准备
1. 浏览器检查,浏览器要支持ES
2. 在根目录创建html文件,并且引入js
>   <script type="module" src="/src/main.ts"></script>
3. 编写vite.config.js

## vite
1. https://github.com/vitejs/awesome-vite
https://github.com/nabaonan/todos-action
2. 依赖工具包
* vite-plugin-vue2
* @originjs/vite-plugin-commonjs
* ScriptSetup
* [vite-plugin-style-import](https://www.npmjs.com/package/vite-plugin-style-import)

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
