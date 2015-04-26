gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
bowerFiles = require 'main-bower-files'
lazypipe = require 'lazypipe'
del = require 'del'

errorHandler = require './error-handler'
config = require './config'
path_app = config.path_app

dest_path = "#{path_app}/vendor"
bower_src = 'vendor'
vendor = "#{path_app}/vendor"
library_orders = [
  "#{vendor}/lodash/**/*.js"
  "#{vendor}/jquery/**/*.js"
  "#{vendor}/angular/**/*.js"
  "#{vendor}/angular*/**/*.js"
]

mergeJS = (key)->
  lazypipe()
  .pipe plugins.plumber, {errorHandler: errorHandler('MERGE-LIBRARY-'+key.toUpperCase())}
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.init loadMaps: true
  .pipe plugins.concat, "#{key}.js"
  .pipe plugins.if, !config.isLocal, plugins.uglify()
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path

gulp.task 'copyBowerFiles', ->
  gulp.src bowerFiles(), base: bower_src
  .pipe plugins.plumber {errorHandler: errorHandler('BOWER_FILES')}
  .pipe gulp.dest dest_path

gulp.task 'mergeJs', ['copyBowerFiles'], ->
    gulp.src library_orders
    .pipe mergeJS('library')()
    .on 'end', plugins.livereload.reload

gulp.task 'bower', ['mergeJs'], (cb)->
  del library_orders, cb

exports.watch = ->
  gulp.watch bowerFiles() , ['bower']

exports.bower_src = bower_src

