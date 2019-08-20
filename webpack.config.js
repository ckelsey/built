'use strict'
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const env = process.env.NODE_ENV || `production`

console.log(`ENV::`, env, env === `production`)

let entries = {
    'built': path.join(__dirname, 'src')
}

if (env === `production`) {
    entries = Object.assign(entries, {
        'button-element': path.join(__dirname, 'src/components/button-element'),
        'calendar-controls': path.join(__dirname, 'src/components/calendar-controls'),
        'calendar-grid': path.join(__dirname, 'src/components/calendar-grid'),
        'date-time': path.join(__dirname, 'src/components/date-time'),
        'effect-bounce-z': path.join(__dirname, 'src/components/effect-bounce-z'),
        'effect-ripple': path.join(__dirname, 'src/components/effect-ripple'),
        'effect-underline': path.join(__dirname, 'src/components/effect-underline'),
        'icon-element': path.join(__dirname, 'src/components/icon-element'),
        'input-field': path.join(__dirname, 'src/components/input-field'),
        'overlay-content': path.join(__dirname, 'src/components/overlay-content'),
        'rotary-list': path.join(__dirname, 'src/components/rotary-list'),
        'time-display': path.join(__dirname, 'src/components/time-display'),
        'router': path.join(__dirname, 'src/services/router'),
        'unsupported': path.join(__dirname, 'src/services/unsupported'),
        'request': path.join(__dirname, 'src/services/request'),
        'curve': path.join(__dirname, 'src/utils/curve'),
        'get': path.join(__dirname, 'src/utils/get'),
        'id': path.join(__dirname, 'src/utils/id'),
        'observe': path.join(__dirname, 'src/utils/observe'),
        'pipe': path.join(__dirname, 'src/utils/pipe'),
        'observeEvent': path.join(__dirname, 'src/utils/observeEvent'),
        'set': path.join(__dirname, 'src/utils/set'),
    })
}

let optimization = {
    minimize: false
}

if (env === `production`) {
    optimization = {
        minimizer: [new TerserPlugin({ terserOptions: { mangle: true } }),],
        minimize: true
    }
}

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: entries,
    resolve: { extensions: ['*', '.ts', '.html'] },
    optimization,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // plugins: [new CompressionPlugin()], // disabled for now though compresses super tiny
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'babel-loader', 'ts-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'babel-loader']
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // }
            // {
            //     test: /\.svg$/,
            //     use: ['cache-loader', 'file-loader']
            // }
        ]
    }
}