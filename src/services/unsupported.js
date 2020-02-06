export function WCSupportClass() {
    function setUnsupportedClass() {
        return document.body.className = 'wc-unsupported'
    }

    const wc = window.WebComponents
    const safariVersions = ['Version/9', 'Version/8', 'Version/7']
    function tryCustomElements() {
        function tryCustomElementsInner() {
            try {
                var t = typeof window.customElements.define
                if (t !== 'function') { setUnsupportedClass() }
            } catch (error) {
                setUnsupportedClass()
            }
        }
        requestAnimationFrame(tryCustomElementsInner)
    }

    function safariReducer(prev, cur) {
        return prev
            ? true
            : navigator.userAgent.indexOf(cur) > -1
    }

    if (navigator.userAgent.indexOf('Safari') > -1 && safariVersions.reduce(safariReducer, false)) {
        setUnsupportedClass()
    }

    if (wc && wc.ready) {
        tryCustomElements()
    } else {
        window.addEventListener('WebComponentsReady', tryCustomElements)
    }
}