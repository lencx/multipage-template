// Generate a template for the modules
const createFile = require('./../.bin/create-file')


let level = createFile.view.split('#')[1]
let backLevel = '../'.repeat(level.match(/\//g).length)
let _filename = backLevel + 'view' + level
// console.log(_filename)

// get terminal arguments
let args2 = process.argv[2].split('@') // mode
let args3 = process.argv[3] // file path

let _txt = args3 !== undefined ? '; Path: ' + args3 : ''
let _title = `Model: ${args2[1]}${_txt}`

// pug file template
let pugTpl = `extends /layout/main

block title
    title ${_title}

block content
    h1 ${_title}
`

// scss file template
let styleTpl = `body {
    background: pink;
    color: #532;
}
`

// js file template
let jsTpl = `// pug(HRM)
if(process.env.NODE_ENV === 'development') require('${_filename}')

import '@${args2[1]}/scss${level.split('.pug')[0]}.scss'
`

module.exports = {
    view: pugTpl,
    scss: styleTpl,
    js: jsTpl
}