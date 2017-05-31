const glob = require('glob')
const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

let globPath = {
    js: resolve('src/js/*.js'),
    pug: resolve('src/view/*.pug')
}

function getEntey(globPath) {
    let entries = {},
        basename,
        tmp,
        pathname
    glob.sync(globPath).forEach(entry => {
        // console.log(entry)
        basename = path.basename(entry, path.extname(entry))
        tmp = entry.split('/').splice(-3)
        pathname = tmp.splice(0, 1) + '/' + basename
        entries[pathname] = entry
        // console.log(entry)
        // console.log(pathname)
    })
    return entries
}

exports.entryJs = getEntey(globPath.js)
exports.entryPug = getEntey(globPath.pug)