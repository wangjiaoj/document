## vite
## 一、vite
支持react,vue等多模板的创建
[awesome-vite](https://github.com/vitejs/awesome-vite) 一些配置实例项目和插件
### 1.1. 准备
1. 浏览器检查,浏览器要支持ES
2. 在根目录创建html文件,并且引入js
>   <script type="module" src="/src/main.ts"></script>
3. 编写vite.config.js
https://github.com/nabaonan/todos-action

### 1.2 vite配置常用插件
  1.  按需引入vite-plugin-style-import
  >npm install vite-plugin-style-import@1.4.1  --save-dev
  2.0版本node12报错?.语法
> resolvedConfig?.build?.rollupOptions
 
  问题难道是低版本node不支持,或者是要考虑vite能否支持 node_module打包语法编译，但貌似现在没有类似webpack的`transpileDependencies`选项
 
 [vite-plugin-style-import](https://www.npmjs.com/package/vite-plugin-style-import)

  也可以考虑  `unplugin-vue-components`和`unplugin-auto-import`组合使用也可以实现类似效果

2. ['vite-plugin-html']()



 ### 二、vue3+vite
 1. vite ts默认模板中依赖
   "@vitejs/plugin-vue": "^2.3.1",
    "typescript": "^4.5.4",
    "vite": "^2.9.2",
    "vue-tsc": "^0.29.8"
   如果自行安装就需要对应安装以上三个

 
