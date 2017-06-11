// Windows
// SET NODE_ENV=development
// OS X or Linux
// export NODE_ENV=development
const env = process.env.NODE_ENV || 'dev'
const isProd = env === 'prod'
// const host = '192.168.1.203'
const host = '192.168.0.115'
const port = env === 'prod' ? 8083: 8082
const publicPath = env === 'prod' ? '/dist/' : '/'
// const host = 'localhost'

// exports.isProd = isProd
module.exports = {
    isProd,
    host,
    port,
    publicPath
}