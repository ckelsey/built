exports.config = {
    hostname: 'localhost',
    port: 8282,
    path: '/',
    runner: 'local',
    capabilities: [
        { maxInstances: 1, browserName: 'chrome' }
    ],
    framework: 'jasmine',
    jasmineNodeOpts:{
        defaultTimeoutInterval: 5000,
        grep: null,
        invertGrep: null
    },
    headless: false,
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    reporters: ['json'],
    reporterOptions: { combined: true }
}