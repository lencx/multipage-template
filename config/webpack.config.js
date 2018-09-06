import { resolve } from './../webpack/utils'
import localIP from 'l3x-ip'
import userInfo from 'l3x-devinfo'

// Output developer's system information(`/config/dev-info.json`)
userInfo('config/data/dev-info.json')

import model from './data/mode.json'
import aliasData from './data/alias.json'

/****************** Config Start *********************/
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


/****************** proxy *********************/
const proxyTable = {
    '/api/*': {
        target: 'http://xxx.xxx.xxx.xxx:8080',
        secure: false,
        pathRewrite: {'^/api': '/api'}
    },
}

/****************** alias *********************/
let alias = {}
Object.keys(aliasData).forEach(item => {
    Object.assign(alias, {
        [item]: resolve(aliasData[item])
    })
})

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