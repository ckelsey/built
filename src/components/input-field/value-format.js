import { ToRegex } from '../../utils/to-regex.js'
import { MatchAll } from '../../utils/match-all.js'
import { Mapper } from '../../utils/mapper.js'

export function valueFormat(pattern, value) {
    if (typeof value !== 'string' || !pattern) {
        return {
            valid: true,
            value: value
        }
    }

    if (pattern.indexOf('=>') > -1) {
        return {
            valid: true,
            value: Mapper(
                function (i) {
                    const splits = i.split('=>')
                    splits[0] = ToRegex(splits[0].trim()).value
                    return splits
                },
                pattern.split(',')
            )
                .reduce(
                    function (target, current) {
                        return target.replace(
                            current[0],
                            function (match) {
                                if (typeof match[current[1]] === 'function') { return match[current[1]]() }
                                return current[1]
                            })
                    },
                    value
                )
        }
    }

    const regex = ToRegex(pattern)
    const regexp = regex.value

    if (!regex.valid) {
        return {
            valid: true,
            value: value
        }
    }

    const result = MatchAll(regexp, value).map(function (v) { return v[0] }).join('')

    return {
        valid: result === value,
        value: result
    }
}