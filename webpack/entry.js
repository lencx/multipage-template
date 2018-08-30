import glob from 'glob'
import { model as _model } from './../config/webpack.config'

let rule_1 = /(src\/)(.*)\/(view|js)\/(.*)\./
let rule_2 = /(src\/public\/js\/)(.*)(.js)/

function getEntry(model, type) {
    let entries = {}
    // console.log(`===========${type}==========`)
    glob.sync(_model[model][type]).forEach(entry => {
        // console.log(entry)
        let tmpExp = entry.match(rule_1)
        let modelName = tmpExp[2]

        if (modelName == 'public') {
            // console.log(entry)
            modelName = entry.match(rule_2)[2]
            entries[modelName] = entry
        } else {
            // models
            modelName = modelName.split('models/')[1]
            // console.log(modelName)
            
            let tmpModelPath = tmpExp[4]
            let pathname = `${modelName}${type === 'pug' ? '/' : '~'}${tmpModelPath}`
            pathname = /index$/.test(pathname) ? pathname : pathname + '/index'
            // console.log(pathname)

            // home page (`/`)
            if(/^home(~|\/)/.test(pathname)) pathname = pathname.split('home')[1].substr(1)
            entries[pathname] = entry
            // console.log(`model: ${modelName} --- path: ${tmpModelPath}`)
        }
    })
    if(model !== 'all' && type === 'js') {
        glob.sync(_model.pubModeJS).forEach(entry => {
            let _tmp = entry.match(rule_2)[2]
            entries[_tmp] = entry
        })
    }
    // console.log(entries)
    return entries
}

const entryJS = getEntry(_model.enableModel, 'js')
const entryPUG = getEntry(_model.enableModel, 'pug')

// console.log(entryJS)
// console.log('*******************')
// console.log(entryPUG)

export {
    entryJS,
    entryPUG,
}