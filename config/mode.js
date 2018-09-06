const fs = require('fs-extra')
const chalk = require('chalk')
let argMdoe = process.argv[2].split('@')[1]

let modeData = require('./data/mode.json')
let aliasData = require('./data/alias.json')

const writeFile = (filename, data) => {
    fs.writeJson(__dirname + `/data/${filename}.json`, data, {spaces: 4}, err => {
        if (err) return console.error(err)
        console.log(chalk.green(`${filename} file successfully written!`))
    })
}

function writeModeJson() {
    let modeName = Object.keys(modeData)
    if(!modeName.includes(argMdoe)) {
        modeData = Object.assign(modeData, {
            [argMdoe]: {
                js: `src/**/${argMdoe}/js/**/*.js`,
                pug: `src/**/${argMdoe}/view/**/*.pug`,
            }
        })
        writeFile('mode', modeData)
    }
}
function writeAliasJson() {
    let aliasName = Object.keys(aliasData)
    let key = '@'+argMdoe
    if(!aliasName.includes(key)) {
        modeData = Object.assign(aliasData, {
            [key]: `src/models/${argMdoe}`
        })
        writeFile('alias', aliasData)
    }
}
writeModeJson()
writeAliasJson()