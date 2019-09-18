'use strict'
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const env = process.env.NODE_ENV || `production`
const outDirPath = process.env.OUTDIR || path.resolve(`${__dirname}/dist`)
const themeConfigPath = process.env.THEME || path.resolve(`${__dirname}/theme-config.js`)
let themeConfig = {}

const Type = require(path.resolve(`${__dirname}/type.js`))

try
{
    themeConfig = require(themeConfigPath)
    Object.keys(themeConfig).forEach(key => {
        process.env[key] = themeConfig[key]
    })
} catch (error) { }

// const getFiles = source => {
//     const result = {}

//     const getsEM = (current, prefixes) => {
//         const items = fs.readdirSync(current)

//         items.forEach(p => {
//             const pre = prefixes.slice()
//             const itemPath = path.join(current, p)
//             const stat = fs.statSync(itemPath)
//             const ext = path.extname(itemPath)
//             const dir = path.basename(itemPath, ext)
//             const componentIndex = itemPath.indexOf(path.join(__dirname, `src/components`)) === 0 && dir === `index`
//             const nonComponent = itemPath.indexOf(`src/components`) === -1
//             const isIndex = dir === `index`
//             const isMain = isIndex && itemPath === path.join(__dirname, `src/index.ts`)

//             if (!stat.isDirectory())
//             {
//                 if (ext === `.ts`)
//                 {
//                     if (nonComponent || componentIndex)
//                     {
//                         if (isMain)
//                         {
//                             pre.push(`builtjs`)
//                         } else if (!isIndex)
//                         {
//                             pre.push(dir)
//                         }
//                         result[`${pre.join(`_`)}`] = itemPath
//                     }
//                 }
//             } else
//             {
//                 pre.push(dir)
//                 getsEM(itemPath, pre)
//             }
//         })
//     }

//     getsEM(source, [])
//     return result
// }

// let entries = env === `production`
//     ? getFiles(path.resolve(`${__dirname}/src/`))
//     : {
//         'builtjs': path.join(__dirname, 'src')
//     }

let entries = { 'builtjs': path.join(__dirname, 'src') }


const objectToString = obj => {
    const isArray = Array.isArray(obj)
    const result = `${!isArray ? `{` : `[`}${Object.keys(obj)
        .map(key => {
            const keyString = isArray ? `` : `${key}:`
            switch (Type(obj[key]))
            {
                case `object`:
                    return `${keyString}${objectToString(obj[key])}`

                case `array`:
                    return `${keyString}${objectToString(obj[key])}`

                case `date`:
                    return `${keyString}${obj[key].toDateString()}`

                case `string`:
                    return `${keyString}'${obj[key]}'`

                case `number`:
                case `boolean`:
                case `null`:
                case `undefined`:
                    return `${keyString}${obj[key]}`

                case `function`:
                    return `${keyString}${obj[key].toString()}`
            }

            console.log(Type(obj[key]))
        })
        .filter(v => !!v)
        .join(`,`)
        }${!isArray ? `}` : `]`}`

    return result
}

const getThemes = () => {
    let result = {}
    const themeDir = path.resolve(`${__dirname}/src/components`)

    fs.readdirSync(themeDir)
        .forEach(componentKey => {
            const themePath = path.join(themeDir, componentKey, `theme.js`)

            try
            {
                if (fs.existsSync(themePath))
                {
                    const theme = require(themePath)
                    const themeString = objectToString(theme)

                    result = Object.assign({}, result, theme.sass)

                    fs.writeFileSync(path.join(themeDir, componentKey, `theme.ts`), `/** DO NOT EDIT, AUTO-GENERATED */\nexport const ${componentKey.split(`-`).join(``).toUpperCase()} = ${themeString}`)
                }
            } catch (err)
            {
                console.log(err)
            }
        })

    return result
}
const themes = getThemes()
let devServer = {}
let plugins = []
let postPluginHasRan = false

const optimization = {
    minimize: false
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

            if (!postPluginHasRan)
            {
                postPluginHasRan = true
                exec(`cp -r ${path.resolve(`${__dirname}/node_modules/@webcomponents`)}/. dist`, alert)
            } else
            {
                alert()
            }
        })
    )
}

if (env === `development`)
{
    devServer = {
        contentBase: __dirname,
        compress: false,
        port: 9000,
        https: true,
        inline: false,
        open: false,
        hot: true,
        liveReload: true,
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

if (env === `production`)
{
    optimization.minimizer = [new TerserPlugin({ terserOptions: { mangle: true } }),]
    optimization.minimize = true
    plugins = [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
        postPlugin
    ]
}

try
{
    if (fs.accessSync(path.resolve(`${__dirname}/node_modules`)))
    {
        plugins.push(new HardSourceWebpackPlugin())
    }
} catch (error) { }

const exported = {
    mode: 'production',
    context: __dirname,
    entry: entries,
    resolve: { extensions: ['*', '.ts', '.html'] },
    optimization,
    devServer,
    output: {
        filename: '[name].js',
        path: path.resolve(outDirPath),
        libraryTarget: 'umd',
        library: 'builtjs'
    },
    // node: {
    //     zlib: true,
    //     assert: true,
    //     util: true,
    //     'readable-stream': true,
    //     'browserify-zlib': true
    // },
    // plugins: [new CompressionPlugin()], // disabled for now though compresses super tiny
    plugins,
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
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
                    {
                        loader: "@epegzz/sass-vars-loader",
                        options: {
                            syntax: 'scss',
                            vars: themes
                        }
                    },
                    'postcss-loader',
                ],
            },
        ]
    }
}

module.exports = exported