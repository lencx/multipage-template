'use strict'

const path = require('path')

const hash = 8
const CSSFileName = `css/[name].[hash:${hash}].css`
const JSFileName = `js/[name].[hash:${hash}].js`

module.exports = {
    commonConf: {
        CSSFileName,
        JSFileName
    },
    buildConf: {
        prodSourceMap: false,
        assetsPublicPath: '/',
        // prodGzip: true,
        // prodGzipExtension: false,
    },
    devConf: {
        host: '172.16.0.45',
        port: process.env.PORT || 8020,
        assetsPublicPath: '/',
        autoOpenBrowser: true,
        // https://webpack.js.org/configuration/stats/
        //  errors-only | minimal | none | normal | detailed | verbose
        stats: 'errors-only',
        // https://webpack.js.org/configuration/devtool/#devtool
        devtool: 'cheap-module-eval-source-map',
        proxyTable: {
            // 
        },
        cssSourceMap: true
    }
}