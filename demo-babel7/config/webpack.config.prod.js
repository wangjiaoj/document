const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
process.env.NODE_ENV = 'production';
const baseConfig = require('./webpack.config.base.js');
const devMode = process.env.NODE_ENV !== 'production';

const entryDir = './src/pages/**/*.js'; //该目录下全部为入口文件
const until = require("./until");

module.exports = merge(baseConfig, {
    entry: until.getEntry(entryDir),
    optimization: {
        splitChunks: {
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
    },
    plugins: [
        // new HtmlWebpackPlugin({ // 打包输出HTML
        //     filename: '../../template/index.ftl',
        //     template: './templates/index.ftl',
        //     chunks: ['index-index', 'vendors'],
        // }),
        // new ManifestPlugin()
    ]
})