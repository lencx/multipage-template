const path = require('path')
const chalk = require('chalk')

const resolve = function resolve(...dir) {
    return path.resolve(__dirname, '..', ...dir)
}

function repeat(str = '*-*', len = 10) {
    return str.repeat(len)
}

const envInfo = function(msg) {
    console.log(chalk.white.bgMagenta(`${repeat()} ${chalk.bold.yellow(msg)} ${repeat()}`))
}

module.exports = {
    resolve,
    envInfo
}