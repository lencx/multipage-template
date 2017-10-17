const glob = require('glob')
const path = require('path')

import { resolve } from './utils'

let globPath = {
    js: resolve('src/js/**/*.js'),
    pug: resolve('src/view/page/**/*.pug'),
}

function getEntry(globPath) {
    let entries = {}
    let pathname
    
    glob.sync(globPath).forEach(entry => {
        pathname = entry.indexOf('.js') > 0
            ? pathname = entry.indexOf('/page') > 0
            ? entry.split('src/js/page/')[1].split('.')[0]
            : entry.split('src/js/')[1].split('.')[0]
            : entry.split('src/view/page/')[1].split('.')[0]
        
        entries[pathname] = entry
    })
    
    return entries
}

module.exports = {
    entryJs: getEntry(globPath.js),
    entryPug: getEntry(globPath.pug)
}