"use strict"

const gulp = require(`gulp`)
const bs = require(`browser-sync`)
const browserSync = bs.create()
const server = () => {
    process.env.NODE_ENV = `dev`

    return browserSync.init({
        serveStatic: [`./`],
        index: `./demo.html`,
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
gulp.task(`server`, gulp.parallel(server))
