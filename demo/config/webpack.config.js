 const webpack = require('webpack');
 process.env.NODE_ENV = 'development';
 const config = require('./webpack.config.base.js');


 const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
 const until = require("./until");
 config.entry = until.getEntry(entryDir);


 module.exports = config;