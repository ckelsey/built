// import Convert from '../../utils/convert'

// // import template from './index.html'
// // import style from './style.html'
// // import CustomElement from '../custom-element'

// // const Timers = window.IntegralUtils.Timers
// // const Type = window.IntegralUtils.Type
// // const HTML = window.IntegralUtils.HTML
// // const Queue = window.IntegralUtils.Queue
// // const Convert = window.IntegralUtils.Convert
// // const Events = HTML().events
// // const isValidEvent = (val: any) => typeof val === `string` && Events.indexOf(val) === -1

// // const $template = document.createElement('template')
// // $template.innerHTML = `${style}${template}`


// // @CustomElement({
// //     selector: `modal-content`,
// //     template,
// //     style,
// //     useShadow: true,
// //     properties: {
// //         end: (val) => isValidEvent(val) ? val : undefined,
// //         start: (val) => isValidEvent(val) ? val : `interaction`,
// //         speed: (val) => Convert(val).number().ifInvalid(400).value
// //     },
// //     extends: HTMLElement
// // })

// const observedAttributes = [
//     `speed`
// ]

// class ModalContent extends HTMLElement {
//     public end
//     public start
//     public speed

//     static get observedAttributes(): string[] {
//         return observedAttributes
//     }

//     constructor() {
//         super()
//     }
// }

// const speed = Symbol(`speed`)
// const speedValidation = (val?) => Convert(val).number().ifInvalid(200).value
// Object.defineProperties(ModalContent, {
//     [speed]: {
//         writable: true,
//         value: speedValidation()
//     },
//     speed: {
//         get() { return this[speed] },
//         set(value) {
//             this[speed] = speedValidation(value)
//         }
//     }
// })

// window.customElements.define(`modal-content`, ModalContent)

// export default ModalContent
