import { IsObject } from './is-object.js'
import { IsNonCollection } from './is-non-collection.js'
import { IsDom } from './is-dom.js'
import { IsDate } from './is-date.js'

export function Type(value) {
    return value === null ?
        `null` :
        IsNonCollection(value) ?
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