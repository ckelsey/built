// import '@webcomponents/webcomponentsjs/webcomponents-bundle'
import '../index.html'
import 'builtjs'
import './components/test-element/index.js'
// import 'core-js/features/url'
// import 'core-js/features/url-search-params'
// import '../../dist/built'
// import { Router, CreateElement } from 'builtjs'

const { Router, CreateElement } = window.builtjs

console.log(`Router`, Router, CreateElement)

const Routes = {
    home: {
        pathname: `/`,
        content: `test-element`,
        title: `Paramount Pictures Support`
    }
}

export const router = Router(Routes)
console.log(router)

router.route$.subscribe(route => {
    console.log(route)


    document.body.setAttribute(`page`, route.content)
    document.title = route.title

    const content = document.getElementById(`app`)
    content.innerHTML = ``
    content.appendChild(CreateElement({ tagName: route.content }))
})
