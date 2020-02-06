import { ArrayFrom } from './array-from.js'

function PipeInnerFunctionReducer(result, currentFunction) {
    return typeof currentFunction !== 'function' ?
        result :
        currentFunction(result)
}

export function Pipe() {
    const functions = ArrayFrom(arguments)

    return function PipeInnerFunction(value) {
        return functions.reduce(PipeInnerFunctionReducer, value)
    }
}