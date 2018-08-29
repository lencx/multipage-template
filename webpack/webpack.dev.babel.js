import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import FriendlyErrorPlugin from 'friendly-errors-webpack-plugin'

import webpackConf from './webpack.base.babel'
import { proxyTable, hostPort } from './../config/webpack.config'

export default webpackMerge(webpackConf, {
    mode: 'development',
    plugins: [
        new FriendlyErrorPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    devServer: Object.assign(hostPort, {
        compress: true,
        hot: true,
        open: true,
        overlay: true,
        inline: true,
        stats: 'errors-only',
        quiet: true,
        proxy: proxyTable,
    }),
})