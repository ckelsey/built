import { WCConstructor } from '../../utils/wc-constructor.js'
import { ID } from '../../services/id.js'
import { WCDefine } from '../../utils/wc-define.js'
import { properties as Properties } from '../input-shared/properties.js'
import { processedValue } from '../input-shared/processed-value.js'
import { processValue } from '../input-shared/process-value.js'
import { setCustomValidity } from '../input-shared/set-custom-validity.js'
import { validationMessage } from '../input-shared/validation-message.js'
import { validity } from '../input-shared/validity.js'
import { checkValidity } from '../input-shared/check-validity.js'
import { Pipe } from '../../utils/pipe.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { ToFilter } from '../../utils/to-filter.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { setInput } from '../input-shared/set-input.js'
import { Get } from '../../utils/get.js'
import { iconTriangle } from '../../services/icons.js'

const outerStyle = require(`../input-shared/outer.scss`).toString()
const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `input-select`
const componentRoot = `.${componentName}-container`
const postProcessValue = () => results => results.input.value = results.sanitized

const properties = Object.assign({}, Properties, {
    options: {
        format: val => Pipe(
            CommasToArray,
            IfInvalid([]),
            ToMap(option => {
                if (typeof option !== `object`) {
                    option = { value: option, label: option }
                }

                if (!Object.prototype.hasOwnProperty.call(option, `value`)) { return }

                return option
            }),
            ToFilter(o => !!o)
        )(val).value,

        onChange(_val, host) { setInput(host) }
    },

    emptyoption: {
        format: val => val,
        onChange(_val, host) { setInput(host) }
    }
})

const observedAttributes = Object.keys(properties)

const elements = {
    arrow: {
        selector: `.input-field-arrow`,
        onChange: el => el.svg = iconTriangle
    },
    container: { selector: `.input-field-container-inner` },
    error: { selector: `.input-field-message-error` },
    help: { selector: `.input-field-message-help` },
    inputContainer: { selector: `.input-field-input-container-inner` },
    root: { selector: `.input-field-container` },
}

export const InputSelect = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes,
    properties,
    elements,
    methods: {
        processValue,
        setCustomValidity,
        postProcessValue,
        checkValidity
    },
    computed: {
        processedValue,
        validationMessage,
        validity,
        selectedIndex: host => ({
            get() {
                return Get(host, `input.selectedIndex`, 0)
            }
        }),
        selectedOptions: host => ({
            get() {
                return Array.from(Get(host, `input.selectedOptions`, []))
            }
        }),
        optionElements: host => ({
            get() {
                return Array.from(Get(host, `input.options`, []))
            }
        })
    },
    getters: { value: host => Get(host, `state.value.value`, ``) },
    onConnected: host => {
        host.inputID = ID()
        host.processValue()
    },
    formElement: true
})

WCDefine(componentName, InputSelect)