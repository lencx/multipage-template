import { resolve, addModel } from './../webpack/utils'
import localIP from 'l3x-ip'
import userInfo from 'l3x-devinfo'

// Output developer's system information(`/config/dev-info.json`)
userInfo('config/dev-info.json')
let model = {}

/****************** Config Start *********************/
// all | www | h5 | ...
const enableModel = 'all'
// Add Model
addModel(model, 'home')
addModel(model, 'www')
addModel(model, 'h5')

// true: localhost | false: IP address
const isLocal = false
// service port
const port = 6088
// hash length
const hashLen = 7
// whether hash
const hasHash = true
// specifying the maximum size of a file in bytes.
const inlineLimit = 8192
// resources that need to be dynamically inserted.
const commonJS = ['common']
const hash = hasHash ? `.[hash:${hashLen}]` : ''
const userIP = isLocal ? 'localhost' : localIP
/****************** Config End *********************/

Object.assign(model, {
    enableModel,
    all: {
        js: resolve('src/**/js/**/*.js'),
        pug: resolve('src/**/view/**/*.pug'),
    },
})


/****************** proxy *********************/
const proxyTable = {
    '/api/*': {
        target: 'http://xxx.xxx.xxx.xxx:8080',
        secure: false,
        pathRewrite: {'^/api': '/api'}
    },
}

/****************** alias *********************/
const alias = {
    '@pub': resolve('src/public'),
    '@pubJS': resolve('src/public/js'),
    '@pubUtils': resolve('src/public/utils'),
    '@pubcp': resolve('src/public/components'),
    '@pubScss': resolve('src/public/scss'),
    '@www': resolve('src/models/www'),
    '@app': resolve('src/models/app'),
    '@h5': resolve('src/models/h5'),
}

/****************** address *********************/
const hostPort = {
    host: userIP,
    port,
}

export {
    model,
    proxyTable,
    alias,
    hash,
    inlineLimit,
    hostPort,
    commonJS,
}