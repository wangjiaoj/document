const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
process.env.NODE_ENV = 'production';

const config = require('./webpack.config.base.js');
const devMode = process.env.NODE_ENV !== 'production';

const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
const until = require("./until");
config.entry = until.getEntry(entryDir);
config.optimization.splitChunks = {
    chunks: 'initial',
    maxInitialRequests: 2,
    minSize: 1024,
    cacheGroups: {
        vendor: {
            name: 'vendor',
            //  test: /\.js$/,
            minChunks: 3,
            priority: 100,
        }
    }
}
config.plugins.push(
    new HtmlWebpackPlugin({ // 打包输出HTML
        filename: '../../template/index.ftl',
        template: './templates/index.ftl',
        chunks: ['index-index', 'vendors'],
    }),
    new ManifestPlugin()
);

module.exports = config;