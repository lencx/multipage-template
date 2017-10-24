'use strict'

const hash = 8

module.exports = {
    commonConf: {
        CSSFileName: `css/[name].css`,
        JSFileName: `js/[name].js`,
        // CSSFileName: `css/[name].[hash:${hash}].css`,
        // JSFileName: `js/[name].[hash:${hash}].js`,
        injectIgnore: ['404', 'about/index']
    },
    buildConf: {
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
                // target: 'http://www.example.com',
                secure: false
            }
        },
        hashExt: true
    }
}