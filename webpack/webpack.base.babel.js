// import webpack from 'webpack'
import webpack from 'webpack'
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { resolve, devMode } from './utils'
import { entryJS, entryPUG } from './entry'
import { alias, hash, inlineLimit } from './../config/webpack.config'

const assetsItems = ['js', 'css', 'images']
const assets = {}
assetsItems.some((item, i) => {assets[i] = `assets/${item}`})

const webpackConf = {
    entry: entryJS,
    output: {
        path: resolve('dist'),
        filename: `${assets[0]}/[name]${hash}.js`,
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
            filename: devMode ? 'css/[name].css' : `${assets[1]}/[name]${hash}.css`,
            chunkFilename: devMode ? 'css/[id].css' : `${assets[1]}/[id]${hash}.css`,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
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
        'html-loader',
        // 'raw-loader',
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
        'css-loader?sourceMap',
        'postcss-loader',
        'sass-loader',
    ]
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: inlineLimit,
            name: `${assets[2]}/[name]${hash}.[ext]`,
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
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        },
        chunksSortMode: 'dependency',
    }
    // console.log(conf)
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf))
}

export default webpackConf
