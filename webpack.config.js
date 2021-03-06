const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin
const path = require('path')
const exec = require('child_process').exec
const autoprefixer = require('autoprefixer')
const src = path.resolve(__dirname, './src')
const dist = path.resolve(__dirname, './dist')
const env = process.env.NODE_ENV || 'production'

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        'AfterEmitPlugin',
        () => new Promise(resolve => {
            exec('cp ./src/component-build/loader.js ./dist/loader.js', () => {
                exec('cp ./src/component-build/loader.js ./demo/node_modules/builtjs/dist/loader.js')
            })

            exec('cp ./dist/built-native.js ./demo/node_modules/builtjs/dist/built-native.js', () => {
                exec('cp ./dist/built-native.js ~/Sites/vision/CIS-Paramount/node_modules/builtjs/dist/built-native.js')
            })

            exec('cp ./dist/built-object.js ./demo/node_modules/builtjs/dist/built-object.js')

            exec('cp ./dist/loader.js ./demo/node_modules/builtjs/dist/loader.js')

            exec('cp ./dist/bundle.js ./demo/node_modules/builtjs/dist/bundle.js', () => {
                exec('osascript -e \'display notification "Complete" with title "WEBPACK"\'', resolve)
            })
        })
    )
}

module.exports = {
    mode: 'production',
    entry: {
        bundle: [`${src}/index.js`],
        'built-native': [`${src}/component-build/create-native-component.js`],
        'built-object': [`${src}/component-build/create-object-component.js`],
        'components/button-element': [`${src}/components/button-element/index.js`],
        'components/ajax-form': [`${src}/components/ajax-form/index.js`]
    },
    output: {
        path: dist,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'builtjs'
    },
    optimization: {
        minimize: env === 'production'
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 [
            //                     '@babel/preset-env',
            //                     {
            //                         corejs: 3,
            //                         modules: false,
            //                         useBuiltIns: 'usage',
            //                         targets: {
            //                             ie: 11,
            //                             browsers: 'last 2 versions'
            //                         }
            //                     }
            //                 ]
            //             ]
            //         }
            //     }]
            // },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
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
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.json', '.scss', '.html'] },
    plugins: [
        new CleanWebpackPlugin({
            root: process.cwd(),
            verbose: true,
            dry: false
        }),
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}