'use strict'

const hash = 8

module.exports = {
    commonConf: {
        CSSFileName: `css/[name].[hash:${hash}].css`,
        JSFileName: `js/[name].[hash:${hash}].js`,
        injectIgnore: ['404', 'about/index'],
        commonJsFile: ['main', 'lib/lib-a']
    },
    buildConf: {
        prodSourceMap: false,
        assetsPublicPath: '/'
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

        // Interface
        proxyTable: {
            '/api/*': {
                target: 'http://101.81.18.134:7088',
                // target: 'http://www.example.com',
                secure: false
            }
        },
        cssSourceMap: true
    }
}