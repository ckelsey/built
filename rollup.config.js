import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
// import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'
import notify from 'rollup-plugin-notify'
// import progress from 'rollup-plugin-progress'
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { eslint } from 'rollup-plugin-eslint'
// import analyze from 'rollup-plugin-analyzer'
import html from 'rollup-plugin-html'
import pkg from './package.json'

export default {
    input: `src/components/button-element/index.js`,
    output: [{
        file: pkg.browser,
        format: `umd`,
        name: `Built`
    }, {
        file: pkg.main,
        format: `cjs`,
        name: `Built`
    }, {
        file: pkg.module,
        format: `es`,
    }],
    plugins: [
        // sizeSnapshot(),
        html({
            include: `**/*.html`
        }),
        postcss({ extract: true, use: [`sass`] }),
        commonjs(),
        eslint(),
        terser(),
        notify(),
        // progress(),
        // analyze()
    ]
}