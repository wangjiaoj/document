const webpack = require('webpack');
process.env.NODE_ENV = 'development';
const baseConfig = require('./webpack.config.base.js');
const path = require('path');
const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
const until = require("./until");
 
const { merge } = require('webpack-merge'); 
module.exports = merge(baseConfig, {
    entry : until.getEntry(entryDir),//{ "index": "./src/pages/toggle.js" }
    plugins:[new webpack.HotModuleReplacementPlugin()],
    devtool : 'source-map',
    devServer : {
        disableHostCheck: true, //关闭host检查
        contentBase: path.resolve(__dirname, '../'),
        compress: true,
        hot: true, // 开启配置
        port: 9007
    }
})
 
