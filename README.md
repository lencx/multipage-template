# Multipage Template

## Command

```bash
### install package ###
yarn

### start dev service ###
# All Modules
yarn dev:all
# build dist file(delete original file)
yarn build:all

# A Module
yarn dev:a
yarn build:a

# B Module
yarn dev:b
yarn build:b

### clear dist file ###
yarn clear

#### add package ###
yarn add <package name> [--dev]

### remove package ###
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
* expose-loader(`jQuery`)

### Tools

* shx
* cross-env
* friendly-errors-webpack-plugin

### TypeScript

* typescript
* ts-loader
* @types/jquery

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

### Lib

* jQuery
* Rxjs
