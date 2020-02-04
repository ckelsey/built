module.exports = {
    presets: [
        [
            `@babel/preset-env`,
            {
                modules: false,
                corejs: 3,
                useBuiltIns: `usage`,
                targets: [`last 2 versions`, `ie >= 11`],
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