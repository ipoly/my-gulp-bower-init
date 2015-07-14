gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

path_src = config.path_src

files = [
  "#{path_src}/**/*.jade"
  "!#{path_src}/*.jade"
]

task =  ->
  dest_path = "#{config.path_app}/js/"

  gulp.src files.concat('!**/_*')
  .pipe plugins.order(files, base: process.cwd())
  .pipe plugins.plumber({errorHandler: errorHandler('JADE-P')})
  .pipe plugins.jade()
  .pipe plugins.angularTemplatecache
    root: '/'
    module: "templates",
    standalone: true
  .pipe plugins.uglify()
  .pipe gulp.dest dest_path
  .on 'end', plugins.livereload.reload

gulp.task "jade-p", task

exports.watch = ->
  gulp.watch files, ['jade-p-live']
