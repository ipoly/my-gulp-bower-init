gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

task =  ->
  dest_path = "#{config.PATH_APP}/js/"

  gulp.src config.TEMPLATES.concat('!**/_*')
  .pipe plugins.plumber({errorHandler: errorHandler('JADE-P')})
  .pipe plugins.jade locals:environment:develop: config.local
  .pipe plugins.angularTemplatecache
    root: '/'
    module: "templates",
    standalone: true
  .pipe plugins.uglify()
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()

gulp.task "jade-p", ["coffee"], task
gulp.task "jade-p-live", task
