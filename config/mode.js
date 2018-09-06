const fs = require('fs-extra')
let argMdoe = process.argv[2]
if(argMdoe !== undefined) {
    argMdoe = argMdoe.split('@')[1]
} else {
    console.log('Please enter mode name, rule: make new mode@test | yarn new mode@test')
    process.exit()
}

let modeData = require('./data/mode.json')
let aliasData = require('./data/alias.json')

const writeFile = (filename, data) => {
    fs.writeJson(__dirname + `/data/${filename}.json`, data, {spaces: 4}, err => {
        if (err) return console.error(err)
        console.log(`${filename} file successfully written!`)
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
        // fs.writeJson(__dirname + '/data/mode.json', modeData, {spaces: 4}, err => {
        //     if (err) return console.error(err)
        //     console.log('mode file successfully written!')
        // })
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
        // fs.writeJson(__dirname + '/data/alias.json', aliasData, {spaces: 4}, err => {
        //     if (err) return console.error(err)
        //     console.log('alias file successfully written!')
        // })
    }
}
writeModeJson()
writeAliasJson()

// const file = __dirname + '/data/mode.json'
// fs.readJson(file)
//     .then(data => {
//         // console.log(data)
//         let modeName = Object.keys(data)
//         if(!modeName.includes(argMdoe)) {
//             data = Object.assign(data, {
//                 [argMdoe]: {
//                     js: `src/**/${argMdoe}/js/**/*.js`,
//                     pug: `src/**/${argMdoe}/view/**/*.pug`,
//                 }
//             })
//             fs.writeJson(file, data, {spaces: 4}, err => {
//                 if (err) return console.error(err)
//                 console.log('success!')
//             })
//         }
//     })