/* global require, process, __dirname, module */

const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const env = process.env.NODE_ENV || `production`
const outDirPath = process.env.OUTDIR || path.resolve(`${__dirname}/dist`)

let devServer = {}
let plugins = []
let postPluginHasRan = false

const optimization = {
    minimize: false,
    splitChunks: {
        name: true,
        chunks: 'async',
    },
    usedExports: true,
    providedExports: true,
}

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        'AfterEmitPlugin',
        () => new Promise(resolve => {
            const alert = () => {
                exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, () => {
                    return resolve()
                })
            }

            if (!postPluginHasRan) {
                postPluginHasRan = true
                exec(`cp -r ${path.resolve(`${__dirname}/node_modules/@webcomponents`)}/. dist`, alert)
            } else {
                alert()
            }
        })
    )
}

if (env === `development`) {
    devServer = {
        contentBase: __dirname,
        compress: false,
        port: 9000,
        https: false,
        inline: false,
        open: false,
        host: `0.0.0.0`,
        hot: true,
        liveReload: true,
        writeToDisk: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    }

    plugins = [
        new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
        new HtmlWebpackPlugin({ filename: 'index.html', template: 'index.html' }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}

if (env === `production`) {
    plugins = [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}

try {
    if (fs.accessSync(path.resolve(`${__dirname}/node_modules`))) {
        plugins.push(new HardSourceWebpackPlugin())
    }
} catch (error) { }

const exported = {
    mode: 'production',
    context: __dirname,
    entry: path.resolve(`./src/index.ts`),
    resolve: { extensions: ['*', '.ts', '.html'] },
    optimization,
    devServer,
    output: {
        filename: '[name].js',
        path: path.resolve(outDirPath),
        libraryTarget: 'umd',
        library: 'builtjs'
    },
    plugins,
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
            }, {
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
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules/,
                use: [
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
        ]
    }
}

module.exports = exported