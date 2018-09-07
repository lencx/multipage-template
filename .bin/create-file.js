const path = require('path')
const { red, magenta } = require('chalk')

// get terminal arguments
let args2 = process.argv[2].split('@') // mode
let args3 = process.argv[3] // file path

if (!args2[1]) {
    console.error(red('no mode@mode_name specified'))
    console.error(magenta('make new mode@test | yarn new mode@test'))
    process.exit(0)
}

let _createFile = {}
let _filePath = path.resolve(__dirname, '..', 'src/models')
// let _title = camelcase(args3)

const fileObj = name => ({
    view: `${name}.pug`,
    js: `${name}.js`,
    scss: `${name}.scss`,
})

if(args3) {
    _filePath += `/${args2[1]}/#/`
    if(args3.indexOf('/') > 0) {
        _filePath += args3
        // console.log(_filePath)
        _createFile = fileObj(_filePath)
    } else {
        _filePath += `${args3}/index`
        // console.log(_filePath)
        _createFile = fileObj(_filePath)
    }
} else {
    let tpm = _filePath
    _filePath += `/${args2[1]}/#/index`
    // console.log(_filePath)
    _createFile = fileObj(_filePath)
    _createFile = Object.assign(_createFile, {
        img: `${tpm}/${args2[1]}/img/.gitkeep`
    })
}
// console.log(_createFile)

module.exports = _createFile