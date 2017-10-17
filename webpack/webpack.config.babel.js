'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

import { resolve, envInfo } from './utils'
import { entryJs, entryPug } from './entry.conf'
import { commonConf, buildConf, devConf } from './../config/webpack.conf'

const env = process.env.NODE_ENV === 'production'
env ? envInfo('PROD ENV') : envInfo('DVE ENV')

const ExtactPlugin = new ExtractTextPlugin({
    filename: commonConf.CSSFileName,
    allChunks: true
})

// console.log(process.env.NODE_ENV)

const webpackConf = {
    entry: entryJs,
    output: {
        path: resolve('dist'),
        filename: commonConf.JSFileName,
        publicPath: env ? buildConf.assetsPublicPath : devConf.assetsPublicPath
    },
    module: {
        rules: []
    },
    plugins: []
}


/**
 * Alias
 */
webpackConf.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
        '@': resolve('src'),
        '@sass': resolve('src/sass'),
        '@img': resolve('src/img')
    }
}


/**
 * Rule
 */
webpackConf.module.rules = [
    {
        test: /\.tsx?$/,
        loader: 'ts-loader'
    }, {
        test: /\.js$/,
        // loader: 'source-map-loader'
        loader: 'babel-loader',
        include: [resolve('src')]
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [
                'css-loader?importLoader=1',
                'postcss-loader',
                'sass-loader'
            ]
        })
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
        name: 'commons',
        minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        chunks: ['commons']
    }),
    ExtactPlugin,
    new webpack.optimize.ModuleConcatenationPlugin()
)


/**
 * Multi page
 */
for(let page in entryPug) {
    let isInject = true
    commonConf.injectIgnore.some(i => {
        if(i === page) return isInject = false
    })
    // console.log(page, '=>', isInject)
    let conf = {
        filename: page + '.html',
        template: entryPug[page],
        inject: isInject,
        chunks: [page, 'commons'].concat(commonConf.commonJsFile),
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = {
    webpackConf
}