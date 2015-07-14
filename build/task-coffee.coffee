gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
streamqueue = require 'streamqueue'
errorHandler = require './error-handler'
merged = require 'merge-stream'
lazypipe = require 'lazypipe'

path_src = config.path_src
dest_path = "#{config.path_app}/js"

files = [
  "#{path_src}/**/*.coffee"
]

mergeCoffee = (key)->
  lazypipe()
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.init()
  .pipe plugins.coffee
  .pipe plugins.concat, "#{key}.js"
  .pipe plugins.if, !config.IS_LOCAL, plugins.uglify()
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path

gulp.task "coffee", ->
  gulp.src files
  # https://github.com/gulpjs/gulp/issues/687
  # https://github.com/sirlantis/gulp-order/issues/9
  .pipe plugins.order(files, base: process.cwd())
  .pipe plugins.plumber({errorHandler: errorHandler('COFFEE')})
  .pipe mergeCoffee('app')()
  .on 'end', plugins.livereload.reload


exports.watch = ->
  gulp.watch files , ['coffee']
