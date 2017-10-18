# Multipage Template

## Command

```bash
# install package
yarn

# start dev service
yarn dev

# clear dist file
yarn clear

# build dist file(delete original file)
yarn build

# build dist file(Don't delete original file)
yarn build:no

# add package
yarn add <package name> [--dev]

# remove package
yarn remove <package name>
```

## Config

### webpack Config

|Name|Description|
|:---|:---|
|entry file type|`.ts` or `.js`|
|webpack config(`dev` && `prod`)|[webpack conf](./config/webpack.conf.js)|

### TS Config

> [tsconfig.json](./tsconfig.json)

```json
// true: allow use ts or js
"allowJs": true
```

## Install package

### Webpack

* webpack
* webpack-dev-server
* file-loader
* url-loader

### Tools

* shx
* friendly-errors-webpack-plugin

### TypeScript

* typescript
* ts-loader

### Babel

* babel-core
* babel-loader
* babel-preset-env

<!-- * babel-register -->

### Pug Tempalte

* pug
* raw-loader
* pug-html-loader
* html-webpack-plugin

### CSS Precompiled

* style-loader
* css-loader
* node-sass
* sass-loader
* postcss
* postcss-loader
* postcss-cssnext
* lost
* extract-text-webpack-plugin

### HTTP

* axios