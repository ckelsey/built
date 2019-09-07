import { Constructor, Define } from '../../utils/webcomponent/constructor'
import {
    observedAttributes,
    properties,
    hasTargets,
    hasTargets$,
    hasStart,
    canLoadTargets,
    canStart,
    canEnd,
    canRunStart,
    canRunEnd,
    nonAutoOrigin
} from './properties'
import { toggle, unloadTargets, open, close } from './methods'
import elements from './elements'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `effect-underline`
const componentRoot = `.effect-underline-container`
const EffectUnderline = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { toggle, open, close },
    computed: {
        hasTargets,
        hasTargets$,
        hasStart,
        canLoadTargets,
        canStart,
        canEnd,
        canRunStart,
        canRunEnd,
        nonAutoOrigin,
    },
    onDisconnected: host => unloadTargets(host)
})

Define(componentName, EffectUnderline)

export default EffectUnderline