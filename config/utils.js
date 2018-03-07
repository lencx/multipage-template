const path = require('path')
const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)
const isPROD = ~process.env.npm_lifecycle_script.indexOf('production') ? true : false
const model = JSON.parse(process.env.npm_config_argv).original[0].split(':')[1]

export {
    resolve,
    isPROD,
    model
}