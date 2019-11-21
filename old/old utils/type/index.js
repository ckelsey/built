import { IsObject } from '../is-object'
import { IsDom } from '../is-dom'
import { IsDate } from '../is-date'
import { IsPrimitive } from '../is-primitive'

export function Type(value) {
    return value === null ?
        `null` :
        IsPrimitive(value) ?
            typeof value :
            IsDom(value) ?
                `dom` :
                Array.isArray(value) ?
                    `array` :
                    IsDate(value) ?
                        `date` :
                        IsObject(value) ?
                            `object` :
                            typeof thing

}