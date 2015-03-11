gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
streamqueue = require 'streamqueue'
errorHandler = require './error-handler'
merged = require 'merge-stream'
lazypipe = require 'lazypipe'

dest_path = "#{config.PATH_APP}/static/js"

mergeCoffee = (output)->
  lazypipe()
  .pipe plugins.plumber, {errorHandler: errorHandler('MERGE-COFFEE')}
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.init()
  .pipe plugins.coffee
  .pipe plugins.concat, output
  .pipe plugins.if, !config.IS_LOCAL, plugins.uglify()
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path

gulp.task "coffee", ->
  gulp.src config.COFFEE_SRC
  .pipe plugins.plumber({errorHandler: errorHandler('COFFEE-CLIENT')})
  .pipe mergeCoffee('app.js')()
  .pipe plugins.livereload()


