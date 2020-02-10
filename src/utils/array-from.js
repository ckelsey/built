import { Mapper } from './mapper.js'

export function ArrayFrom(collection) {
    if (!collection || !collection.length) {
        return []
    }

    return Mapper(function (element) { return element }, collection)
}