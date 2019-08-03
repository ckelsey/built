'use strict'
const path = require('path')

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: {
        'built': path.join(__dirname, 'src/components'),
        'calendar-grid': path.join(__dirname, 'src/components/calendar-grid'),
        'effect-bounce-z': path.join(__dirname, 'src/components/effect-bounce-z'),
        'effect-underline': path.join(__dirname, 'src/components/effect-underline'),
        'icon-element': path.join(__dirname, 'src/components/icon-element'),
        'input-field': path.join(__dirname, 'src/components/input-field'),
        'overlay-content': path.join(__dirname, 'src/components/overlay-content'),
        'rotary-list': path.join(__dirname, 'src/components/rotary-list'),
    },
    resolve: {
        extensions: ['*', '.ts', '.html']
    },
    optimization: {
        minimize: true,
        // splitChunks: {
        //     chunks: 'all'
        // }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader!ts-loader"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader?exportAsEs6Default"
            }
        ]
    }
}
// 'use strict'
// const path = require('path')

// module.exports = {
//     mode: 'production',
//     context: __dirname,
//     resolve: {
//         extensions: ['*', '.ts', '.html']
//     },
//     optimization: {
//         minimize: true,
//         splitChunks: {
//             chunks: 'all'
//         }
//     },
//     output: {
//         filename: '[name].js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.ts$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader!ts-loader"
//             }, {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             }, {
//                 test: /\.html$/,
//                 exclude: /node_modules/,
//                 loader: "html-loader?exportAsEs6Default"
//             }
//         ]
//     }
// }