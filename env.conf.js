// Windows
// SET NODE_ENV=development
// OS X or Linux
// export NODE_ENV=development
const env = process.env.NODE_ENV || 'dev'
const isProd = env === 'prod'

exports.isProd = isProd