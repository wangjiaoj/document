const webpack = require('webpack');
process.env.NODE_ENV = 'development';
const devConfig = require('./webpack.config.base.js');
const path = require('path');
const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
const until = require("./until");
//devConfig.entry = { "index": "./src/pages/toggle.js" }
devConfig.entry = until.getEntry(entryDir);

devConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);
devConfig.devtool = 'source-map';
devConfig.devServer = {
    disableHostCheck: true, //关闭host检查
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    hot: true, // 开启配置
    port: 9000
};
module.exports = devConfig;