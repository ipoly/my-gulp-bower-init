gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
config = require './config.coffee'
path = require "path"
connect = require "connect"
serveStatic = require 'serve-static'

gulp.task "webserver", (next)->
  connect()
  .use serveStatic path.resolve config.path_app
  .listen process.env.PORT || 9000, next


