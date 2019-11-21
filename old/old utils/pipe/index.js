export function Pipe(...functions) {
    return function PipeInnerFunction(value) {
        functions.reduce(
            function PipeInnerFunctionReducer(result, currentFunction) {
                return typeof currentFunction !== `function` ?
                    result :
                    currentFunction(result)
            },
            value
        )
    }
}
