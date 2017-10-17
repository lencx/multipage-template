'use strict';

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

import {LocalHost, CSSFileName, JSFileName, PublicPath, resolve} from './webpack/env.conf'

// console.log(HOST)
// console.log(resolve('a', 'b', 'a.css'))
const ExtactPlugin = new ExtractTextPlugin({
    filename: CSSFileName,
    allChunks: true
})

console.log(LocalHost)

const webpackConf = {}
/**
 * Entry && Output
 */
webpackConf.entry = ''
webpackConf.output = {
    path: resolve('dist'),
    filename: JSFileName,
    publicPath: PublicPath
}

/**
 * Alias
 */
webpackConf.resolve = {
    extensions: ['.js', '.scss', '.json'],
    alias: {
        '@': resolve('src'),
        '@sass': resolve('src/sass'),
        '@img': resolve('src/img')
    }
}

/**
 * DevServer
 */
webpackConf.devServer = {
    host: LocalHost.host,
    port: LocalHost.port,
    proxy: {
        '/api/*': {
            target: '',
            secure: false
        }
    }
}
























'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

import {LocalHost, CSSFileName, JSFileName, PublicPath, resolve} from './env.conf'

import {entryJs, entryPug} from './entry.conf'

console.log(entryJs, entryPug)

// console.log(HOST)
// console.log(resolve('a', 'b', 'a.css'))
const ExtactPlugin = new ExtractTextPlugin({
    filename: CSSFileName,
    allChunks: true
})

console.log(LocalHost)

const webpackConf = {
    entry: entryJs,
    output: {
        path: resolve('dist'),
        filename: JSFileName,
        publicPath: PublicPath
    },    
    module: {
        rules: []
    },
    plugins: []
}
/**
 * Entry && Output
 */
// webpackConf.entry = entryJs
// webpackConf.output = {
//     path: resolve('dist'),
//     filename: JSFileName,
//     publicPath: PublicPath
// }

/**
 * Alias
 */
webpackConf.resolve = {
    extensions: ['.js', '.scss', '.json'],
    alias: {
        '@': resolve('src'),
        '@sass': resolve('src/sass'),
        '@img': resolve('src/img')
    }
}

/**
 * DevServer
 */
webpackConf.devServer = {
    host: LocalHost.host,
    port: LocalHost.port,
    proxy: {
        '/api/*': {
            target: '',
            secure: false
        }
    }
}


/**
 * Rule
 */
webpackConf.module.rules = [
    {
        test: /\.js$/,
        // loader: 'source-map-loader'
        loader: 'babel-loader',
        include: [resolve('src')]
    }, {
        // test: /\.html$/
    }, {
        test: /\.pug$/,
        use: [
            'raw-loader',
            {
                loader: 'pug-html-loader',
                options: {
                    doctype: 'html'
                }
            }
        ]
    }, {
        // test: /\.scss$/,
        // use: [
        //     ''
        // ]
    }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
        }
    }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]'
        }
    }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
        }
    }
]


/**
 * Plugins
 */
webpackConf.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        chunks: ['commom']
    }),
    ExtactPlugin,
    new webpack.optimize.ModuleConcatenationPlugin()
)


/**
 * Mulit page
 */
for(let page in entryPug) {
    let conf = {
        filename: page + '.html',
        template: entryPug[page],
        inject: true,
        chunks: [page, 'common'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
    }
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = webpackConf