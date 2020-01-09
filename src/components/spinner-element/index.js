import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { ToBool } from '../../utils/to-bool.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToNumber } from '../../utils/to-number.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `spinner-element`
const componentRoot = `.${componentName}-container`

const setStyles = (el, styles) => {
    OnNextFrame(() => {
        if (!el) { return }
        SetStyleRules(el, styles)
    })
}

const setTheme = (value, host) => {
    OnNextFrame(() => {
        const themeElement = host.elements.theme
        if (!themeElement || value === undefined) { return }
        SetStyleRules(themeElement, value)
    })
}

const doAllTheThings = host => {
    const root = host.elements.root
    if (!root) { return }

    root.setAttribute(`type`, host.type)
    setRootClass(host, host.page, `fullpage`)
    setRootClass(host, host.scrim, `showscrim`)
    setType(host)
    setScrimColor(host)
    setScrimOpacity(host)
    setBlur(host)
}

const setRootClass = (host, condition, clss) => {
    OnNextFrame(() => {
        const root = host.elements.root

        if (!root) { return }

        root.classList[condition ? `add` : `remove`](clss)
    })
}

const setType = host => {
    OnNextFrame(() => {
        const root = host.elements.root
        if (!root) { return }
        root.setAttribute(`type`, host.type)
    })
}

const setBlur = host => {
    OnNextFrame(() => {
        const scrim = host.elements.scrim
        if (!scrim) { return }
        scrim.style.backdropFilter = `blur(${host.blur}px)`
    })
}

const setScrimColor = host => {
    OnNextFrame(() => {
        const scrim = host.elements.scrim
        if (!scrim) { return }
        scrim.style.background = host.scrimcolor
    })
}

const setScrimOpacity = host => {
    OnNextFrame(() => {
        const scrim = host.elements.scrim

        if (!scrim) { return }

        if (host.scrim) {
            return scrim.style.opacity = host.scrimopacity
        }

        scrim.style.opacity = 0
    })
}

const toggleVisibility = host => OnNextFrame(() => host.elements.root.classList[host.visible ? `add` : `remove`](`shown`))

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => doAllTheThings(host)
    },
    scrim: {
        selector: `.spinner-element-scrim`,
        onChange: (_el, host) => doAllTheThings(host)
    },
    inner: { selector: `.spinner-element-inner` },
    slot: { selector: `slot` },
    injectedStyles: { selector: `style.injectedStyles`, onChange: (el, host) => setStyles(el, host.styles) },
    theme: {
        selector: `style.themeStyles`,
        onChange: (_el, host) => setTheme(host.theme, host)
    }
}

const properties = {
    class: ComponentClassObject,
    visible: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => toggleVisibility(host)
    },
    page: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    scrim: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    blur: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    scrimopacity: {
        format: val => Pipe(ToNumber, IfInvalid(1))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    type: {
        format: val => typeof val === `string` ? val : `column`,
        onChange: (_val, host) => doAllTheThings(host)
    },
    theme: {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: setTheme
    }
}

export const SpinnerElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
})

WCDefine(componentName, SpinnerElement)