module.exports = {
    devConf: {
        host: 'localhost',
        port: '8099'
    },
    proxyTable: {
        "/api/*": {
            target: 'xxx.xxx.xxx.xxx',
            secure: false,
            // pathRewrite: {'^/api': '/new-api'}
        }
    }
}