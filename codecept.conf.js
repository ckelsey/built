exports.config = {
    tests: './test/*_test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:5555/',
            show: true,
            waitForNavigation: "networkidle0"
        }
    },
    include: {},
    bootstrap: null,
    mocha: {},
    name: 'built'
}