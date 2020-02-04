module.exports = {
    presets: [
        [
            `@babel/preset-env`,
            {
                corejs: 3,
                modules: false,
                useBuiltIns: `usage`,
                targets: {
                    ie: 11,
                    browsers: `last 2 versions`
                },
                exclude: [`transform-classes`]
            }
        ]
    ],
    plugins: [
        `@babel/plugin-syntax-dynamic-import`,
        `@babel/plugin-proposal-class-properties`,
        `@babel/plugin-transform-runtime`
    ],
    exclude: [`transform-classes`]
}