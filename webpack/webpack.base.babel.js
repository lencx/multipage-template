import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { resolve, isDEV } from './utils'
import { entryJS, entryPUG } from './entry'
import { alias, hash, inlineLimit } from './../config/webpack.config'

const rules = [{
    test: /\.js$/,
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: true
        }
    }],
    include: [resolve('src')]
}, {
    test: /\.pug$/,
    use: [
        'html-loader',
        {
            loader: 'pug-html-loader',
            options: {
                doctype: 'html'
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
}]

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
    module: { rules },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `css/[name]${hash}.css`,
            chunkFilename: '[id].css',
        })
    ],
}


for(let page in entryPUG) {
    // console.log(page)
    // let _main = page.split('/')[0] === "toefl" ? "toefl/main" : "main"
    // // console.log(`${_m}/main`)
    let conf = {
        filename: page + '.html',
        template: entryPUG[page],
        inject: 'head',
        // hash: false,
        chunks: [page.replace('/', '~'), 'commons', 'vendor'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency'
    }
    // console.log(conf)
    // console.log(webpackConf.plugins)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackConf
