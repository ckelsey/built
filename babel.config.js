/* eslint-disable */

module.exports = {
    "presets": [
        [
            '@babel/preset-env',
            {
                "modules": false,
                "useBuiltIns": 'usage',
                "corejs": 3,
                "targets": {
                    browsers: ['last 3 versions'],
                    "edge": '17',
                    "firefox": '60',
                    "chrome": '67',
                    "safari": '11.1',
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
    ],
    env: {
        test: {
            plugins: [
                'babel-plugin-dynamic-import-node',
                '@babel/plugin-transform-runtime',
                'istanbul'
            ],
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
            ],
        }
    }
}