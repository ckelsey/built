/*
TODO - def has room for improvement. takes a little over 2.5x as long to run
*/

function PipeInnerFunctionReducer(result, currentFunction) {
    return typeof currentFunction !== `function` ?
        result :
        currentFunction(result)
}

export function Pipe(...functions) {
    return function PipeInnerFunction(value) {
        return functions.reduce(PipeInnerFunctionReducer, value)
    }
}