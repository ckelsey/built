// import { createInput, setInputID, setInputAttribute, setLabel } from './methods-elements'
// import { ValidateHtml } from '../../utils/validate'
// import { setColors, elementSelectors, setOptions } from './elements'
// import { processValue } from './methods-value'
// import { setDroppable } from './methods-events'
// import { setAttribute, wcClass } from '../../utils/html/attr'
// import { replaceElementContents } from '../../utils/html/markup'
// import { findIn } from '../../utils/html/query'



// export default {
//     accentcolor: (_val, host) => setColors(host),

//     accept: (val, host) => setInputAttribute(host, `accept`, val),

//     autocomplete: (val, host) => setInputAttribute(host, `autocomplete`, val),

//     class: (val, host) => wcClass(host.elements.root, val, host.state.class.previous),

//     clearbutton: (val, host) => {
//         setAttribute(host.elements.clearButton, `type`, val)
//         addRemoveContainerClass(!!val, host, `clearbutton`)
//     },

//     count: (val, host) => replaceElementContents(host.elements.count, val),

//     disabled: (val, host) => {
//         setInputAttribute(host, `disabled`, val)
//         addRemoveContainerClass(val, host, `disabled`)
//     },

//     disablefilter: (val, host) => host.type === `rotary` && host.elements.rotary
//         ? host.elements.rotary.disablefilter = val
//         : undefined,

//     droppable: (_val, host) => setDroppable(host),

//     errortext: (val, host) => {
//         replaceElementContents(host.elements.error, ValidateHtml(val, [], [`script`]).sanitized || ``)
//     },

//     focused: (val, host) => addRemoveContainerClass(val, host, `focused`),

//     helptext: (val, host) => {
//         replaceElementContents(host.elements.help, ValidateHtml(val, [], [`script`]).sanitized || ``)
//     },

//     hideonfilter: (val, host) => addRemoveContainerClass(val, host, `hidefilteredout`),

//     icon: (val, host) => {
//         setAttribute(host.elements.icon, `type`, val)
//         addRemoveContainerClass(val, host, `icon`)
//     },

//     iconalign: (val, host) => setAttribute(host.elements.container, `icon-align`, val),

//     inputID: (val, host) => setInputID(host, val),

//     invalid: (val, host) => {
//         setColors(host)
//         setAttribute(host.elements.container, `valid`, val)
//         addRemoveContainerClass(val, host, `invalid`)
//     },

//     label: (val, host) => setLabel(val, host.labelposition, host),

//     labelposition: (val, host) => {
//         setAttribute(host.elements.container, `label-position`, val)
//         setLabel(host.label, val, host)
//     },

//     max: (val, host) => {
//         replaceElementContents(host.elements.max, val || ``)
//         addRemoveContainerClass(val, host, `max`)
//     },

//     maxlength: (val, host) => {
//         replaceElementContents(host.elements.max, val || ``)
//         addRemoveContainerClass(val, host, `maxlength`)
//     },

//     min: (val, host) => addRemoveContainerClass(val, host, `min`),

//     multiple: (val, host) => setInputAttribute(host, `multiple`, val),

//     name: (val, host) => setInputAttribute(host, `name`, val),

//     notempty: (val, host) => addRemoveContainerClass(val, setAttribute(host, `has-value`, `${val}`), `notempty`),

//     options: (val, host) => setOptions(host.elements.input, val),

//     processedErrorText: (val, host) => !!val ? replaceElementContents(host.elements.error, val) : undefined,

//     ready: (val, host) => addRemoveContainerClass(val, host, `ready`),

//     resize: (val, host) => setAttribute(host.elements.container, `resize`, val),

//     required: (val, host) => setInputAttribute(host, `required`, val),

//     showcount: (val, host) => addRemoveContainerClass(val, host, `showcount`),

//     tabindex: (val, host) => setAttribute(host.elements.input, `tabIndex`, val),

//     type: (val, host) => !host.elements.inputContainer
//         ? undefined
//         : host.elements.input = replaceElementContents(
//             findIn(
//                 setAttribute(
//                     host.elements.container,
//                     `input-kind`,
//                     val
//                 ),
//                 elementSelectors.inputContainer
//             ),
//             [createInput(val)]
//         ).contents[0],

//     value: (_val, host) => processValue(host),

//     warningcolor: (_val, host) => setColors(host),
// }