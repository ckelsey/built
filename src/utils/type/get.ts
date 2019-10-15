import dom from './dom'
import date from './date'
import object from './object'
import isPrimitive from './primitives'

export default (thing: any): string => thing === null ? null : isPrimitive(thing) ? typeof thing : dom(thing) ? `dom` : Array.isArray(thing) ? `array` : date(thing) ? `date` : object(thing) ? `object` : typeof thing
