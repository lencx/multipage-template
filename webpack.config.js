'use strict';

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractPlugin = new ExtractTextPlugin({
    filename: 'css/[name].[chunkhash:12].css',
    allChunks: true
})
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./env.conf')
const entryConf = require('./entry.conf')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

// console.log(env.isProd)
// console.log(entryConf.entryJs)
// let cloneEntry = {}
// Object.keys(entryConf.entryJs).forEach(key => {
//     // console.log(key)
//     let k = key.split('/')[1]
//     entryConf.entryJs
//     for(let i in entryConf.entryJs) {
//         if(key === i) {
//             cloneEntry['aaa/'+k] = entryConf.entryJs[i]
//         }
//     }
// })
// console.log(cloneEntry)

const webpackConf = {
    // entry: env.isProd ? cloneEntry: entryConf.entryJs,
    entry: entryConf.entryJs,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[chunkhash:12].js',
        publicPath: env.isProd ? '/dist/' : '/'
    },
    // devtool: env.isProd ? '' : 'source-map',
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
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(resolve('./node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        ExtractPlugin
    ]
}

let pages = entryConf.entryPug
for(let page in pages) {
    let conf = {
        filename: page.split('/')[1]+'.html',
        template: pages[page],
        inject: true,
        chunks: [page, 'vendor', 'manifest'],
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
