module.exports = {
    plugins: [
        require('postcss-cssnext')({
            browsers: 'last 10 versions'
        }),
        require('lost')
    ]
}