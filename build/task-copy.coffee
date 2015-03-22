gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

gulp.task "copy", ->
  dest_path = "#{config.path_app}/"

  gulp.src config.other_src, base : config.path_src
  .pipe plugins.plumber({errorHandler: errorHandler('COPY')})
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()
