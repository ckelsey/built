/* eslint-disable tree-shaking/no-side-effects-in-initialization */
/* eslint-disable no-empty */

const WatchIgnorePlugin = require(`webpack`).WatchIgnorePlugin
const NamedModulesPlugin = require(`webpack`).NamedModulesPlugin
const HotModuleReplacementPlugin = require(`webpack`).HotModuleReplacementPlugin
const LoaderOptionsPlugin = require(`webpack`).LoaderOptionsPlugin
const join = require(`path`).join
const _resolve = require(`path`).resolve

const accessSync = require(`fs`).accessSync
const exec = require(`child_process`).exec
const autoprefixer = require(`autoprefixer`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const HardSourceWebpackPlugin = require(`hard-source-webpack-plugin`)
const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin

const env = process.env.NODE_ENV || `production`
const outDirPath = _resolve(`${__dirname}/dist`)

let devServer = {}
let plugins = []
// let postPluginHasRan = false

const optimization = {
    minimize: false,
    // splitChunks: {
    //     name: true,
    //     chunks: `async`,
    // },
    // usedExports: true,
    // providedExports: true,
}

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        `AfterEmitPlugin`,
        () => new Promise(resolve => {
            exec(`node scripts/lambda.js`, resolve)
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`)
            // const alert = () => {
            //     exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, () => {
            //         return resolve()
            //     })
            // }

            // if (!postPluginHasRan) {
            //     postPluginHasRan = true
            //     exec(`cp -r ${_resolve(`${__dirname}/node_modules/@webcomponents`)}/. dist`, alert)
            // } else {
            //     alert()
            // }
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
        hot: false,
        liveReload: false,
        writeToDisk: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    }

    plugins = [
        new WatchIgnorePlugin([join(__dirname, `node_modules`)]),
        new HtmlWebpackPlugin({ filename: `index.html`, template: `index.html` }),
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        new BundleAnalyzerPlugin(),
        postPlugin
    ]
}

if (env === `production`) {
    plugins = [
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}

try {
    if (accessSync(_resolve(`${__dirname}/node_modules`))) {
        plugins.push(new HardSourceWebpackPlugin())
    }
} catch (error) { }

const exported = {
    mode: `production`,
    context: __dirname,
    entry: _resolve(`./src/index`),
    resolve: { extensions: [`*`, `.js`, `.html`] },
    optimization,
    devServer,
    output: {
        filename: `built.js`,
        path: outDirPath,
        libraryTarget: `umd`,
        library: `builtjs`,
        globalObject: `typeof self !== 'undefined' ? self : this`
    },
    plugins,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: `babel-loader`,
                options: {
                    presets: [
                        [`@babel/env`, {
                            modules: false,
                        }],
                    ]
                }
            }]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: `html-loader`,
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
                `css-loader`,
                `sass-loader`,
                `postcss-loader`,
            ],
        },
        ]
    }
}

module.exports = exported