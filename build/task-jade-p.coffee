gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

task =  ->
  dest_path = "#{config.PATH_APP}/static/js/"

  stream = gulp.src config.TEMPLATES.concat('!**/_*')
  .pipe plugins.plumber({errorHandler: errorHandler('JADE-P')})
  .pipe plugins.jade locals:environment:develop: config.IS_LOCAL
  .pipe config.REPLACE_MULTI_SCRIPT_FUNC() # must be after jade plugin
  .pipe plugins.angularTemplatecache
    root: '/'
    module: "templates",
    standalone: true
  .pipe plugins.uglify()
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()

gulp.task "jade-p", ["coffee"], task
gulp.task "jade-p-live", task
