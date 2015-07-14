gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
del = require 'del'

path_src = config.path_src
dest_path = "#{config.path_app}/"
files = [
  "#{path_src}/**/*.jpg"
  "#{path_src}/**/*.gif"
  "#{path_src}/**/*.png"
  "#{path_src}/**/*.svg"
  "#{path_src}/**/*.ico"
]

gulp.task "image", ->
  del dest_path, ->
    unless config.isLocal
      gulp.src files
      .pipe plugins.plumber({errorHandler: errorHandler('IMAGE')})
      .pipe plugins.imagemin(progressive:true)
      .pipe gulp.dest dest_path
    else
      gulp.src files
      .pipe gulp.dest dest_path

exports.watch = ->
  gulp.watch files, ['image']

