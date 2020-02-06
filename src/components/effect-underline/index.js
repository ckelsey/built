import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
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
} from './properties.js'
import { toggle, unloadTargets, open, close } from './methods.js'


const outerStyle = require('./outer.scss').toString()
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'effect-underline'
const componentRoot = ''.concat('.', componentName, '-container')
const elements = {
    root: { selector: componentRoot },
    underline: { selector: '.underline' }
}
export const EffectUnderline = /*#__PURE__*/ WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements,
    methods: { toggle: toggle, open: open, close: close },
    computed: {
        hasTargets: hasTargets,
        hasTargets$: hasTargets$,
        hasStart: hasStart,
        canLoadTargets: canLoadTargets,
        canStart: canStart,
        canEnd: canEnd,
        canRunStart: canRunStart,
        canRunEnd: canRunEnd,
        nonAutoOrigin: nonAutoOrigin,
    },
    onDisconnected: function (host) { unloadTargets(host) }
})

WCDefine(componentName, EffectUnderline)