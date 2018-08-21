// import webpack from 'webpack'
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { resolve, devMode } from './utils'
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
        rules: [],
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'css/[name].css' : `css/[name]${hash}.css`,
            chunkFilename: devMode ? 'css/[id].css' : `css/[id]${hash}.css`,
        }),
    ],
}

// happypack
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
        // 'raw-loader',
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
        devMode ? 'style-loader' : _loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
    ]
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `images/[name]${hash}.[ext]`,
        }
    }]
}, {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
    use: [{
        loader: 'file-loader',
        options: {
            limit: inlineLimit,
            name: `[name]${hash}.[ext]`,
            outputPath: 'media/',
        }
    }]
}, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `fonts/[name]${hash}.[ext]`,
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
        chunks: [page.replace('/', '~'), 'common'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunksSortMode: 'dependency',
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackConf
