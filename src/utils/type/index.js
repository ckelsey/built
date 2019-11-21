import { IsObject, IsDom, IsDate, IsNonCollection } from '../../index'

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