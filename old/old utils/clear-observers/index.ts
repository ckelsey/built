import Type from '../type/get'
import Get from '../get'

const ClearObservers = obj => {
    let subs = Get(
        obj,
        `eventSubscriptions`,
        Get(
            obj,
            `subscriptions`,
            typeof obj === `function` ?
                { obj } :
                Type(obj) === `object` ?
                    obj :
                    Array.isArray(obj) ?
                        Object.assign({}, obj) :
                        undefined
        )
    )

    if (!subs || Type(subs) !== `object`) { return }

    Object.keys(subs).forEach(key => typeof subs[key] === `function` ? subs[key]() : undefined)
}

export default ClearObservers