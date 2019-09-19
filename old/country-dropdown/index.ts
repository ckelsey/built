import { Constructor, Define } from '../../utils/webcomponent/constructor'
import { observedAttributes, properties, selected, selectedIndex, language, options } from './properties'
import elements from './elements'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `country-dropdown`
const componentRoot = `.${componentName}-container`
const CountryDropdown = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    computed: {
        selectedIndex,
        selected,
        language,
        options
    },
    onReady: host => {
        if (!host.value || host.value.default) {
            const lang = host.language
            host.value = lang ? lang.value : host.options[0].value
        }
    }
})

Define(componentName, CountryDropdown)

export default CountryDropdown