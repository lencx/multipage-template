const glob = require('glob')
import { resolve, model } from './utils'

let _m = model === 'all' ? '' : model
const currModel = {
    js: resolve(`src/model/${_m}/**/*.js`),
    pug: resolve(`src/model/${_m}/**/*.pug`)
}

// console.log(currModel)
const fileKey = f => f.split('/src/model/')[1].split('.')[0]

function getEntry(globPath) {
    let entries = {}

    glob.sync(globPath).forEach(entry => {
        let pathname = /\.js$/.test(entry)
            ? fileKey(entry).split('/js/').join('/')
            : fileKey(entry)
        entries[pathname] = entry
    })
    // console.log(entries)
    return entries
}

let entryJS = getEntry(currModel.js)
let entryPUG = getEntry(currModel.pug)
// console.log(entryJS)

export {
    entryJS,
    entryPUG
}