const glob = require('glob')
const path = require('path')

import { resolve } from './utils'
import { globEntryPath } from './../config/webpack.conf'

function fileKey(file, regexp) {
    return file.split(regexp)[1].split('.')[0]
}

function getEntry(globPath) {
    let entries = {}
    let pathname
    
    glob.sync(globPath).forEach(entry => {
        pathname = /\.(j|t)s$/.test(entry)
            ? entry.indexOf('/page') > 0
            ? fileKey(entry, 'src/js/page/')
            : fileKey(entry, 'src/js/')
            : fileKey(entry, 'src/view/page/')
            
        entries[pathname] = entry
    })
    
    // console.log(entries)
    return entries
}

let entryJsFiles
let entryPugFiles

Object.keys(globEntryPath).forEach(i => {
    // console.log(i, '=>', process.env.PROD_MODULE)
    if(i === process.env.PROD_MODULE) {
        entryJsFiles = globEntryPath[i].js
        entryPugFiles = globEntryPath[i].pug
    }
})

module.exports = {
    entryJs: getEntry(entryJsFiles),
    entryPug: getEntry(entryPugFiles)
}