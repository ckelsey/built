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
            const isIndex = dir === `index`
            const isMain = isIndex && itemPath === `src/index.ts`

            if (!stat.isDirectory()) {
                if (ext === `.ts`) {
                    if (nonComponent || componentIndex) {
                        if (isMain) {
                            pre.push(`builtjs`)
                        } else if (!isIndex) {
                            pre.push(dir)
                        }
                        result[`${pre.join(`_`)}`] = path.join(__dirname, itemPath)
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