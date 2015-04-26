gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'

bower = require './task-bower'
less = require './task-less'
coffee = require './task-coffee'

gulp.task "watch", ["build"], ->
  if config.isLocal
    plugins.livereload.listen quiet: true

    bower.watch()
    less.watch()
    coffee.watch()

    gulp.watch config.pages, ["jade"]

    gulp.watch config.TEMPLATES, ["jade-p-live"]

    gulp.watch config.img_src, ["image"]

    gulp.watch config.other_src, ["copy"]


  return


