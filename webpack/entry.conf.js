const glob = require('glob')
const path = require('path')

import { resolve } from './utils'

let globPath = {
    js: resolve('src/js/**/*.+(t|j)s'),
    pug: resolve('src/view/page/**/*.pug'),
}

function fileKey(file, regexp) {
    return file.split(regexp)[1].split('.')[0]
}

function getEntry(globPath) {
    let entries = {}
    let pathname
    
    glob.sync(globPath).forEach(entry => {
        pathname = /\.(t|j)s$/.test(entry)
            ? entry.indexOf('/page') > 0
            ? fileKey(entry, 'src/js/page/')
            : fileKey(entry, 'src/js/')
            : fileKey(entry, 'src/view/page/')
            
        entries[pathname] = entry
    })
    
    return entries
}

module.exports = {
    entryJs: getEntry(globPath.js),
    entryPug: getEntry(globPath.pug)
}