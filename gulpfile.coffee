gulp = require "gulp"

notify = require "gulp-notify"
gutil = require 'gulp-util'
cache = require 'gulp-cached'
changed = require 'gulp-changed'
plumber = require "gulp-plumber"

bowerFiles = require "main-bower-files"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
less = require "gulp-less"
imagemin = require "gulp-imagemin"

SRC = {
    bower: ['bower_components']
    coffee: ["src/coffee/**/*.coffee"]
    jade: ["src/**/*.jade"]
    less: ["src/less/**/*.less"]
    images: ["src/img/**/*"]
}
DIST = {
    bower: "app/lib",
    scripts: "app/scripts/",
    htmls: "app/",
    styles: "app/styles/"
    images: "app/img/"
}

errorHandler = notify.onError
                message: "Error: <%= error.message %>"
                title: "ヽ(*。>Д<)o゜ "

successHandler = (type)->
    notify
        onLast: true
        message: "#{type} bulid success!"
        title: "╰(*°▽°*)╯"

gulp.task "images", ->
    gulp.src SRC.images
    .pipe plumber {errorHandler}
    .pipe changed DIST.images
    .pipe imagemin()
    .pipe gulp.dest DIST.images
    .pipe successHandler('IMAGES')

gulp.task "bower", ->
    gulp.src bowerFiles(), base: './bower_components'
    .pipe plumber {errorHandler}
    .pipe changed DIST.bower
    .pipe cache 'bower'
    .pipe gulp.dest DIST.bower
    .pipe successHandler('BOWER')

gulp.task "jade", ->
    gulp.src SRC.jade
    .pipe plumber {errorHandler}
    .pipe changed DIST.htmls
    .pipe cache 'jade'
    .pipe jade pretty: true
    .pipe gulp.dest DIST.htmls
    .pipe successHandler('JADE')

gulp.task "coffee", ->
    gulp.src SRC.coffee
    .pipe plumber {errorHandler}
    .pipe changed DIST.scripts
    .pipe cache 'coffee'
    .pipe coffee(bare: true)
    .pipe gulp.dest DIST.scripts
    .pipe successHandler('COFFEE')

gulp.task "less", ->
    gulp.src SRC.less
    .pipe plumber {errorHandler}
    .pipe changed DIST.styles
    .pipe cache 'less'
    .pipe less()
    .pipe gulp.dest DIST.styles
    .pipe successHandler('LESS')

gulp.task "watch", ->
    gulp.watch SRC.images, ['images']
    gulp.watch SRC.bower, ['bower']
    gulp.watch SRC.jade, ['jade']
    gulp.watch SRC.coffee, ['coffee']
    gulp.watch SRC.less, ['less']
    gutil.log "Gulp Watching..."

gulp.task "default", ['bower','jade','coffee','less','watch','images']