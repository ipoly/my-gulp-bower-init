gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
streamqueue = require 'streamqueue'
errorHandler = require './error-handler'
merged = require 'merge-stream'
lazypipe = require 'lazypipe'

dest_path = "#{config.path_app}/js"

mergeCoffee = (output)->
  lazypipe()
  .pipe plugins.plumber, {errorHandler: errorHandler('MERGE-COFFEE')}
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.init()
  .pipe plugins.coffee
  .pipe plugins.concat, output
  .pipe plugins.if, !config.isLocal, plugins.uglify()
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path

gulp.task "coffee", ->
  gulp.src config.coffee_src
  .pipe plugins.plumber({errorHandler: errorHandler('COFFEE-CLIENT')})
  .pipe mergeCoffee('app.js')()
  .pipe plugins.livereload()


