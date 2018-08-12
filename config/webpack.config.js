import { resolve, addModel } from './../webpack/utils'
import { localIP, userInfo } from './../webpack/local'

// Output developer's system information(`/config/userInfo.json`)
userInfo()
let model = {}

/****************** Config Start *********************/
// all | www | h5 | ...
const enableModel = 'all'
// Add Model
addModel(model, 'home')
addModel(model, 'www')
addModel(model, 'h5')


const isLocal = false
const port = 6001
const hashLen = 7
const hasHash = true
const inlineLimit = 10000
const hash = hasHash ? `.[hash:${hashLen}]` : ''
const userIP = isLocal ? 'localhost' : localIP
/****************** Config End *********************/

console.log(localIP)

model = {
    enableModel,
    all: {
        js: resolve('src/**/js/**/*.js'),
        pug: resolve('src/**/view/**/*.pug'),
    },
}

const proxy = {
    '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
    }
}

const alias = {
    '@common': resolve('src/assets'),
    '@commonJS': resolve('src/assets/js'),
    '@commonUtils': resolve('src/assets/utils'),
    '@commonScss': resolve('src/assets/scss'),
    '@www': resolve('src/models/www'),
    '@app': resolve('src/models/app'),
    '@h5': resolve('src/models/h5'),
}

const hostPort = {
    host: userIP,
    port,
}

export {
    model,
    proxy,
    alias,
    hash,
    inlineLimit,
    hostPort,
}