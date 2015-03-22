gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
del = require 'del'

gulp.task "jade", ["coffee"], ->

  dest_path = "#{config.path_app}"
  del "#{dest_path}/**/*.html", ->
    gulp.src config.pages.concat('!**/_*')
    .pipe plugins.plumber({errorHandler: errorHandler('JADE')})
    .pipe plugins.jade
      pretty: config.isLocal
    .pipe gulp.dest dest_path
    .pipe plugins.livereload()
