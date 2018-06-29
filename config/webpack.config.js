import { resolve, addModel } from './../webpack/utils'
import { localIP, userInfo } from './../webpack/local'

// Output developer's system information(`/config/userInfo.json`)
userInfo()

const isLocal = false,
    port = 8020,
    hashLen = 7,
    hasHash = true,
    inlineLimit = 10000,
    hash = hasHash ? `.[hash:${hashLen}]` : '',
    userIP = isLocal ? 'localhost' : localIP

// Model
const model = {
    // all | www | h5
    enableModel: 'all',
    all: {
        js: resolve('src/**/js/**/*.js'),
        pug: resolve('src/**/view/**/*.pug'),
    },
}
addModel(model, 'www')
addModel(model, 'h5')

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