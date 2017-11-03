'use strict'

const hash = 8
import { resolve } from './../webpack/utils'

module.exports = {
    globEntryPath: {
        // All Modules
        all: {
            js: resolve('src/js/**/*.+(j|t)s'),
            pug: resolve('src/view/page/**/*.pug'),
        },

        // Model A
        model_A: {
            js: resolve('src/js/page/model-A/**/*.+(j|t)s'),
            pug: resolve('src/view/page/model-A/**/*.pug'),
        },

        // Model B
        model_B: {
            js: resolve('src/js/page/model-B/**/*.+(j|t)s'),
            pug: resolve('src/view/page/model-B/**/*.pug'),
        }
    },
    alias: {
        // common
        '@': resolve('src'),
        '@sass': resolve('src/sass'),
        '@img': resolve('src/img'),
        '@js': resolve('src/js'),
        '@jsLib': resolve('src/js/lib'),

        // Model A
        '@jsModelA': resolve('src/js/page/model-A'),
        '@sassModelA': resolve('src/sass/page/model-A'),
        
        // Model B
        '@jsModelB': resolve('src/js/page/model-B'),
        '@sassModelB': resolve('src/sass/page/model-B'),
    },
    commonConf: {
        CSSFileName: `css/[name].css`,
        JSFileName: `js/[name].js`,
        // CSSFileName: `css/[name].[hash:${hash}].css`,
        // JSFileName: `js/[name].[hash:${hash}].js`,
        injectIgnore: ['404']
    },
    buildConf: {
        assetsPublicPath: '/'
    },
    devConf: {
        host: 'localhost',
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