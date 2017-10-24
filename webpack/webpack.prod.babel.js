'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
import { buildConf } from './../config/webpack.conf'
import { webpackConf } from './webpack.config.babel'

module.exports = webpackMerge(webpackConf, {
    output: {
        publicPath: buildConf.assetsPublicPath
    }
})
