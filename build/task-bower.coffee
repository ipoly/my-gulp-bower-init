gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
bowerFiles = require 'main-bower-files'
lazypipe = require 'lazypipe'
del = require 'del'

errorHandler = require './error-handler'
config = require './config'

dest_path = "#{config.path_app}/vendor"

mergeJS = (output)->
  lazypipe()
  .pipe plugins.plumber, {errorHandler: errorHandler('MERGE-LIBRAY')}
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.init loadMaps: true
  .pipe plugins.concat, output
  .pipe plugins.if, !config.isLocal, plugins.uglify()
  .pipe plugins.if, config.isLocal, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path

gulp.task 'clean-bower', (cb)->
  del [dest_path], cb

gulp.task 'copyBowerFiles', ['clean-bower'],->
  gulp.src bowerFiles(), base: config.BOWER_SRC
  .pipe plugins.plumber {errorHandler: errorHandler('BOWER_FILES')}
  .pipe gulp.dest dest_path


gulp.task 'mergeLibrary', ['copyBowerFiles'], ->
  merge = mergeJS 'library.js'
  gulp.src config.LIBRARY_ORDERS
  .pipe merge()

gulp.task 'bower', ['mergeLibrary'], (cb)->
  del config.LIBRARY_ORDERS, cb
