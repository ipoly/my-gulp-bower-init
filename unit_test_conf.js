// Karma configuration
// Generated on Thu Aug 07 2014 15:57:23 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/static/vendor/client.js',
      "src/libs/chart/highcharts.js",
      "src/libs/chart/highcharts-more.js",
      "src/common/**/*.coffee",
      "src/client/**/*.coffee",
      'app/static/js/templates.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/jasmine-jquery/lib/jasmine-jquery.js',
      'tests/unit/**/*.coffee',
      {pattern: 'tests/unit/**/*.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'app/static/js/client.js': ['coverage'],
      //'src/**/*.coffee': ['coverage'],
      //'tests/unit/**/*.coffee': ['coffee']
      '**/*.coffee': ['coffee']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['dots', 'junit', 'coverage'],

    junitReporter: {
      outputFile: 'reports/unit-report.xml'
    },
    coverageReporter: {
      type : 'html',
      dir : 'reports/coverage/'
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    plugins : [
      'karma-coffee-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-junit-reporter',
      'karma-jasmine',
      'karma-coverage'
    ]
  });
};
