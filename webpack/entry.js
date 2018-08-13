import glob from 'glob'
import { model as _model } from './../config/webpack.config'

function getEntry(model, type) {
    let entries = {}
    // console.log(`===========${type}==========`)
    glob.sync(_model[model][type]).forEach(entry => {
        // console.log(entry)
        let tmpExp = entry.match(/(src\/)(.*)\/(view|js)\/(.*)\./)
        let modelName = tmpExp[2]

        if (modelName == 'public') {
            // console.log(entry)
            modelName = entry.match(/(src\/public\/js\/)(.*)(.js)/)[2]
            entries[modelName] = entry
        } else {
            // models
            modelName = modelName.split('models/')[1]
            // console.log(modelName)
            
            let tmpModelPath = tmpExp[4]
            let pathname = `${modelName}${type === 'pug' ? '/' : '~'}${tmpModelPath}`

            // home page (`/`)
            if(/^home(~|\/)/.test(pathname)) pathname = pathname.split('home')[1].substr(1)
            entries[pathname] = entry
            // console.log(`model: ${modelName} --- path: ${tmpModelPath}`)
        }
    })
    console.log(entries)
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