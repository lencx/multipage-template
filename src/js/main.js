console.log('common.js')

const axios = require('axios')

axios.get('/api/articles/page?code=apply_article_document&size=20&page=1')
    .then(res => {
        console.log(res.data)
    })