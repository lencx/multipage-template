# Multipage Template

```bash
[project]
   |- [.bin]
   |- [config]
   |     |- userInfo.json
   |     |- webpack.config.js
   |     `- ...
   |- [src]
   |   |- [models]
   |   |     |- [mode_name] # www | home | app | ...
   |   |     `- ...
   |   `- [public]
   |         |- [api]
   |         |    |- dev.api.js
   |         |    |- prod.api.js
   |         |    `- index.js
   |         |- [components]
   |         |- [js]
   |         |- [scss]
   |         |- [templates]
   |         |      |- [layout]
   |         |      |- [widget]
   |         |      `- ...
   |         |- [utils]
   |         `- ...
   |- [static]
   |   |- [plugin]
   |   |- [lib]
   |   |     |- vue@2.5.17.min.js
   |   |     |- jquery@3.3.1.min.js
   |   |     `- ...
   |   |- [img]
   |   |- [media]
   |   `- ...
   |- [webpack]
   |- package.json
   `- ...
```

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

# default: timestamp
yarn zip <dist_pack_version>
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

## Vue use

### Component

* Global Registration

> path: `/src/public/components`\
> [alias: `@pubcp`](/config/webpack.config.js)

```js
// src/public/js/common.js
Vue.component('my-component-name', {
  // ... options ...
})

// or
import testBtn from '@pubcp/testBtn.vue'
Vue.component('test-btn', testBtn)
```

* Local Registration

> path: `/src/models/mode_name/components`\
> alias: ...

```js
// src/models/mode_name/js/page_name.js
import localBtn from './your_components_path/localBtn.vue'
new Vue({
    el: '#app',
    components: {
        localBtn
    }
})
```