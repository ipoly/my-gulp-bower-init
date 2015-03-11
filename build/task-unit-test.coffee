gulp = require 'gulp'
karma = require('karma').server

runTest = (op={}, cb)->
  op.configFile = __dirname + '/../unit_test_conf.js'
  karma.start op, cb

gulp.task "unit", (cb)->
  runTest cb

gulp.task "unit-live", (cb)->
  runTest {autoWatch: true, singleRun: false}, cb
