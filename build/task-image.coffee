gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

gulp.task "image", ->
  dest_path = "#{config.path_app}/"

  if config.IS_STAGING or config.IS_PRODUCTION
    gulp.src config.img_src
    .pipe plugins.plumber({errorHandler: errorHandler('IMAGE')})
    .pipe plugins.imagemin(progressive:true)
    .pipe gulp.dest dest_path
  else
    gulp.src config.img_src
    .pipe gulp.dest dest_path


