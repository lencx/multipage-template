import '@www/scss/index.scss'
console.log('www: index')

window.addEventListener('load', () => {
new Vue({
    el: '#app',
    data: {
        opts: ['A', 'B', 'C']
    },
    methods: {
        showAdvice: function (advice) {
            alert(advice)
        }
    },
})
})
