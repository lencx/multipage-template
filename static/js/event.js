try {
;$(function($) {
    // title
    let pageTitle = {
        '/': 'Home',
        '/about.html': 'About'
    }
    Object.keys(pageTitle).forEach((t) => {
        window.location.pathname === t
            ?  document.title = pageTitle[t] : void 0
    })

    // nav
    let $nav = {
        btn: $('nav .navbar-toggle'),
        menu: $('nav .menu')
    }
    function navAni() {
        $('.navbar').width() < 767
            ? $nav.menu.find('li').addClass('animated fadeInDown')
            : $nav.menu.find('li').removeClass('animated fadeInDown')
    }
    navAni()
    $nav.btn.on('click', () => {
        let menuArr = $nav.menu.find('li')
        for(let i=0, len=menuArr.length; i<len; i++) {
            $(menuArr[i]).css('animation-delay', i/5+'s')
        }
        $nav.menu.slideToggle(800)
    })
    $(window).on('resize', () => {
        $('.navbar').width() > 767
            ? $nav.menu.removeAttr('style')
            : void 0
        navAni()
    })
})(Zepto)
} catch (e) {}