import {
    WCConstructor, WCDefine, Pipe, ToBool, IfInvalid, ToString,
    ObserveEvent, IndexOf, IfEmpty, EventName, OnNextFrame, WCwhenPropertyReady, iconInfo, iconCheck,
    iconError, iconWarning, iconClose
} from '../..'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `snack-bar`
const componentRoot = `.${componentName}-container`

const setShown = host => {
    const root = host.elements.root

    if (!root) { return }

    const endEventName = EventName(`transitionend`)
    const dispatch = () => host.dispatchEvent(new CustomEvent(host.shown ? `opened` : `closed`, { detail: host }))

    if (endEventName) {
        root.addEventListener(endEventName, function startEvent() {
            root.removeEventListener(endEventName, startEvent)
            OnNextFrame(dispatch)
        })
    } else {
        OnNextFrame(dispatch)
    }

    root.classList[host.shown ? `add` : `remove`](`shown`)
}

const setAlign = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`align`, host.align)
}

const setType = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`type`, host.type)
}

const setIcon = (host, key) => {
    WCwhenPropertyReady(host, key)
        .then(() => {
            const icon = host.elements[key]

            if (!icon) { return }

            icon[host[key][0] === `<` ? `svg` : `type`] = host[key]
        })
}

const showHideClose = (el, show) => {
    if (!el) { return }
    el.classList[show ? `remove` : `add`](`hide-close-btn`)
}

const properties = {
    shown: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setShown(host))
    },
    align: {
        format: val => Pipe(ToString, IndexOf([`top`, `bottom`, `none`]), IfInvalid(`bottom`))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setAlign(host))
    },
    type: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setType(host))
    },
    infoicon: {
        format: val => Pipe(ToString, IfInvalid(iconInfo), IfEmpty(iconInfo))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `infoicon`))
    },
    successicon: {
        format: val => Pipe(ToString, IfInvalid(iconCheck), IfEmpty(iconCheck))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `successicon`))
    },
    erroricon: {
        format: val => Pipe(ToString, IfInvalid(iconError), IfEmpty(iconError))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `erroricon`))
    },
    warningicon: {
        format: val => Pipe(ToString, IfInvalid(iconWarning), IfEmpty(iconWarning))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `warningicon`))
    },
    hideclose: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => OnNextFrame(() => showHideClose(host.elements.root, !val))
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => OnNextFrame(() => {
            setAlign(host)
            setShown(host)
        })
    },
    button: {
        selector: `.snack-bar-close`,
        onChange: (el, host) => OnNextFrame(() => {
            el.eventListeners = {
                click: ObserveEvent(el, `click`).subscribe(() => host.shown = false)
            }

            showHideClose(host.elements.root, !host.hideclose)
        })
    },
    infoicon: {
        selector: `.infoicon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `infoicon`))
    },
    successicon: {
        selector: `.successicon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `successicon`))
    },
    erroricon: {
        selector: `.erroricon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `erroricon`))
    },
    warningicon: {
        selector: `.warningicon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `warningicon`))
    },
    closeIcon: {
        selector: `.${componentName}-close-icon`,
        onChange: el => el.svg = iconClose
    }
}

export const SnackBar = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements
})

WCDefine(componentName, SnackBar)