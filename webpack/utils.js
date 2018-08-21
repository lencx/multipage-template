import path from 'path'

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)

// env
const devMode = process.env.NODE_ENV === 'production'
    ? false : true

const addModel = (obj, modelName) => {
    return Object.assign(obj, {
        [modelName]: {
            js: resolve(`src/${modelName}/js/**/*.js`),
            pug: resolve(`src/${modelName}/view/**/*.pug`),
        }
    })
}

export {
    resolve,
    devMode,
    addModel,
}