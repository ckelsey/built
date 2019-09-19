const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`
]
const isPrimitive = (s: any): boolean => primitives.indexOf(typeof s) > -1

import dom from './dom'
import date from './date'
import object from './object'

export default (thing: any): string => thing === null ? null : isPrimitive(thing) ? typeof thing : dom(thing) ? `dom` : Array.isArray(thing) ? `array` : date(thing) ? `date` : object(thing) ? `object` : typeof thing
