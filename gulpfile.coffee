gulp = require "gulp"

notify = require "gulp-notify"
gutil = require 'gulp-util'
cache = require 'gulp-cached'
changed = require 'gulp-changed'
plumber = require "gulp-plumber"
sourcemaps = require('gulp-sourcemaps')
replace = require "gulp-replace"
path = require "path"
globs = require("glob").sync
concat = require "gulp-concat"
livereload = require "gulp-livereload"
connect = require "connect"

bowerFiles = require "main-bower-files"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
less = require "gulp-less"
imagemin = require "gulp-imagemin"

SRC = {
    bower: 'bower_components'
    coffee: ["src/coffee/**/*.coffee"]
    jade: ["src/**/*.jade"]
    less: ["src/less/**/*.less"]
    images: ["src/img/**"]
    assets: ["src/asset/**"]
}
DIST = {
    bower: "app/lib",
    scripts: "app/js",
    htmls: "app",
    styles: "app/css"
    images: "app/img"
    assets: "app"
}

APP_ROOT = 'app'

MULTI_SCRIPT_REGEX = /[\s\t]*<script src=(['"])\/(.+\*.+)\1><\/script>/igm

REPLACE_MULTI_SCRIPT_FUNC = ->
  replace MULTI_SCRIPT_REGEX, (match, $1, $2, offset, string)->
    pattern = path.join APP_ROOT, $2
    files = globs(pattern).map (filename)->
      relativePath = path.relative APP_ROOT, filename
      match.replace $2, relativePath
    files.join ''

errorHandler = (task)->
  notify.onError
    message: "#{task} Error: <%= error.message %>"
    title: "ヽ(*。>Д<)o゜ "

gulp.task "assets", ->
    gulp.src SRC.assets
    .pipe plumber {errorHandler: errorHandler('ASSETS')}
    .pipe changed DIST.assets
    .pipe cache 'asset'
    .pipe gulp.dest DIST.assets

gulp.task "images", ->
    gulp.src SRC.images
    .pipe plumber {errorHandler: errorHandler('IMAGES')}
    .pipe changed DIST.images
    .pipe imagemin()
    .pipe gulp.dest DIST.images

gulp.task "bower", ->
    gulp.src bowerFiles(), base: SRC.bower
    .pipe plumber {errorHandler: errorHandler('BOWER')}
    .pipe changed DIST.bower
    .pipe cache 'bower'
    .pipe gulp.dest DIST.bower

gulp.task "jade", ['coffee'], ->
    gulp.src SRC.jade
    .pipe plumber {errorHandler: errorHandler('JADE')}
    .pipe changed DIST.htmls
    .pipe jade pretty: true
    .pipe REPLACE_MULTI_SCRIPT_FUNC()
    .pipe gulp.dest DIST.htmls

gulp.task "coffee", ->
    gulp.src SRC.coffee
    .pipe plumber {errorHandler: errorHandler('COFFEE')}
    .pipe changed DIST.scripts
    .pipe cache 'coffee'
    .pipe sourcemaps.init()
    .pipe coffee()
    .pipe sourcemaps.write './maps'
    .pipe gulp.dest DIST.scripts

gulp.task "less", ->
    gulp.src SRC.less
    .pipe plumber {errorHandler: errorHandler('LESS')}
    .pipe changed DIST.styles
    .pipe concat 'app.less'
    .pipe less()
    .pipe gulp.dest DIST.styles

gulp.task "watch", ['build'], ->
    gulp.watch SRC.images, ['images']
    gulp.watch SRC.bower, ['bower']
    gulp.watch SRC.jade, ['jade']
    gulp.watch SRC.coffee, ['coffee']
    gulp.watch SRC.less, ['less']
    gulp.watch SRC.assets, ['assets']

    livereload.listen()
    gulp.watch APP_ROOT + '/**'
    .on 'change', livereload.changed

gulp.task "webserver", (next)->
  connect()
  .use connect.static APP_ROOT
  .listen process.env.PORT || 9000, next

gulp.task "build", ['bower', 'assets', 'jade', 'coffee', 'less', 'images']
gulp.task "default", ['build', 'webserver', 'watch']
