const nativeSupport = 'content' in document.createElement('template') && // templates
    !!window.customElements && // custom elements
    'attachShadow' in Element.prototype && // shadow
    'getRootNode' in Element.prototype; // shadow

(function () {
    const initialStyles = ''.concat(
        'ajax-form,',
        'button-element,',
        'collapse-menu,',
        'content-collapse,',
        'content-transition,',
        'cookie-message,',
        'drop-down,',
        'grid-layout,',
        'horizontal-slider,',
        'icon-element,',
        'image-loader,',
        'input-bool,',
        'input-field,',
        'input-select,',
        'overlay-content,',
        'overlay-message,',
        'progress-bar,',
        'snack-bar,',
        'spinner-element',
        '{ opacity: 0; }'
    )

    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')

    if (style.styleSheet) {   // IE
        style.styleSheet.cssText = ''.concat(style.styleSheet.cssText ? style.styleSheet.cssText : '', initialStyles)
    } else {                // the world
        style.innerHTML = ''
        const tt1 = document.createTextNode(initialStyles)
        style.appendChild(tt1)
    }

    document.head.appendChild(style)
})()

window.ComponentsLoader = function ComponentsLoader(base) {
    const filename = 'built-' + (nativeSupport ? 'native' : 'object') + '.js'
    const script = document.createElement('script')
    base = base ? base : '/'
    script.src = base[base.length - 1] === '/' ? base + filename : base + '/' + filename
    script.type = 'text/javascript'
    document.head.appendChild(script)
}