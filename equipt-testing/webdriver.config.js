/* eslint-disable */
const Service = {
    beforeSession: function() {
        require('@babel/register')({
            presets: [
                [`@babel/preset-env`, {
                    useBuiltIns: `entry`,
                    corejs: 3,
                    targets: {
                        browsers: [`last 3 versions`],
                        "node": true
                    }
                }]
            ],
            plugins: ['istanbul', ['babel-plugin-module-resolver', {
                root: ['./'],
                alias: './',
                cache: false
            }]],
            root: './',
            extends: './',
            ignore: ['node_modules'],
            cache: false
        });
        require('regenerator-runtime');
    },
};
exports.config = {
    hostname: 'localhost',
    port: 8282,
    path: '/',
    runner: 'local',
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--enable-precise-memory-info', '--headless', '--disable-gpu']
        }
    }],
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000,
        grep: null,
        invertGrep: null
    },
    headless: true,
    bail: 0,
    waitforTimeout: 20000,
    connectionRetryTimeout: 20000,
    connectionRetryCount: 3,
    reporters: ['spec', 'json'],
    reporterOptions: {
        combined: true
    },
    services: ['chromedriver', [Service]],
    specs: ["tests/utils.between.test.js", "tests/utils.get.test.js", "tests/utils.is-non-collection.test.js", "tests/utils.pipe.test.js"],
    outputDir: './',
    cache: false
};