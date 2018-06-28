import webpackMerge from 'webpack-merge'
import webpackConf from './webpack.base.babel'
import ManifestPlugin from 'webpack-manifest-plugin'

export default webpackMerge(webpackConf, {
    mode: 'production',
    plugins: [
        new ManifestPlugin()
    ]
})