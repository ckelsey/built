'use strict'
const path = require('path')
const fs = require('fs')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const env = process.env.NODE_ENV || `production`

console.log(`ENV::`, env, env === `production`)

const getFiles = source => {
    const result = {}

    const getsEM = (current, prefixes) => {
        const items = fs.readdirSync(current)


        items.forEach(p => {
            const pre = prefixes.slice()
            const itemPath = path.join(current, p)
            const stat = fs.statSync(itemPath)
            const ext = path.extname(itemPath)
            const dir = path.basename(itemPath, ext)
            const componentIndex = itemPath.indexOf(`src/components`) === 0 && dir === `index`
            const nonComponent = itemPath.indexOf(`src/components`) === -1


            if (!stat.isDirectory()) {
                if (ext === `.ts`) {
                    if (nonComponent || componentIndex) {
                        pre.push(dir)
                        result[`${pre.join(`_`)}`] = itemPath
                    }
                }
            } else {
                pre.push(dir)
                getsEM(itemPath, pre)
            }
        })
    }

    getsEM(source, [])
    return result
}

let entries = {
    'built': path.join(__dirname, 'src')
}

if (env === `production`) {
    entries = getFiles(`./src/`)
    console.log(entries)


    // entries = glob.sync(`./src/{components/**/index.ts,services/*.ts,utils/**/*.ts}`)
    // entries = Object.assign(entries, {
    //     'button-element': path.join(__dirname, 'src/components/button-element'),
    //     'calendar-controls': path.join(__dirname, 'src/components/calendar-controls'),
    //     'calendar-grid': path.join(__dirname, 'src/components/calendar-grid'),
    //     'date-time': path.join(__dirname, 'src/components/date-time'),
    //     'effect-bounce-z': path.join(__dirname, 'src/components/effect-bounce-z'),
    //     'effect-ripple': path.join(__dirname, 'src/components/effect-ripple'),
    //     'effect-underline': path.join(__dirname, 'src/components/effect-underline'),
    //     'icon-element': path.join(__dirname, 'src/components/icon-element'),
    //     'input-field': path.join(__dirname, 'src/components/input-field'),
    //     'overlay-content': path.join(__dirname, 'src/components/overlay-content'),
    //     'rotary-list': path.join(__dirname, 'src/components/rotary-list'),
    //     'time-display': path.join(__dirname, 'src/components/time-display'),
    //     'router': path.join(__dirname, 'src/services/router'),
    //     'unsupported': path.join(__dirname, 'src/services/unsupported'),
    //     'request': path.join(__dirname, 'src/services/request'),
    //     'curve': path.join(__dirname, 'src/utils/curve'),
    //     'get': path.join(__dirname, 'src/utils/get'),
    //     'id': path.join(__dirname, 'src/utils/id'),
    //     'observe': path.join(__dirname, 'src/utils/observe'),
    //     'pipe': path.join(__dirname, 'src/utils/pipe'),
    //     'observeEvent': path.join(__dirname, 'src/utils/observeEvent'),
    //     'set': path.join(__dirname, 'src/utils/set'),
    // })
}

let optimization = {
    minimize: false
}

if (env === `production`) {
    optimization = {
        minimizer: [new TerserPlugin({ terserOptions: { mangle: true } }),],
        minimize: true
    }
}

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: entries,
    resolve: { extensions: ['*', '.ts', '.html'] },
    optimization,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'builtjs'
    },
    // plugins: [new CompressionPlugin()], // disabled for now though compresses super tiny
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'babel-loader', 'ts-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'babel-loader']
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // }
            // {
            //     test: /\.svg$/,
            //     use: ['cache-loader', 'file-loader']
            // }
        ]
    }
}