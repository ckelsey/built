// const CleanWebpackPlugin = require(`clean-webpack-plugin`)
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`)
const LoaderOptionsPlugin = require(`webpack`).LoaderOptionsPlugin
// const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const path = require(`path`)
const exec = require(`child_process`).exec
const autoprefixer = require(`autoprefixer`)

const src = path.resolve(__dirname, `./src`)
const dist = path.resolve(__dirname, `./dist`)

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        `AfterEmitPlugin`,
        () => new Promise(resolve => {
            // exec(`node scripts/${index}.js`, resolve)
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, resolve)
        })
    )
}

module.exports = {
    mode: `production`,
    entry: {
        // legacy: `core-js/fn/promise`,
        bundle: [`${src}/index.js`]
    },
    output: {
        path: dist,
        filename: `[name].js`,
        libraryTarget: `umd`,
        library: `builtjs`,
        // globalObject: `this`
        // globalObject: `typeof self !== 'undefined' ? self : this`
    },
    optimization: {
        // splitChunks: {
        //     maxAsyncRequests: 1
        // },
        minimize: true
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: `babel-loader`,
            //     exclude: /node_modules/
            // },
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
            //                     useBuiltIns: `usage`,
            //                     targets: [`last 2 versions`, `ie >= 11`],
            //                     exclude: [`transform-classes`]
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
                ],
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
        ]
    },
    resolve: { extensions: [`*`, `.js`, `.json`, `.scss`, `.html`] },
    // resolve: {
    //     extensions: [`.js`],
    //     // modules: [`node_modules`, `src`],
    //     // alias: {
    //     //     services: `${src}/app/services`,
    //     //     helpers: `${src}/app/helpers`
    //     // }
    // },
    plugins: [
        new CleanWebpackPlugin({
            root: process.cwd(),
            verbose: true,
            dry: false
        }),
        // new HtmlWebpackPlugin({
        //     inject: false,
        //     template: `${src}/demo/index.html`,
        //     filename: 'index.html'
        // }),
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}