/* eslint-disable tree-shaking/no-side-effects-in-initialization */
/* eslint-disable no-empty */
// const index = process.env.INDEX || `lambda`
// const WatchIgnorePlugin = require(`webpack`).WatchIgnorePlugin
// const NamedModulesPlugin = require(`webpack`).NamedModulesPlugin
// const HotModuleReplacementPlugin = require(`webpack`).HotModuleReplacementPlugin
const LoaderOptionsPlugin = require(`webpack`).LoaderOptionsPlugin
// const join = require(`path`).join
const _resolve = require(`path`).resolve

// const accessSync = require(`fs`).accessSync
const exec = require(`child_process`).exec
const autoprefixer = require(`autoprefixer`)
// const HtmlWebpackPlugin = require(`html-webpack-plugin`)
// const HardSourceWebpackPlugin = require(`hard-source-webpack-plugin`)
// const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin

// const env = process.env.NODE_ENV || `production`
const outDirPath = _resolve(`${__dirname}/dist`)

// let devServer = {}
// let plugins = []
// let postPluginHasRan = false

const optimization = {
    // minimize: false,
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
            // exec(`node scripts/${index}.js`, resolve)
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, resolve)
        })
    )
}

// if (env === `development`) {
//     devServer = {
//         contentBase: __dirname,
//         compress: false,
//         port: 9000,
//         https: false,
//         inline: false,
//         open: false,
//         host: `0.0.0.0`,
//         hot: false,
//         liveReload: false,
//         writeToDisk: true,
//         watchOptions: {
//             aggregateTimeout: 300,
//             poll: 1000,
//         },
//     }

//     plugins = [
//         new WatchIgnorePlugin([join(__dirname, `node_modules`)]),
//         new HtmlWebpackPlugin({ filename: `index.html`, template: `index.html` }),
//         new NamedModulesPlugin(),
//         new HotModuleReplacementPlugin(),
//         new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
//         new BundleAnalyzerPlugin(),
//         postPlugin
//     ]
// }

// if (env === `production`) {
//     plugins = [
//         new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
//         postPlugin
//     ]
// }

// try {
//     if (accessSync(_resolve(`${__dirname}/node_modules`))) {
//         plugins.push(new HardSourceWebpackPlugin())
//     }
// } catch (error) { }

const exported = {
    mode: `production`,
    context: __dirname,
    entry: _resolve(`./src/index`),
    // resolve: { extensions: [`*`, `.js`, `.html`] },
    resolve: { extensions: [`*`, `.js`, `.json`, `.scss`, `.html`] },
    optimization,
    // devServer,
    output: {
        filename: `built.js`,
        path: outDirPath,
        libraryTarget: `umd`,
        library: `builtjs`,
        globalObject: `typeof self !== 'undefined' ? self : this`
    },
    plugins: [
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: `babel-loader`,
            //         options: {
            //             presets: [
            //                 [`@babel/preset-env`, {
            //                     modules: false,
            //                     corejs: 3,
            //                     // useBuiltIns: `entry`,
            //                     // targets: {
            //                     //     chrome: 78,
            //                     //     ie: 11,
            //                     //     safari: 12,
            //                     //     edge: 17
            //                     // }
            //                 }]
            //             ]
            //         }
            //     }]
            // },
            {
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
            }
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: `babel-loader`,
            //         options: {
            //             presets: [
            //                 [`@babel/env`, {
            //                     modules: false,
            //                 }],
            //             ]
            //         }
            //     }]
            // }, {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: `html-loader`,
            //             options: {
            //                 minimize: true
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(scss|css)$/,
            //     exclude: /node_modules/,
            //     use: [
            //         `css-loader`,
            //         `sass-loader`,
            //         `postcss-loader`,
            //     ],
            // },
        ]
    }
}

module.exports = exported