/* global require, process, __dirname, module */
const exec = require('child_process').exec
const path = require('path')

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        'AfterEmitPlugin',
        () => new Promise(resolve => {
            const alert = () => {
                exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, () => {
                    return resolve()
                })
            }

            exec(`cp ${path.join(__dirname, `../dist/main.js`)} ${path.join(__dirname, `web/dist/main.js`)}`)
            exec(`cp ${path.join(__dirname, `node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js`)} ${path.join(__dirname, `web/dist/custom-elements-es5-adapter.js`)}`)
            exec(`cp ${path.join(__dirname, `node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js`)} ${path.join(__dirname, `web/dist/webcomponents-loader.js`)}`, alert)
        })
    )
}

let devServer

if (process.env.NODE_ENV === `development`) {
    devServer = {
        contentBase: path.join(__dirname, `web`),
        compress: false,
        port: 9002,
        https: true,
        inline: false,
        open: false,
        host: `0.0.0.0`,
        hot: false,
        liveReload: false,
        writeToDisk: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    }
}

const exported = {
    entry: path.resolve(`${__dirname}/tests/index.js`),
    resolve: { extensions: ['.js', '.ts'] },
    devServer,
    output: {
        filename: 'tests.js',
        path: path.resolve(`${__dirname}/web/dist`),
        libraryTarget: 'umd',
        library: 'builtjs-tests'
    },

    plugins: [postPlugin],

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/env", { modules: false }],
                        ]
                    }
                }, 'ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/env", { modules: false }],
                        ]
                    }
                }]
            }
        ]
    }
}

module.exports = exported