## Multi page template
> vue@2.3.x & iview@2.x & pug & postcss & sass

### Build Setup

```bash
## yarn init
## yarn add
## yarn remove

# install package
yarn

# start server
yarn dev

# build (production)
yarn build:prod

# clear build file
yarn clear

# static server
# `path: /dist/*`
yarn static

# build event.js
# `./static/js/event.js` => `./static/dist/event.js`
gulp
```

### Setting proxy

```js
/**
* webpack.config.js
*/
module.exports = {
    devServer: {
        // contentBase: resolve('src'),
        port: 8000,
        host: '192.168.0.115', // IP address(Wi-Fi)
        // host: 'localhost',
        hot: true
    }
}
```

### Project structure

```bash
# []: Directory
proj
|- [dist] # production
|- [node_modules]
|- [src] # development
|    |- [img]
|    |- [includes] # template
|    |- [js]
|    |- [sass]
|    `- [view] # page (multi page)
|- [static] # vendor
|    |- [css]
|    |- [dist] # production
|    |- [js]
|    |    |- event.js # global js file，run `gulp` command
|    |    |- vue.min.js
|    |    `- ...
|    `- [styles] # iview style
`-...
# important: The page name should to be same as the js file name.
```

