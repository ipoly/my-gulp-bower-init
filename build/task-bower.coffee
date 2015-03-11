gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
bowerFiles = require 'main-bower-files'
lazypipe = require 'lazypipe'
del = require 'del'

errorHandler = require './error-handler'
config = require './config'

dest_path = "#{config.PATH_APP}/vendor"

mergeJS = (output)->
  lazypipe()
  .pipe plugins.plumber, {errorHandler: errorHandler('MERGE-LIBRAY')}
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.init loadMaps: true
  .pipe plugins.concat, output
  .pipe plugins.if, !config.IS_LOCAL, plugins.uglify()
  .pipe plugins.if, config.IS_LOCAL, plugins.sourcemaps.write()
  .pipe gulp.dest, dest_path


gulp.task 'copyBowerFiles', ->
  gulp.src bowerFiles(), base: config.BOWER_SRC
  .pipe plugins.plumber {errorHandler: errorHandler('BOWER_FILES')}
  .pipe gulp.dest dest_path


gulp.task 'mergeLibrary', ['copyBowerFiles'], ->
  merge = mergeJS 'library.js'
  gulp.src config.LIBRARY
  .pipe merge()

gulp.task 'bower', ['mergeLibrary'], (cb)->
  del config.LIBRARY, cb
