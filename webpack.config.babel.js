const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

import { resolve, isPROD } from './config/utils'
import { entryJS, entryPUG } from './config/entry'

const ExtractSCSS = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
})


let webpackConf = {
    entry: entryJS,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {cacheDirectory: true}
            }
        }, {
            test: /\.pug$/,
            use: [
                'html-loader',
                {
                    loader: 'pug-html-loader',
                    options: {doctype: 'html'}
                }
            ]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?importLoader=1&minimize=true',
                    'postcss-loader',
                    'sass-loader'
                ]
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    plugins: [
        ExtractSCSS,
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}

isPROD ? webpackConf.plugins.push(new ProgressBarPlugin()) : ''

// multi page
for(let page in entryPUG) {
    let conf = {
        filename: `${page}.html`,
        template: entryPUG[page],
        inject: 'head',
        chunks: [page, 'commons', 'vendor'],
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
