# Multipage Template

## Command

```bash
# install
yarn

yarn dev

yarn build

### help ###
# webpack-cli
yarn cli-h
# webpack-dev-server
yarn dev-h
```

## Model

* www
* app
* h5
* ...

```js
// config/webpack.config.js
// all | www | h5 | ...
const enableModel = 'all'
// Add Model
addModel(model, 'home')
addModel(model, 'www')
addModel(model, 'h5')
```
