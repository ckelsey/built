const pipe = (...functions) =>
    (data: any) =>
        functions
            .reduce(
                (value, func) =>
                    typeof func !== `function`
                        ? value
                        : func(value)
                , data
            )

export default pipe
