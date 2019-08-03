"use strict"

const gulp = require(`gulp`)
const bs = require(`browser-sync`)
const browserSync = bs.create()
const spawn = require('child_process').spawn
const exec = require('child_process').exec
let currentPacking

const files = [
    `./src/utils/*`,
    `./src/utils/**/*`,
    `./src/components/**/*`,
]

const fs = require('fs')
const path = require('path')
const componentsDir = path.resolve(`src/components`)
const entryNames = fs.readdirSync(componentsDir).filter(p => fs.lstatSync(path.resolve(componentsDir, p)).isDirectory())
const getEntries = (ENTRY) => {
    const entries = {}
    const basePath = ['src', 'components']
    const folderName = name => {
        const parts = name.split(`/`)
        let n = ``

        while ((n === `` || basePath.indexOf(n) > -1) && parts.length) {
            n = parts.shift()
        }

        return n
    }

    if (!!ENTRY && typeof ENTRY === `string`) {
        const name = folderName(ENTRY)

        if (name && entryNames.indexOf(name) > -1) {
            const ext = path.extname(ENTRY)
            const filename = path.parse(ENTRY).name

            if (ext === `.html` && filename.indexOf(`.min`) === -1) {
                let compressedData = []
                let compressedName = `${ENTRY.split(filename)[0]}${filename}.min${ext}`
                const compress = spawn(`html-minifier`, [
                    `--collapse-whitespace`,
                    `--remove-comments`,
                    `--remove-redundant-attributes`,
                    `--remove-tag-whitespace`,
                    `--minify-css`,
                    true,
                    ENTRY
                ])

                compress.stdout.on(`data`, data => {
                    compressedData.push(data)
                })

                compress.stderr.on(`data`, data => {
                    console.log(`compress error: ${data.toString()}`)
                })

                compress.on(`exit`, () => {
                    fs.writeFileSync(compressedName, compressedData.join(''))
                    console.log(`compress done`)
                })
            }
            entries[name] = `./${[].concat(basePath, [name, `index.ts`]).join('/')}`
        }
    }

    if (Object.keys(entries).length === 0) {
        const dir = fs.readdirSync(componentsDir)

        dir.forEach(p => {
            const base = path.resolve(componentsDir, p)
            const index = path.relative(__dirname, path.join(componentsDir, p, `index.ts`))

            if (fs.lstatSync(base).isDirectory() && fs.existsSync(index)) {
                entries[p] = `./${index}`
            }
        })
    }

    return Object.keys(entries).map(e => `${e}=${entries[e]}`)
}

// const pack = (ENTRY) => {
const pack = () => {
    if (currentPacking) {
        currentPacking.kill()
    }

    // const entries = getEntries(ENTRY)

    // console.log('ENTRY:', entries)

    return new Promise(resolve => {

        currentPacking = spawn(`webpack`, [
            `--config`,
            `webpack.config.js`,
            `--progress`
        ])
        // .concat(entries))

        currentPacking.stdout.on(`data`, data => {
            console.log(`pack: ${data.toString()}`)
        })

        currentPacking.stderr.on(`data`, data => {
            console.log(`pack: ${data.toString()}`)
        })

        currentPacking.on(`exit`, () => {
            console.log(`pack done`)
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`)
            return resolve()
        })
    })
}

const watch = () => {
    return gulp.watch(files).on(`all`, (type, filePath) => pack(filePath))
}

const server = () => {
    return browserSync.init({
        serveStatic: [`./`],
        port: 5555,
        https: true,
        single: true
    })
}

const polyfill = () => {
    return new Promise(resolve => {
        const cmd = spawn(`cp`, [
            `-r`,
            `node_modules/@webcomponents/.`,
            `dist`
        ])

        cmd.stdout.on(`data`, data => {
            console.log(`polyfill: ${data.toString()}`)
        })

        cmd.stderr.on(`data`, data => {
            console.log(`polyfill error: ${data.toString()}`)
        })

        cmd.on(`exit`, () => {
            console.log(`polyfill done`)
            return resolve()
        })
    })
}

gulp.task(`polyfill`, gulp.parallel(polyfill))
gulp.task(`watch`, gulp.parallel(watch))
gulp.task(`pack`, gulp.parallel(pack))
gulp.task(`server`, gulp.parallel(server))
gulp.task(`build`, gulp.parallel(`polyfill`, `pack`))
gulp.task(`default`, gulp.parallel(`server`, `polyfill`, `pack`, `watch`))
