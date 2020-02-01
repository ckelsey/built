const path = require(`path`)
const webpack = require(`webpack`)
const env = process.env.NODE_ENV || `production`
const autoprefixer = require(`autoprefixer`)
const exec = require(`child_process`).exec
const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        `AfterEmitPlugin`,
        () => new Promise(resolve => {
            exec(`cp -r ./src/assets/ ./dist/assets/`)
            exec(`cp ./src/index.html ./dist/index.html`)
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`, resolve)
        })
    )
}

module.exports = {
    context: path.resolve(__dirname),
    entry: { "app": path.join(__dirname, `src/index.js`) },
    devServer: {
        contentBase: path.join(__dirname, `dist`),
        compress: false,
        port: 4000,
        https: true,
        inline: false,
        open: false,
        host: `localhost`,
        hot: false,
        liveReload: false,
        writeToDisk: true,
        historyApiFallback: { index: `/` },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },
    target: `web`,
    output: {
        path: path.join(__dirname, `dist`),
        filename: `./[name].js`,
        umdNamedDefine: true,
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ],
    mode: `production`,
    optimization: {
        minimize: env === `production`
    },
    resolve: { extensions: [`*`, `.js`, `.json`, `.scss`, `.html`] },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: `babel-loader`,
                    options: {
                        presets: [
                            [`@babel/preset-env`, {
                                modules: false,
                                // corejs: 3,
                                // useBuiltIns: `entry`,
                                // targets: {
                                //     chrome: 78,
                                //     ie: 11,
                                //     safari: 12,
                                //     edge: 17
                                // }
                            }]
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
            }
        ]
    }
}