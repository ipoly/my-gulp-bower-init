gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'
del = require 'del'

path_src = config.path_src
dest_path = "#{config.path_app}"

files = [
  "#{path_src}/*.jade"
]

task = ->
  del "#{dest_path}/**/*.html", ->
    gulp.src files.concat('!**/_*')
    .pipe plugins.plumber({errorHandler: errorHandler('JADE')})
    .pipe plugins.jade
      pretty: config.isLocal
    .pipe gulp.dest dest_path
    .on 'end', plugins.livereload.reload

gulp.task "jade", task

exports.watch = ->
  gulp.watch files , ['jade']
