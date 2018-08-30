import webpackMerge from 'webpack-merge'
import webpackConf from './webpack.base.babel'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import { resolve, objAssign, objLen } from './utils'

const objLen2 = o => {
    if(o) return objLen(o)
}

export default webpackMerge(webpackConf, {
    mode: 'production',
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all',
        },
        // minimize: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: resolve(),
            verbose: true,
            dry: false
        }),
        new ManifestPlugin({
            serialize: manifest => {
                let o = {html: []}
                
                Object.keys(manifest).forEach(i => {
                    if(/\/images\//.test(i)) objAssign(o, 'images', i, manifest[i])
                    if(/.js$/.test(i)) objAssign(o, 'js', i, manifest[i])
                    if(/.css$/.test(i)) objAssign(o, 'css', i, manifest[i])
                    if(/.html$/.test(i)) o['html'].push(`${manifest[i]}`)
                })
                let _o = Object.assign({
                    htmlTotal: o.html.length,
                    cssTotal: objLen2(o.css),
                    jsTotal: objLen2(o.js),
                    imagesTotal: objLen2(o.images),
                }, o)
                // return JSON.stringify(manifest, null, 2)
                return JSON.stringify(_o, null, 2)
            }
        })
    ]
})