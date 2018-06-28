# Bonday website

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

* www(website)
* app(app share)
* h5(activity)

```js
// config/webpack.config.js
const model = {
    // enable model: all | app | h5
    enableModel: 'all'
}
```