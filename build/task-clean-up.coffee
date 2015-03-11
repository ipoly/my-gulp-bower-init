gulp = require 'gulp'
globs = require("glob")
fs = require 'fs'

gulp.task 'clean-up', ['preprocessor'], (cb)->
  globs 'app/**/', (err, files)->
    files.reverse().forEach (file)->
      fs.rmdir file, (err)-> null
    cb()
