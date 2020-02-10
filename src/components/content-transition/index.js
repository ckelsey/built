import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ToNumber } from '../../utils/to-number.js'
import { transition, getIndex, start$, end$, getCurrent, getChildren, setCurrent } from './methods.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()
const template = require('./index.html')
const componentName = 'content-transition'
const componentRoot = ''.concat('.', componentName, '-container')

const elements = {
    root: {
        selector: '.content-transition-container',
        onChange: function (el, host) {
            el.setAttribute('type', host.type)
        }
    },
    current: { selector: '[slotname="current"]', },
    next: { selector: '[slotname="next"]', },
    nextContainer: { selector: '.next-slot' },
    hidden: { selector: '[slotname="hidden"]', },
    hiddentContainer: { selector: '.hidden-slot' },
    currentContainer: { selector: '.current-slot' }
}

const properties = {
    speed: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(300))(val).value
        }
    },

    type: {
        format: function (val) {
            return ['fade', 'slide', 'height'].indexOf(val) > -1 ? val : 'fade'
        },
        onChange: function (val, host) {
            const root = host.elements.root
            if (!root) { return }
            root.setAttribute('type', val)
        }
    },

    keepchildren: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (_val, host) {
            const root = host.elements.root
            if (!root) { return }
            root.classList[host.keepchildren ? 'add' : 'remove']('keepchildren')
        }
    },

    current: { format: function (val) { return val } },
    start: { format: function (val) { return val } },
    end: { format: function (val) { return val } },
}

const ContentTransition = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    methods: {
        transition: transition,
        getIndex: getIndex,
        getCurrent: getCurrent,
        getChildren: getChildren,
        start$: start$,
        end$: end$,
        setCurrent: setCurrent
    }
})

Components.addComponent(componentName, ContentTransition)

export { ContentTransition }
