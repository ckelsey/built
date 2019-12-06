/* eslint-disable no-undef */
import assert from 'assert'
import { Get } from '../src/utils/get'

const object = {
    "time": 1575545198404,
    "coverage": [
        {
            "file": `/src/utils/between/index.js`,
            "statements": {
                "count": 18,
                "covered": 17,
                "score": 94,
                "scoreEvaluation": `good`
            },
            "functions": {
                "count": 3,
                "covered": 3,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "branches": {
                "count": 2,
                "covered": 1,
                "score": 50,
                "scoreEvaluation": `bad`
            },
            "score": 81,
            "scoreEvaluation": `ok`,
            "lines": [
                {
                    "content": `export function Between(start, end, value) {`,
                    "covered": 3
                },
                {
                    "content": `    const regex = new RegExp(\`\${start}([^\${end}]+)\${end}\`, \`gm\`)`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    const getAll = () => {`,
                    "covered": 3
                },
                {
                    "content": `        let match`,
                    "covered": 3
                },
                {
                    "content": `        const matches = []`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        while ((match = regex.exec(value)) !== null) {`,
                    "covered": 3
                },
                {
                    "content": `            if (match.index === regex.lastIndex) {`,
                    "covered": 0
                },
                {
                    "content": `                regex.lastIndex = regex.lastIndex + 1`,
                    "covered": 0
                },
                {
                    "content": `            }`,
                    "covered": 0
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `            matches.push(match[1])`,
                    "covered": 3
                },
                {
                    "content": `        }`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        return matches`,
                    "covered": 3
                },
                {
                    "content": `    }`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    return {`,
                    "covered": 3
                },
                {
                    "content": `        all() {`,
                    "covered": 3
                },
                {
                    "content": `            return getAll()`,
                    "covered": 3
                },
                {
                    "content": `        },`,
                    "covered": 3
                },
                {
                    "content": `        first() {`,
                    "covered": 3
                },
                {
                    "content": `            try {`,
                    "covered": 3
                },
                {
                    "content": `                return regex.exec(value)[1]`,
                    "covered": 3
                },
                {
                    "content": `            } catch (error) {`,
                    "covered": 3
                },
                {
                    "content": `                return`,
                    "covered": 3
                },
                {
                    "content": `            }`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        },`,
                    "covered": 3
                },
                {
                    "content": `        last() {`,
                    "covered": 3
                },
                {
                    "content": `            const results = getAll()`,
                    "covered": 3
                },
                {
                    "content": `            return results[results.length - 1]`,
                    "covered": 3
                },
                {
                    "content": `        },`,
                    "covered": 3
                },
                {
                    "content": `        at(index) {`,
                    "covered": 3
                },
                {
                    "content": `            const results = getAll()`,
                    "covered": 0
                },
                {
                    "content": `            return results[index]`,
                    "covered": 0
                },
                {
                    "content": `        },`,
                    "covered": 3
                },
                {
                    "content": `        get() {`,
                    "covered": 3
                },
                {
                    "content": `            return regex.exec(value)`,
                    "covered": 0
                },
                {
                    "content": `        }`,
                    "covered": 3
                },
                {
                    "content": `    }`,
                    "covered": 3
                },
                {
                    "content": `}`,
                    "covered": 3
                }
            ]
        },
        {
            "file": `/src/utils/get/index.js`,
            "statements": {
                "count": 22,
                "covered": 22,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "functions": {
                "count": 4,
                "covered": 4,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "branches": {
                "count": 26,
                "covered": 18,
                "score": 69,
                "scoreEvaluation": `bad`
            },
            "score": 90,
            "scoreEvaluation": `ok`,
            "lines": [
                {
                    "content": `/**`,
                    "covered": 0
                },
                {
                    "content": ` * Searches any type of item down a provided path, returning an emptyVal if provided. Also has the ability to perform a function on the end result`,
                    "covered": 0
                },
                {
                    "content": ` * @function Get`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @param {any} obj - The item to search. Can really be anything, as Get will call methods if provided`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @param {string} path - The path chain to follow. Must be dot(.) seperated. Array indice should be dot as well. `,
                    "covered": 0
                },
                {
                    "content": ` * Can have methods, but arguments can only be strings, numbers, or booleans.`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @param {any} emptyVal - If nothing resulted in the search, return this`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @param {function()} modifyFn - A function that will be run to modify the returned result`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @return {any} Either the found item or the emptyVal if provided`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * @example `,
                    "covered": 0
                },
                {
                    "content": ` * const obj = {`,
                    "covered": 0
                },
                {
                    "content": ` *      a:{`,
                    "covered": 0
                },
                {
                    "content": ` *          b:[`,
                    "covered": 0
                },
                {
                    "content": ` *              \`C\``,
                    "covered": 0
                },
                {
                    "content": ` *          ]`,
                    "covered": 0
                },
                {
                    "content": ` *      }`,
                    "covered": 0
                },
                {
                    "content": ` * }`,
                    "covered": 0
                },
                {
                    "content": ` * `,
                    "covered": 0
                },
                {
                    "content": ` * Get(obj, \`a.b.0.toLowerCase()\`) // \`c\``,
                    "covered": 0
                },
                {
                    "content": ` */`,
                    "covered": 0
                },
                {
                    "content": ``,
                    "covered": 0
                },
                {
                    "content": `export function Get(obj, path, emptyVal, modifyFn = v => v) {`,
                    "covered": 0
                },
                {
                    "content": `    /** If nothing to search, return */`,
                    "covered": 3
                },
                {
                    "content": `    if (!obj) { return emptyVal }`,
                    "covered": 0
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    /** The search array, initial search item being the source */`,
                    "covered": 3
                },
                {
                    "content": `    let Path = [obj]`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    /** Populate the search array */`,
                    "covered": 3
                },
                {
                    "content": `    if (path && path.toString().split) {`,
                    "covered": 3
                },
                {
                    "content": `        Path = [obj].concat(path.toString().split(\`.\`))`,
                    "covered": 3
                },
                {
                    "content": `    }`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    const result = Path.reduce((accumulator, currentValue) => {`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        /** If through reduce, accumulator comes out empty, stop */`,
                    "covered": 3
                },
                {
                    "content": `        if (accumulator === undefined || accumulator === null) {`,
                    "covered": 0
                },
                {
                    "content": `            return emptyVal`,
                    "covered": 0
                },
                {
                    "content": `        }`,
                    "covered": 0
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        /** If a function, call it */`,
                    "covered": 3
                },
                {
                    "content": `        if (currentValue.indexOf(\`.\`) === -1 && currentValue.indexOf(\`(\`) > -1) {`,
                    "covered": 10
                },
                {
                    "content": `            const reg = /\\((.*?)\\)/g.exec(currentValue)`,
                    "covered": 10
                },
                {
                    "content": `            const argsString = reg[1]`,
                    "covered": 10
                },
                {
                    "content": `            const args = argsString.split(\`,\`).map(arg => !isNaN(arg) ? parseFloat(arg) : arg.trim())`,
                    "covered": 10
                },
                {
                    "content": `            const functionName = currentValue.split(\`(\`)[0]`,
                    "covered": 10
                },
                {
                    "content": ``,
                    "covered": 10
                },
                {
                    "content": `            if (typeof accumulator[functionName] === \`function\`) {`,
                    "covered": 10
                },
                {
                    "content": `                return accumulator[functionName].apply(accumulator, args)`,
                    "covered": 10
                },
                {
                    "content": `            }`,
                    "covered": 10
                },
                {
                    "content": `        }`,
                    "covered": 10
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `        return accumulator[currentValue]`,
                    "covered": 9
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    })`,
                    "covered": 3
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    /** If nothing was found return emptyVal */`,
                    "covered": 3
                },
                {
                    "content": `    if (result === undefined || result === null) { return emptyVal }`,
                    "covered": 0
                },
                {
                    "content": ``,
                    "covered": 3
                },
                {
                    "content": `    return modifyFn(result)`,
                    "covered": 3
                },
                {
                    "content": `}`,
                    "covered": 3
                }
            ]
        },
        {
            "file": `/src/utils/pipe/index.js`,
            "statements": {
                "count": 5,
                "covered": 5,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "functions": {
                "count": 3,
                "covered": 3,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "branches": {
                "count": 2,
                "covered": 2,
                "score": 100,
                "scoreEvaluation": `good`
            },
            "score": 100,
            "scoreEvaluation": `good`,
            "lines": [
                {
                    "content": `export function Pipe(...functions) {`,
                    "covered": 8
                },
                {
                    "content": `    return function PipeInnerFunction(value) {`,
                    "covered": 2
                },
                {
                    "content": `        return functions.reduce(`,
                    "covered": 2
                },
                {
                    "content": `            function PipeInnerFunctionReducer(result, currentFunction) {`,
                    "covered": 2
                },
                {
                    "content": `                return typeof currentFunction !== \`function\` ?`,
                    "covered": 7
                },
                {
                    "content": `                    result :`,
                    "covered": 2
                },
                {
                    "content": `                    currentFunction(result)`,
                    "covered": 2
                },
                {
                    "content": `            },`,
                    "covered": 2
                },
                {
                    "content": `            value`,
                    "covered": 2
                },
                {
                    "content": `        )`,
                    "covered": 2
                },
                {
                    "content": `    }`,
                    "covered": 2
                },
                {
                    "content": `}`,
                    "covered": 2
                }
            ]
        }
    ],
    "coverageSummary": {
        "score": 90,
        "scoreEvaluation": `ok`,
        "branchScore": 73,
        "branchScoreEvaluation": `bad`,
        "functionScore": 100,
        "functionScoreEvaluation": `good`,
        "statementScore": 98,
        "statementScoreEvaluation": `good`
    },
    "tests": [
        {
            "start": `2019-12-05T11:26:29.529Z`,
            "end": `2019-12-05T11:26:31.082Z`,
            "capabilities": {
                "acceptInsecureCerts": false,
                "browserName": `chrome`,
                "browserVersion": `78.0.3904.108`,
                "chrome": {
                    "chromedriverVersion": `78.0.3904.70 (edb9c9f3de0247fd912a77b7f6cae7447f6d3ad5-refs/branch-heads/3904@{#800})`,
                    "userDataDir": `/var/folders/wp/4q5s01j938s93hlz0qp2cnyw0000gn/T/.com.google.Chrome.pkQOEy`
                },
                "goog:chromeOptions": {
                    "debuggerAddress": `localhost:52673`
                },
                "networkConnectionEnabled": false,
                "pageLoadStrategy": `normal`,
                "platformName": `mac os x`,
                "proxy": {},
                "setWindowRect": true,
                "strictFileInteractability": false,
                "timeouts": {
                    "implicit": 0,
                    "pageLoad": 300000,
                    "script": 30000
                },
                "unhandledPromptBehavior": `dismiss and notify`
            },
            "host": `localhost`,
            "port": 8282,
            "framework": `jasmine`,
            "mochaOpts": {
                "timeout": 10000
            },
            "suites": [
                {
                    "name": `Between`,
                    "duration": 34,
                    "start": `2019-12-05T11:26:30.916Z`,
                    "end": `2019-12-05T11:26:30.950Z`,
                    "sessionId": `32ec45f20f3d2472a8027f7caf58c3e7`,
                    "tests": [
                        {
                            "name": `should find 'str' between '{{' and '}}', given '{{str}}'`,
                            "start": `2019-12-05T11:26:30.916Z`,
                            "end": `2019-12-05T11:26:30.931Z`,
                            "duration": 15,
                            "state": `passed`
                        },
                        {
                            "name": `should find 'str' between '{{' and '}}', given '{{str}}'`,
                            "start": `2019-12-05T11:26:30.932Z`,
                            "end": `2019-12-05T11:26:30.939Z`,
                            "duration": 7,
                            "state": `passed`
                        },
                        {
                            "name": `should find 'str' between '{{' and '}}', given '{{str}}'`,
                            "start": `2019-12-05T11:26:30.940Z`,
                            "end": `2019-12-05T11:26:30.947Z`,
                            "duration": 7,
                            "state": `passed`
                        }
                    ],
                    "hooks": []
                }
            ],
            "specs": [
                `/tests/utils.between.test.js`
            ],
            "state": {
                "passed": 3,
                "failed": 0,
                "skipped": 0
            }
        },
        {
            "start": `2019-12-05T11:26:33.714Z`,
            "end": `2019-12-05T11:26:34.554Z`,
            "capabilities": {
                "acceptInsecureCerts": false,
                "browserName": `chrome`,
                "browserVersion": `78.0.3904.108`,
                "chrome": {
                    "chromedriverVersion": `78.0.3904.70 (edb9c9f3de0247fd912a77b7f6cae7447f6d3ad5-refs/branch-heads/3904@{#800})`,
                    "userDataDir": `/var/folders/wp/4q5s01j938s93hlz0qp2cnyw0000gn/T/.com.google.Chrome.z22AN7`
                },
                "goog:chromeOptions": {
                    "debuggerAddress": `localhost:52703`
                },
                "networkConnectionEnabled": false,
                "pageLoadStrategy": `normal`,
                "platformName": `mac os x`,
                "proxy": {},
                "setWindowRect": true,
                "strictFileInteractability": false,
                "timeouts": {
                    "implicit": 0,
                    "pageLoad": 300000,
                    "script": 30000
                },
                "unhandledPromptBehavior": `dismiss and notify`
            },
            "host": `localhost`,
            "port": 8282,
            "framework": `jasmine`,
            "mochaOpts": {
                "timeout": 10000
            },
            "suites": [
                {
                    "name": `Get`,
                    "duration": 67,
                    "start": `2019-12-05T11:26:34.415Z`,
                    "end": `2019-12-05T11:26:34.482Z`,
                    "sessionId": `46c163d7830012176052df107e87d61d`,
                    "tests": [
                        {
                            "name": `should find property value`,
                            "start": `2019-12-05T11:26:34.416Z`,
                            "end": `2019-12-05T11:26:34.427Z`,
                            "duration": 11,
                            "state": `passed`
                        },
                        {
                            "name": `should find length value`,
                            "start": `2019-12-05T11:26:34.427Z`,
                            "end": `2019-12-05T11:26:34.447Z`,
                            "duration": 20,
                            "state": `failed`,
                            "error": `AssertionError: Expected values to be strictly equal:\n\n2 !== 5\n`,
                            "standardError": `error properties: Object({ generatedMessage: true, code: 'ERR_ASSERTION', actual: 2, expected: 5, operator: 'strictEqual' })\n    at <Jasmine>\n    at UserContext.<anonymous> (/Users/chriskelsey/Sites/ck/built/tests/utils.get.test.js:27:16)`
                        },
                        {
                            "name": `should return method value`,
                            "start": `2019-12-05T11:26:34.447Z`,
                            "end": `2019-12-05T11:26:34.464Z`,
                            "duration": 17,
                            "state": `passed`
                        },
                        {
                            "name": `should be performant`,
                            "start": `2019-12-05T11:26:34.471Z`,
                            "end": `2019-12-05T11:26:34.480Z`,
                            "duration": 9,
                            "state": `failed`,
                            "error": `ReferenceError: performance is not defined`,
                            "standardError": `    at <Jasmine>\n    at UserContext.<anonymous> (/Users/chriskelsey/Sites/ck/built/tests/utils.get.test.js:35:29)`
                        }
                    ],
                    "hooks": []
                }
            ],
            "specs": [
                `/tests/utils.get.test.js`
            ],
            "state": {
                "passed": 2,
                "failed": 2,
                "skipped": 0
            }
        },
        {
            "start": `2019-12-05T11:26:37.189Z`,
            "end": `2019-12-05T11:26:37.897Z`,
            "capabilities": {
                "acceptInsecureCerts": false,
                "browserName": `chrome`,
                "browserVersion": `78.0.3904.108`,
                "chrome": {
                    "chromedriverVersion": `78.0.3904.70 (edb9c9f3de0247fd912a77b7f6cae7447f6d3ad5-refs/branch-heads/3904@{#800})`,
                    "userDataDir": `/var/folders/wp/4q5s01j938s93hlz0qp2cnyw0000gn/T/.com.google.Chrome.DOUiSk`
                },
                "goog:chromeOptions": {
                    "debuggerAddress": `localhost:52728`
                },
                "networkConnectionEnabled": false,
                "pageLoadStrategy": `normal`,
                "platformName": `mac os x`,
                "proxy": {},
                "setWindowRect": true,
                "strictFileInteractability": false,
                "timeouts": {
                    "implicit": 0,
                    "pageLoad": 300000,
                    "script": 30000
                },
                "unhandledPromptBehavior": `dismiss and notify`
            },
            "host": `localhost`,
            "port": 8282,
            "framework": `jasmine`,
            "mochaOpts": {
                "timeout": 10000
            },
            "suites": [
                {
                    "name": `Pipe`,
                    "duration": 83,
                    "start": `2019-12-05T11:26:37.695Z`,
                    "end": `2019-12-05T11:26:37.778Z`,
                    "sessionId": `251c7deca961e236a729a198af9cc203`,
                    "tests": [
                        {
                            "name": `should run all functions`,
                            "start": `2019-12-05T11:26:37.696Z`,
                            "end": `2019-12-05T11:26:37.729Z`,
                            "duration": 33,
                            "state": `passed`
                        },
                        {
                            "name": `should skip over invalid functions`,
                            "start": `2019-12-05T11:26:37.730Z`,
                            "end": `2019-12-05T11:26:37.777Z`,
                            "duration": 47,
                            "state": `passed`,
                            calling: (a) => `${a}called`,
                            number: (a) => a + 3
                        }
                    ],
                    "hooks": []
                }
            ],
            "specs": [
                `/tests/utils.pipe.test.js`
            ],
            "state": {
                "passed": 2,
                "failed": 0,
                "skipped": 0
            }
        }
    ]
}

describe(`Get`, () => {

    it(`should find property value`, () => {
        assert.strictEqual(44, Get(object, `coverage.0.lines.0.content.length`))
    })

    it(`should find length value`, () => {
        assert.strictEqual(238, Get(object, `tests.1.suites.0.tests.1.standardError.split('').length`))
    })

    it(`should return method value`, () => {
        assert.strictEqual(`stuffcalled`, Get(object, `tests.2.suites.0.tests.1.calling(stuff)`))
    })

    it(`should return method value`, () => {
        assert.strictEqual(5, Get(object, `tests.2.suites.0.tests.1.number(2)`))
    })

    it(`should be performant`, () => {
        const start = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })

        let i = 20000

        while (i) {
            i = i - 1
            Get(object, `coverage.0.lines.0.content.length`)
            Get(object, `tests.1.suites.0.tests.1.standardError.split('').length`)
            Get(object, `tests.2.suites.0.tests.1.calling()`)
            Get(object, `tests.2.suites.0.tests.45.calling()`)
        }

        const end = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })

        const time = end.time - start.time

        assert(time < 110)
    })

})