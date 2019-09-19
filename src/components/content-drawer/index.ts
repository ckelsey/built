import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { observedAttributes, properties, hasScaler, hasUnderline, hasRipple, hasHeaderIcon, hasFader, canUnderline, canScale, canRipple, canFade } from './properties'
import elements, { setScaler, setFader, setUnderline, setRipple, setHeaderIcon } from './elements'

import '../effect-scale'
import '../effect-underline'
import '../effect-fade'
import '../effect-ripple'
import '../effect-bounce-z'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `content-drawer`
const componentRoot = `.content-drawer-container`
const ContentDrawer = Constructor({
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
        host.elements.root.classList[!!host.open ? `add` : `remove`](`open`)
        setScaler(host)
        setFader(host)
        setUnderline(host)
        setRipple(host)
        setHeaderIcon(host)
    }
})

Define(componentName, ContentDrawer)

export default ContentDrawer
