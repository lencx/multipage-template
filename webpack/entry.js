import glob from 'glob'
import { model as _model } from './../config/webpack.config'

function getEntry(model, type) {
    let entries = {}
    // console.log(`===========${type}==========`)
    glob.sync(_model[model][type]).forEach(entry => {
        // console.log(entry)
        let tmpExp = entry.match(/(src\/)(.*)\/(view|js)\/(.*)\./)
        let modelName = tmpExp[2]
        if (modelName == 'assets') return false
        let tmpModelPath = tmpExp[4]
        let pathname = `${modelName}${type === 'pug' ? '/' : '~'}${tmpModelPath}`
        entries[pathname] = entry
        // console.log(`model: ${modelName} --- path: ${tmpModelPath}`)
    })
    // console.log(entries)
    return entries
}

const entryJS = getEntry(_model.enableModel, 'js')
const entryPUG = getEntry(_model.enableModel, 'pug')

export {
    entryJS,
    entryPUG,
}