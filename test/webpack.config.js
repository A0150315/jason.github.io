var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack');
var path = require('path');

var plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        chunksSortMode: 'dependency',
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true // 删除空白符与换行符
        }
    }),
    new webpack.HotModuleReplacementPlugin()
];

module.exports = {
    entry: {
        app: ["babel-polyfill", './index.ts']
    },
    output: {
        filename: 'bundle.js?[hash]',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.html$/, // Only .html files
                use: 'html-loader?' + JSON.stringify({
                    attrs: ['img:src', 'img:ng-src']
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'img/[name].[hash].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'fonts/[name].[hash].[ext]')
                }
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }, {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            }, {
                test: /\.ts|\.tsx$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'dist/',
        host: '0.0.0.0',
        port: 80,
        inline: true, // 可以监控js变化
        hot: true, // 热启动
        compress: true,
        watchContentBase: true,
    },
    plugins: plugins,
};