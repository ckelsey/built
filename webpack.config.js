'use strict'
const path = require('path')

module.exports = {
    mode: 'production',
    context: __dirname,
    resolve: {
        extensions: ['*', '.ts', '.html']
    },
    optimization: {
        minimize: true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
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