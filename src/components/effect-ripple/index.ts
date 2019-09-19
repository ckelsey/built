import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import {
    observedAttributes,
    properties,
    hasTargets,
    hasTargets$,
    hasStart,
    canLoadTargets,
    canStart,
    nonAutoOrigin
} from './properties'
import { trigger, unloadTargets } from './methods'
import elements from './elements'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `effect-ripple`
const componentRoot = `.effect-ripple-container`
const EffectRipple = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { trigger },
    computed: {
        hasTargets,
        hasTargets$,
        hasStart,
        canLoadTargets,
        canStart,
        nonAutoOrigin,
    },
    onDisconnected: host => unloadTargets(host)
})

Define(componentName, EffectRipple)

export default EffectRipple