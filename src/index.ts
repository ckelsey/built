import ButtonElement from './components/button-element'
import ContentDrawer from './components/content-drawer'
import ContentTransition from './components/content-transition'
import CookieMessage from './components/cookie-message'
import DropdownSelect from './components/dropdown-select'
import EffectBounceZ from './components/effect-bounce-z'
import EffectFade from './components/effect-fade'
import EffectRipple from './components/effect-ripple'
import EffectScale from './components/effect-scale'
import EffectUnderline from './components/effect-underline'
import GridLayout from './components/grid-layout'
import HorizontalSlider from './components/horizontal-slider'
import IconElement from './components/icon-element'
import ImageLoader from './components/image-loader'
import InputField from './components/input-field'
import OverlayContent from './components/overlay-content'
import DragDropService from './services/dragDrop'
import Request from './services/request'
import Router from './services/router'
import Timer from './services/timer'
import Unsupported from './services/unsupported'
import Uploader from './services/uploader'

import CreateCurve from './utils/curve'
import Get from './utils/get'
import ID from './utils/id'
import Observe from './utils/observe'
import Pipe from './utils/pipe'
import ObserveEvent from './utils/observeEvent'
import ObserveWorker from './utils/observeWorker'
import Set from './utils/set'
import { Constructor, Define } from './utils/webcomponent/constructor'

export const Components = {
    ButtonElement,
    ContentDrawer,
    ContentTransition,
    CookieMessage,
    DropdownSelect,
    EffectBounceZ,
    EffectFade,
    EffectRipple,
    EffectScale,
    EffectUnderline,
    GridLayout,
    HorizontalSlider,
    IconElement,
    ImageLoader,
    InputField,
    OverlayContent
}

export const Services = {
    DragDropService,
    Request,
    Router,
    Timer,
    Unsupported,
    Uploader
}

export const Utils = {
    CreateCurve,
    Get,
    ID,
    Observe,
    ObserveEvent,
    ObserveWorker,
    Pipe,
    Set,
    Convert: {
        array: {

        },
        bool: {

        },
        date: {

        },
        dom: {

        },
        entities: {

        },
        function: {

        },
        if: {

        },
        json: {

        },
        meta: {

        },
        number: {

        },
        object: {

        },
        options: {

        },
        phone: {

        },
        postal: {

        },
        regex: {

        },
        string: {

        },
        tmonad: {

        },
        tap: {

        },
        uri: {

        }
    },
    WebComponent: {
        Constructor,
        Define
    }
}