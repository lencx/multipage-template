/**
 * Detect browser language
 */
const detectLang = () => {
    let _lang = (navigator.language || navigator.userLanguage).split('-')[0]
    return _lang === 'zh' ? 'cn' : _lang
}

const getLang = () => localStorage.getItem('language_env')

const setLang = lang => localStorage.setItem('language_env', lang || detectLang())

export {
    detectLang,
    getLang,
    setLang,
}