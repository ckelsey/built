/* eslint-disable */

module.exports = {
    "presets": [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                "targets": {
                    browsers: ['last 3 versions'],
                    "ie": '11',
                    "node": true
                }
            }
        ]
    ],
    "plugins": [
        [
            '@babel/plugin-transform-runtime',
            {
                "regenerator": true
            }
        ]
    ]
}