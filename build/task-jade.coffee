gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
del = require 'del'

gulp.task "jade", ["coffee"], ->

  dest_path = "#{config.PATH_APP}"
  del "#{dest_path}/**/*.html", ->
    gulp.src config.PAGES.concat('!**/_*')
    .pipe plugins.plumber({errorHandler: errorHandler('JADE')})
    .pipe plugins.jade
      locals:environment:develop: config.local
      pretty: config.local
    .pipe gulp.dest dest_path
    .pipe plugins.livereload()
