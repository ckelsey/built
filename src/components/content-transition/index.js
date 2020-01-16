import { WCConstructor, WCDefine, Pipe, ToBool, IfInvalid, ToNumber } from '../..'
import { transition, getComponentStyles, getIndex, start$, end$, getCurrent, getChildren, setCurrent } from './methods'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-transition`
const componentRoot = `.content-transition-container`

const elements = {
    root: {
        selector: `.content-transition-container`,
        onChange: (el, host) => {
            el.setAttribute(`type`, host.type)
        }
    },
    current: { selector: `slot[name="current"]`, },
    next: { selector: `slot[name="next"]`, },
    nextContainer: { selector: `.next-slot` },
    hidden: { selector: `slot[name="hidden"]`, },
    hiddentContainer: { selector: `.hidden-slot` },
    currentContainer: { selector: `.current-slot` }
}

const properties = {
    speed: { format: val => Pipe(ToNumber, IfInvalid(300))(val).value },

    type: {
        format: val => [`fade`, `slide`, `height`].indexOf(val) > -1 ? val : `fade`,
        onChange: (val, host) => {
            const root = host.elements.root
            if (!root) { return }
            root.setAttribute(`type`, val)
        }
    },

    keepchildren: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => {
            const root = host.elements.root
            if (!root) { return }
            root.classList[host.keepchildren ? `add` : `remove`](`keepchildren`)
        }
    },

    current: { format: val => val },
    start: { format: val => val },
    end: { format: val => val }
}

export const ContentTransition = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    methods: {
        transition,
        getComponentStyles,
        getIndex,
        getCurrent,
        getChildren,
        start$,
        end$,
        setCurrent
    }
})

WCDefine(componentName, ContentTransition)
