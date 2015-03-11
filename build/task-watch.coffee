gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'

gulp.task "watch", ["build"], ->
  if config.IS_LOCAL
    plugins.livereload.listen quiet: true

    gulp.watch config.LESS_SRC , ["less"]

    gulp.watch config.COFFEE_SRC, ["coffee"]

    gulp.watch config.PAGES, ["jade"]

    gulp.watch config.TEMPLATES, ["jade-p-live"]

    gulp.watch config.IMG_SRC, ["image"]

    gulp.watch config.OTHER_SRC, ["copy"]


  return


