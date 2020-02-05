import 'builtjs'
import '../index.html'
import './components/test-element/index.js'

import { Router, CreateElement } from 'builtjs'

const Routes = {
    home: {
        pathname: `/`,
        content: `test-element`,
        title: `Paramount Pictures Support`
    }
}

export const router = Router(Routes)

router.route$.subscribe(route => {
    console.log(route)


    document.body.setAttribute(`page`, route.content)
    document.title = route.title

    const content = document.getElementById(`app`)
    content.innerHTML = ``
    content.appendChild(CreateElement({ tagName: route.content }))
})
