gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
bower_src = require('./task-bower').bower_src
path_app = config.path_app
path_src = config.path_src

files = [
  "#{path_src}/less/bootstrap.less"
  "#{path_src}/less/**/*.less"
  "#{path_src}/**/*.less"
]

gulp.task "less", ->
  dest_path = "#{path_app}/css"

  gulp.src files
  .pipe plugins.plumber({errorHandler: errorHandler('LESS')})
  # concat,less,autoprefixer may have error with sourcemaps, disable them for next version.
  #.pipe plugins.if config.isRelease, plugins.sourcemaps.init()
  .pipe plugins.concat("app.less")
  .pipe(plugins.less
    paths: ["#{bower_src}/bootstrap/less/"] # Specify search paths for @import directives
    compress: true
  )
  .pipe plugins.autoprefixer()
  #.pipe plugins.if config.isRelease, plugins.sourcemaps.write()
  .pipe gulp.dest dest_path
  .on 'end', plugins.livereload.reload

exports.watch = ->
  gulp.watch files , ['less']

