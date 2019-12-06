/* eslint-disable */
const meddler = require('/Users/chriskelsey/Sites/ck/equipt/src/server/meddler').instance;
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
                root: ['/Users/chriskelsey/Sites/ck/built/equipt-testing'],
                alias: './'
            }]],
            root: '/Users/chriskelsey/Sites/ck/built/equipt-testing/babel.config.js',
            extends: '/Users/chriskelsey/Sites/ck/built/equipt-testing/babel.config.js',
            ignore: ['node_modules']
        });
        require('regenerator-runtime');
    },
    beforeTest: function(test) {
        meddler.trigger('beforeTest', {
            test,
            type: 'beforeTest'
        });
    },
    afterTest: function(test) {
        meddler.trigger('afterTest', {
            test,
            type: 'afterTest'
        });
    },
    onPrepare: function(config) {
        meddler.trigger('onPrepare', {
            config,
            type: 'onPrepare'
        });
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
    reporters: ['json'],
    reporterOptions: {
        combined: true
    },
    services: ['chromedriver', [Service]],
    specs: ["/Users/chriskelsey/Sites/ck/built/tests/utils.between.test.js", "/Users/chriskelsey/Sites/ck/built/tests/utils.get.test.js", "/Users/chriskelsey/Sites/ck/built/tests/utils.pipe.test.js"],
    outputDir: '/Users/chriskelsey/Sites/ck/built/equipt-testing/tmp'
};