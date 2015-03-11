gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

gulp.task "copy", ->
  dest_path = "#{config.PATH_APP}/"

  gulp.src config.OTHER_SRC, base : config.PATH_SRC
  .pipe plugins.plumber({errorHandler: errorHandler('COPY')})
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()
