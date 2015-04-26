gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
bower_src = require('./task-bower').bower_src
path_app = config.path_app

gulp.task "less", ->
  dest_path = "#{path_app}/css"

  gulp.src config.less_src
  .pipe plugins.plumber({errorHandler: errorHandler('LESS')})
  .pipe plugins.if config.isRelease, plugins.sourcemaps.init()
  .pipe plugins.concat("app.less")
  .pipe(plugins.less
    paths: ["#{bower_src}/bootstrap/less/"] # Specify search paths for @import directives
    compress: true
  )
  .pipe plugins.autoprefixer()
  .pipe plugins.if config.isRelease, plugins.sourcemaps.write()
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()

