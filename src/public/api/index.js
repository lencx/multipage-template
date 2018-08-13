module.exports = process.env.NODE_ENV === 'development'
? require('./dev.api') : require('./prod.api')