// pug(HRM)
if(process.env.NODE_ENV === 'development') require('./../view/index.pug')

import '../scss/main.scss'

window.addEventListener('load', () => {
new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        list: [
            {title: 'asda', desc: '0384038cas'},
            {title: 'asdasd', desc: '-1203-5v'},
            {title: 'gfhfdsd', desc: '09-diasd'},
            {title: 'lklaskd', desc: '2342345'},
            {title: 'klkelsdf', desc: 'i2934324'},
        ],
        opts: ['Yes', 'No', 'Maybe']
    },
    methods: {
        showAdvice: function (advice) {
            alert(advice)
        }
    },
})
})

// $(function() {
//     console.log(2)
//     const $scEl = {
//         prev: $('#slider-cards .prev'),
//         curr: $('#slider-cards .curr'),
//         next: $('#slider-cards .next'),
//         prevBtn: $('#slider-cards .prevbtn'),
//         nextBtn: $('#slider-cards .nextbtn'),
//         aniStyle: {width: 500, height: 300, top: 0, left: 20},
//         defStyle: 'z-index: 1; left: unset;',
//     }

//     const data = [
//         {title: 1111, bg: '#fff'},
//         {title: 2222, bg: '#fff'},
//         {title: 3333, bg: '#fff'},
//     ]
//     let scIndex = 0
//     let scLastIndex = data.length - 1

//     const prevNextItem = index => {
//         let _prev = index - 1
//         _prev = _prev === -1 ? scLastIndex : _prev
//         let _next = index + 1
//         _next = _next === scLastIndex + 1 ? 0 : _next
//         $scEl.prev.css('background', data[_prev].bg)
//         $scEl.next.css('background', data[_next].bg)
//     }
//     const currCard = i => {
//         $scEl.curr.css('background', data[i].bg).html(data[i].title)
//         prevNextItem(i)
//     }
//     currCard(scIndex)
//     $scEl.prevBtn.on('click', () => {
//         scIndex--
//         if(scIndex < 0) scIndex = scLastIndex

//         $scEl.prev.css({'z-index': 2}).animate($scEl.aniStyle, 500, () => {
//             $scEl.prev.attr('style', $scEl.defStyle)
//         })
//         let _style = `background: ${data[scIndex].bg}`
//         $scEl.curr.animate({opacity: 0, right: 0}, 500, () => {
//             $scEl.curr.attr('style', 'opacity: 1; left: 20px; right: unset;' + _style)
//         })
//         $scEl.next.animate({right: 20}, 500, () => {
//             $scEl.next.attr('style', 'right: 0;')
//             prevNextItem(scIndex)
//         })
//         currCard(scIndex)
//     })
//     $scEl.nextBtn.on('click', () => {
//         scIndex++
//         if(scIndex > scLastIndex) scIndex = 0

//         $scEl.next.css('z-index', 2).animate($scEl.aniStyle, 500, () => {
//             $scEl.next.attr('style', $scEl.defStyle)
//         })
//         let _style = `background: ${data[scIndex].bg}`
//         $scEl.curr.animate({opacity: 0, left: 0}, 500, () => {
//             $scEl.curr.attr('style', 'opacity: 1; right: 20px; left: unset;' + _style)
//         })
//         $scEl.prev.animate({left: 20}, 500, () => {
//             $scEl.prev.attr('style', 'left: 0;')
//             prevNextItem(scIndex)
//         })
//         currCard(scIndex)
//     })
// })