export function WCSupportClass() {
    const setUnsupportedClass = () => document.body.className = `wc-unsupported`
    const wc = window.WebComponents
    const safariVersions = [`Version/9`, `Version/8`, `Version/7`]
    const tryCustomElements = () => {
        requestAnimationFrame(() => {
            try {
                var t = typeof window.customElements.define
                if (t !== `function`) { setUnsupportedClass() }
            } catch (error) {
                setUnsupportedClass()
            }
        })
    }

    if (navigator.userAgent.indexOf(`Safari`) > -1
        && safariVersions.reduce(
            (prev, cur) => prev
                ? true
                : navigator.userAgent.indexOf(cur) > -1
            , false)
    ) {
        setUnsupportedClass()
    }

    if (wc && wc.ready) {
        tryCustomElements()
    } else {
        window.addEventListener(`WebComponentsReady`, tryCustomElements)
    }
}