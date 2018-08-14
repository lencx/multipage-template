import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { resolve, isDEV } from './utils'
import { entryJS, entryPUG } from './entry'
import { alias, hash, inlineLimit } from './../config/webpack.config'

const webpackConf = {
    entry: entryJS,
    output: {
        path: resolve('dist'),
        filename: `js/[name]${hash}.js`,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.scss', '.json'],
        alias,
    },
    module: {
        rules: []
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `css/[name]${hash}.css`,
            chunkFilename: '[id].css',
        })
    ],
}

webpackConf.module.rules.push({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {cacheDirectory: true}
        },
        'eslint-loader'
    ],
    exclude: /node_modules/,
    include: [resolve('src')]
}, {
    test: /\.pug$/,
    use: [
        'html-loader',
        {
            loader: 'pug-html-loader',
            options: {
                doctype: 'html',
                basedir: resolve('src/public/templates'),
            }
        }
    ]
}, {
    test: /\.(sa|sc|c)ss$/,
    use: [
        // isDEV ? 'style-loader' : _loader,
        _loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
    ]
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `img/[name]${hash}.[ext]`
        }
    }]
}, {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `media/[name]${hash}.[ext]`
        }
    }]
}, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `fonts/[name]${hash}.[ext]`
        }
    }]
})

for(let page in entryPUG) {
    // console.log(page)
    let conf = {
        filename: page + '.html',
        template: entryPUG[page],
        inject: 'head',
        // hash: false,
        chunks: [page.replace('/', '~'), 'common', 'vendor'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackConf
