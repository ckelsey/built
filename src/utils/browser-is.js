let isChrome = navigator.userAgent.indexOf('Chrome') > -1
const isExplorer = navigator.userAgent.indexOf('MSIE') > -1
const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
let isSafari = navigator.userAgent.indexOf('Safari') > -1
let isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1
if ((isChrome) && (isSafari)) { isSafari = false }
if ((isChrome) && (isOpera)) { isChrome = false }

export const BrowserIs = {
    safari: isSafari,
    chrome: isChrome,
    ie: isExplorer,
    firefox: isFirefox,
    opera: isOpera,
    which: isSafari ? 'safari' : isChrome ? 'chrome' : isExplorer ? 'ie' : isFirefox ? 'firefox' : isOpera ? 'opera' : undefined,
}