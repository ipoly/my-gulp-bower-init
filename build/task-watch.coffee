gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'

bower = require './task-bower'
less = require './task-less'
coffee = require './task-coffee'
jade = require './task-jade'
template = require './task-jade-p'
other = require './task-copy'
image = require './task-image'

gulp.task "watch", ["build"], ->
  if config.isLocal
    plugins.livereload.listen quiet: true

    bower.watch()
    less.watch()
    coffee.watch()
    jade.watch()
    template.watch()
    other.watch()
    image.watch()

  return


