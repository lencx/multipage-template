console.log('common.js')

import axios from 'axios'

axios.get('/api/articles/page?code=apply_article_document&size=20&page=1')
    .then(res => {
        console.log(res.data)
    })


import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver, h1 } from '@cycle/dom'