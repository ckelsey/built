import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import ComponentClassObject from '../../utils/html/component-class-object'
import SetStyleRules from '../../utils/html/set-style-rules'
import './style.scss'
import '../button-element'
import pipe from '../../utils/pipe'
import ToBool from '../../utils/convert/bool'
import IfInvalid from '../../utils/convert/if_invalid'
import ToString from '../../utils/convert/to_string'
import IndexOf from '../../utils/convert/indexof'
import Get from '../../utils/get'
import Set from '../../utils/set'
import ObserveEvent from '../../utils/observeEvent'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `overlay-message`
const componentRoot = `.${componentName}-container`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setShown = host => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[host.shown ? `add` : `remove`](`shown`)
}

const setColorTheme = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`colortheme`, host.colortheme)
}

const setCloseButton = host => {
    Array.from(host.querySelectorAll(`*`))
        .forEach(el => {
            try { Get(el, `eventSubscriptions.closeOverlay`, () => { })() } catch (error) { }
        })

    Array.from(host.querySelectorAll(host.closeselector))
        .forEach(el => Set(el, `eventSubscriptions.closeOverlay`,
            ObserveEvent(el, `click`).subscribe(() => host.shown = false)
        ))
}

const properties = {
    class: ComponentClassObject,
    shown: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setShown(host)
    },
    colortheme: {
        format: val => pipe(IndexOf([`dark`, `light`, `transparent`]), IfInvalid(`light`))(val).value,
        onChange: (_val, host) => setColorTheme(host)
    },
    closeselector: {
        format: val => pipe(ToString, IfInvalid(`[overlay-message-close]`))(val).value,
        onChange: (_val, host) => setCloseButton(host)
    },
    styles: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => {
            setColorTheme(host)
            setShown(host)
        }
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    }
}

const OverlayMessage = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onConnected(host) {

        host.slotObserver = new MutationObserver(mutationsList => {
            let i = 0

            while (i < mutationsList.length) {
                if (mutationsList[i].type === `childList`) {
                    return setCloseButton(host)
                }

                i = i++
            }
        })

        host.slotObserver.observe(host, { childList: true })
    }
})

Define(componentName, OverlayMessage)

export default OverlayMessage