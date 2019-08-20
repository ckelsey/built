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

const pack = () => {
    if (currentPacking) { currentPacking.kill() }

    return new Promise(resolve => {

        currentPacking = spawn(`webpack`, [
            `--config`,
            `webpack.config.js`,
            `--progress`
        ])

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

const watch = () => gulp.watch(files).on(`all`, pack)

const server = () => {
    process.env.NODE_ENV = `dev`

    return browserSync.init({
        serveStatic: [`./`],
        port: 5555,
        https: true,
        // single: true
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
