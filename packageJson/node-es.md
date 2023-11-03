## package.json文件中的type
Javascript的模块化包括有CMD、AMD、UMD、CommonJS、ES Module等规范。而NodeJS的模块化方案正是采用CommonJS规范。
我们这里不展开对以上几种模块化方案的细节讨论，我们关心的是package.json中的type属性定义。
NodeJS支持ES6模块化
在早期的nodejs版本中，node仅支持Commonjs模块化方案，不过在nodejs版本13.2.0中，node正式支持ES Modules模块化，在package.json中的type字段声明
json复制代码
```javascript
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```


总结说明

type字段用于定义package.json文件和该文件所在目录根目录中 .js文件和无扩展名文件的模块化处理规范，默认值为'commonjs'。
type字段省略则默认采用commonjs规范
当type字段指定值为module则采用ESModule规范
node官方建议包的开发者明确指定package.json中的type字段值
不论package.json中的ype字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonjs模块来处理

 