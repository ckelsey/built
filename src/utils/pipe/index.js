export function Pipe(...functions) {
    return function PipeInnerFunction(value) {
        return functions.reduce(
            function PipeInnerFunctionReducer(result, currentFunction) {
                return typeof currentFunction !== `function` ?
                    result :
                    currentFunction(result)
            },
            value
        )
    }
}