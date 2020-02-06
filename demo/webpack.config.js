const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin
const path = require('path')
const exec = require('child_process').exec
const autoprefixer = require('autoprefixer')
const outDirPath = path.resolve(`${__dirname}/dist`)

const postPlugin = {
    apply: compiler => compiler.hooks.afterEmit.tap(
        'AfterEmitPlugin',
        () => new Promise(resolve => {
            exec('osascript -e \'display notification "Complete" with title "WEBPACK"\'', resolve)
        })
    )
}


const exported = {
    mode: 'production',
    context: __dirname,
    entry: path.resolve('./src/index'),
    resolve: { extensions: ['*', '.js', '.json', '.scss', '.html'] },
    optimization: {
        minimize: false
    },
    output: {
        filename: 'app.js',
        path: outDirPath
    },
    plugins: [
        new LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3,
                                    modules: false,
                                    useBuiltIns: 'entry',
                                    targets: {
                                        ie: 11,
                                        browsers: 'last 2 versions'
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
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
            }
        ]
    }
}

module.exports = exported