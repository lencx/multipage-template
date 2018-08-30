// import webpack from 'webpack'
import webpack from 'webpack'
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HappyPack from 'happypack'
import { VueLoaderPlugin } from 'vue-loader'

import { resolve, devMode } from './utils'
import { entryJS, entryPUG } from './entry'
import { alias, hash, inlineLimit, commonJS } from './../config/webpack.config'

const assetsItems = ['js', 'css', 'images']
const assets = {}
assetsItems.some((item, i) => {assets[i] = `assets/${item}`})

const webpackConf = {
    entry: entryJS,
    output: {
        path: resolve('dist'),
        filename: `${assets[0]}/[name]${hash}.js`,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.scss', '.json', '.vue'],
        alias,
    },
    module: {
        rules: [],
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'css/[name].css' : `${assets[1]}/[name]${hash}.css`,
            chunkFilename: devMode ? 'css/[id].css' : `${assets[1]}/[id]${hash}.css`,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new VueLoaderPlugin(),

        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: ['babel-loader?cacheDirectory=true'],
        }),
        new HappyPack({
            id: 'scss',
            threads: 4,
            loaders: [
                'css-loader?sourceMap',
                'postcss-loader',
                'sass-loader',
            ],
        }),
    ],
}

// happypack
webpackConf.module.rules.push({
    test: /\.vue$/,
    use: 'vue-loader'
}, {
    test: /\.js$/,
    use: [
        'happypack/loader?id=js',
        'eslint-loader'
    ],
    exclude: /node_modules/,
    include: [resolve('src')]
}, {
    // https://vue-loader.vuejs.org/guide/pre-processors.html#pug
    test: /\.pug$/,
    oneOf: [
        // this applies to `<template lang="pug">` in Vue components
        {
          resourceQuery: /^\?vue/,
          use: 'pug-plain-loader',
        },
        // this applies to pug imports inside JavaScript
        {
            use: [
                'html-loader',
                {
                    loader: 'pug-plain-loader',
                    options: {
                        doctype: 'html',
                        basedir: resolve('src/public/templates'),
                    }
                }
            ]
        }
    ]
}, {
    test: /\.(sa|sc|c)ss$/,
    use: [
        devMode ? 'style-loader' : _loader,
        'happypack/loader?id=scss',
    ]
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `${assets[2]}/[name]${hash}.[ext]`,
        }
    }]
})

for(let page in entryPUG) {
    // console.log(page)
    let conf = {
        filename: page + '.html',
        template: entryPUG[page],
        inject: 'head',
        // hash: false,
        chunks: [page.replace('/', '~')].concat(devMode ? commonJS : []),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        },
        chunksSortMode: 'dependency',
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackConf
