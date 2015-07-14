gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

path_src = config.path_src
files = [
  "#{path_src}/**/*.*"
  "!#{path_src}/**/*.coffee"
  "!#{path_src}/**/*.jade"
  "!#{path_src}/**/*.less"
  "!#{path_src}/**/*.jpg"
  "!#{path_src}/**/*.gif"
  "!#{path_src}/**/*.png"
  "!#{path_src}/**/_*.*"
]

gulp.task "copy", ->
  dest_path = "#{config.path_app}/"

  gulp.src files, base : config.path_src
  .pipe plugins.plumber({errorHandler: errorHandler('COPY')})
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()

exports.watch = ->
  gulp.watch files, ['copy']
