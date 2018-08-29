import API from './../api'
window.API = API

import '@pubcp/ball'
import testBtn from '@pubcp/testBtn.vue'
console.log('common-js:', API)

Vue.component('test-btn', testBtn)