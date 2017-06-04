'use strict';

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractPlugin = new ExtractTextPlugin({
    filename: 'css/[name].[hash:12].css',
    allChunks: true
})
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./env.conf')
const entryConf = require('./entry.conf')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

const webpackConf = {
    entry: entryConf.entryJs,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[hash:12].js',
        publicPath: env.isProd ? '/dist/' : '/'
    },
    resolve: {
        extensions: ['.js', '.scss', '.json'],
        alias: {
            '@': resolve('src'),
            '@sass': resolve('src/sass')
        }
    },
    // devtool: env.isProd ? '' : 'source-map',
    devServer: {
        // contentBase: resolve('src'),
        port: 8000,
        host: '192.168.0.115',
        // host: 'localhost',
        // hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /ndoe_modules\//,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
                })
            }, {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            }, {
                test: /\.(jpg|jpeg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 10000,
                        name: 'img/[name].[hash:12].[ext]'
                    }
                }],    
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // name: ['common', 'vendor'].reverse()
            // filename: 'js/common.[hash:12].min.js'
            name: 'common',
            minChunks: 2,
            // minChunks: function(module, count) {
            //     return (
            //         module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(resolve('./node_modules')) === 0
            //     )
            // }
            // filename: '[name].[hash:12].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['common']
        }),
        ExtractPlugin,
        // new webpack.HotModuleReplacementPlugin()
    ]
}

let pages = entryConf.entryPug
for(let page in pages) {
    let conf = {
        filename: page.split('/')[1]+'.html',
        template: pages[page],
        inject: true,
        chunks: [page, 'common'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = webpackConf
