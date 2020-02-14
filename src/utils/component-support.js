export function ComponentSupport() {
    return 'content' in document.createElement('template') && // templates
        !!window.customElements && // custom elements
        'attachShadow' in Element.prototype && // shadow
        'getRootNode' in Element.prototype // shadow
}