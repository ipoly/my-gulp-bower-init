gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
errorHandler = require './error-handler'

gulp.task "less", ->
  dest_path = "#{config.PATH_APP}/css"

  # public styles
  isRelease = config.IS_STAGING or config.IS_PRODUCTION

  gulp.src config.LESS_SRC
  .pipe plugins.plumber({errorHandler: errorHandler('LESS')})
  .pipe plugins.if !isRelease, plugins.sourcemaps.init()
  .pipe plugins.concat("app.less")
  .pipe(plugins.less
    paths: [".", "#{config.BOWER_SRC}/bootstrap/less/"] # Specify search paths for @import directives
    compress: true
  )
  .pipe plugins.autoprefixer()
  .pipe plugins.if !isRelease, plugins.sourcemaps.write()
  .pipe gulp.dest dest_path
  .pipe plugins.livereload()

