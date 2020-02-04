module.exports = {
    presets: [
        [
            `@babel/preset-env`,
            {
                corejs: 3,
                modules: false,
                useBuiltIns: `usage`,
                targets: {
                    browsers: [`last 2 versions`, `ie >= 11`]
                },
                exclude: [`transform-classes`]
            }
        ]
    ],
    plugins: [
        `@babel/plugin-syntax-dynamic-import`,
        `@babel/plugin-proposal-class-properties`,
        `@babel/plugin-transform-runtime`
    ]
}