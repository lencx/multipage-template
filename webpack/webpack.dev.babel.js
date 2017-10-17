'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')

import { devConf } from './../config/webpack.conf'
import { webpackConf } from './webpack.config.babel'
import { resolve } from './utils'

module.exports = webpackMerge(webpackConf, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorPlugin()
    ],
    devtool: devConf.devtool,
    devServer: {
        host: devConf.host,
        port: devConf.port,
        open: devConf.autoOpenBrowser,
        stats: devConf.stats,
        proxy: {
            '/api/*': {
                target: '',
                secure: false
            }
        }
    },
})
