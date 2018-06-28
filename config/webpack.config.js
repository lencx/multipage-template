import { resolve, OSUSER } from './../webpack/utils'

const isLocal = false
const port = 8020
const hashLen = 7
const hasHash = true
const inlineLimit = 10000

const hash = hasHash ? `.[hash:${hashLen}]` : ''

// user IP
let userIP = 'localhost'
if(!isLocal) {
    switch (OSUSER) {
        case 'cx':
            userIP = 'xxx.xxx.xxx.xxx'
            break
        case 'ZWL':
            userIP = 'xxx.xxx.xxx.xxx'
            break
        default:
            userIP
    }
}

// Model
const model = {
    // all | www | h5
    enableModel: 'all',
    all: {
        js: resolve('src/**/js/**/*.js'),
        pug: resolve('src/**/view/**/*.pug'),
    },
    www: {
        js: resolve('src/www/js/**/*.js'),
        pug: resolve('src/www/view/**/*.pug'),
    },
    h5: {
        js: resolve('src/h5/js/**/*.js'),
        pug: resolve('src/h5/view/**/*.pug'),
    },
}

const proxy = {
    '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
    }
}

const alias = {
    '@www': resolve('src/www'),
    '@app': resolve('src/app'),
    '@h5': resolve('src/h5'),
}

const devConf = {
    host: userIP,
    port,
}

export {
    model,
    proxy,
    alias,
    hash,
    inlineLimit,
}