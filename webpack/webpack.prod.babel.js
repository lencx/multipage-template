import webpackMerge from 'webpack-merge'
import webpackConf from './webpack.base.babel'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import { resolve } from './utils'

// console.log(resolve('dist'))

export default webpackMerge(webpackConf, {
    mode: 'production',
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: resolve(),
            verbose: true,
            dry: false
        }),
        new ManifestPlugin({
            serialize: manifest => {
                let o = {
                    html: [],
                    css: [],
                    js: [],
                    images: [],
                }
                const el = (a, b) => o[a].push(`[${b}] => ${manifest[b]}`)
                Object.keys(manifest).forEach(i => {
                    if(/^img\//.test(i)) el('images', i)
                    if(/.js$/.test(i)) el('js', i)
                    if(/.css$/.test(i)) el('css', i)
                    if(/.html$/.test(i)) o['html'].push(`${manifest[i]}`)
                })
                let _o = Object.assign({
                    htmlTotal: o.html.length,
                    imagesTotal: o.images.length,
                }, o)
                // return JSON.stringify(manifest, null, 2)
                return JSON.stringify(_o, null, 2)
            }
        })
    ]
})