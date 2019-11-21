import 'babel-polyfill'
import ButtonElement from './components/button-element.test'

// button-element
// content-transition
// drop-down
// grid-layout
// snack-bar

// U: webComponent stuff
// S: router
// S: componentStore
// U: Get
// U: Conversions
// U: ObserveEvent

// input-field
// overlay-message
// spinner-element

// icon-element
// effect-bounce-z
// effect-fade
// effect-ripple
// effect-scale
// effect-underline
// overlay-content

// horizontal-slider

// image-loader? think needs fixin
// content-drawer?
// cookie-message?
// dropdown-select? needs to be fixed

async function App(w) {
    const results = [
        await ButtonElement(w)
    ]

    console.log(results)
}

App(window)