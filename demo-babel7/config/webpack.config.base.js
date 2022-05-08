// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 此外webpack内置的JS压缩插件不能使用了，可以安装uglifyjs-webpack-plugin插件，使用同其他非内置插件；
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //4.0中不再支持Extract-text-webpack-plugin,换用mini-css-extract-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
//path:所有输出文件的目标路径;publicPath:输出解析文件的目录，url 相对于 HTML 页面
const devMode = process.env.NODE_ENV !== 'production';

const dirPath = '../static/project/';
const publicPath = 'static/project/';
const cssPublicPath = '../';
const cssFileName = devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css'; //'css/[name].css';
const jsFileName = devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js'; // 'js/[name].js'; 
const imgFileName = devMode ? 'image/[name].[ext]' : 'image/[name].[hash:7].[ext]'; //'image/[name].[ext]'; //


console.log(`devMode:${devMode}`)

module.exports = {
    mode: devMode ? "development" : "production", //webpack4中，可以直接使用"mode"设置为"production"来启用UglifyJsPlugin
    output: {
        //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
        path: path.resolve(__dirname, dirPath),
        publicPath: publicPath,
        filename: jsFileName
    },
    resolve: {
        alias: {
            '@libs': path.join(__dirname, '../libs'),
            '@component': path.join(__dirname, '../src/component')
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                //include: [resolve('src')], // 限定范围 提升速度
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            /**
            ** 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，
            遇到“@import”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），
            最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
            loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。
            因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
            mini-css-extract-plugin 是把css分离出去的'style-loader'和 mini-css-extract-plugin 不可通用 自己选一个
             MiniCssExtractPlugin:This plugin should be used only on production builds without style-loader in the loaders chain, 
              especially if you want to have HMR in development.
            *  */

            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: cssPublicPath
                    }
                }, 'css-loader']
            }, {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: cssPublicPath
                    }
                }, 'css-loader', 'less-loader']

            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: imgFileName
                }
            }
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: cssFileName,
            chunkFilename: "[id].css"
        })
    ],
    optimization: {

        minimizer: [
            // new UglifyJsPlugin({
            //     // mangle: {
            //     //     screw_ie8: false
            //     // },
            //     sourceMap: false,
            //     uglifyOptions: {
            //         //  warnings: false,
            //         parse: {},
            //         compress: {
            //             // 在UglifyJs删除没有用到的代码时不输出警告
            //             //  warnings: false,
            //             properties: false //(default true) rewrite property access using the dot notation, for example foo["bar"]→ foo.bar
            //         },
            //         mangle: true, // Note `mangle.properties` is `false` by default.
            //         output: {
            //             quote_keys: true //quote_keys (default false) -- pass true to quote all keys in literal objects
            //         },
            //         toplevel: false,
            //         nameCache: null,
            //         ie8: true,
            //         keep_fnames: false,
            //     }
            // }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        // discardComments: 对注释的处理
                        discardComments: { removeAll: true }
                    }],
                },
                canPrint: true
            })
        ]
    }
};