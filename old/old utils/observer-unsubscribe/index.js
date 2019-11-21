import { Pipe } from '../pipe'

export function ObserverUnsubscribe(subscription, property = ``, key = ``) {
    return Pipe(ToFunction, IfInvalid(() => { }))(Get(el, `${elementProperty}.${eventKey}`)).value()
}