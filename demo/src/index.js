import 'builtjs'
import '../index.html'

import { Benches, ID, Transduce } from 'builtjs'
window.IDs = ID
window.Benches = Benches
window.Transduce = Transduce

// import './components/test-element/index.js'

// import { Router, CreateElement } from 'builtjs'

// const Routes = {
//     home: {
//         pathname: '/',
//         content: 'test-element',
//         title: 'Paramount Pictures Support'
//     }
// }

// export const router = Router(Routes)

// router.route$.subscribe(route => {

//     document.body.setAttribute('page', route.content)
//     document.title = route.title

//     const content = document.getElementById('app')
//     content.innerHTML = ''
//     content.appendChild(CreateElement({ tagName: route.content }))
// })
