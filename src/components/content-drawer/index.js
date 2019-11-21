import { WCConstructor, WCDefine } from '../..'
import {
    observedAttributes, properties, hasScaler, hasUnderline, hasRipple,
    hasHeaderIcon, hasFader, canUnderline, canScale, canRipple, canFade
} from './properties'
import elements, { setScaler, setFader, setUnderline, setRipple, setHeaderIcon } from './elements'
import './style.scss'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `content-drawer`
const componentRoot = `.content-drawer-container`
export const ContentDrawer = /*#__PURE__*/ WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    computed: {
        hasScaler,
        hasUnderline,
        hasRipple,
        hasHeaderIcon,
        hasFader,
        canUnderline,
        canScale,
        canRipple,
        canFade
    },
    onReady: host => {
        host.elements.root.classList[host.open ? `add` : `remove`](`open`)
        setScaler(host)
        setFader(host)
        setUnderline(host)
        setRipple(host)
        setHeaderIcon(host)
    }
})

WCDefine(componentName, ContentDrawer)
