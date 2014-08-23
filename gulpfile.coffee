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

SRC = {
    bower: ['bower_components'],
    coffee: ["client/coffee/**/*.coffee"],
    jade: ["templates/**/*.jade"],
    less: ["client/less/**/*.less"]
}
DIST = {
    bower: "app/lib",
    scripts: "app/scripts/",
    htmls: "app/",
    styles: "app/styles/"
}

errorHandler = notify.onError
                message: "Error: <%= error.message %>"
                title: "ヽ(*。>Д<)o゜ "

successHandler = (type)->
    notify
        onLast: true
        message: "#{type} bulid success!"
        title: "╰(*°▽°*)╯"

gulp.task "bower", ->
    gulp.src bowerFiles(), base: './bower_components'
    .pipe plumber {errorHandler}
    .pipe changed DIST.bower
    .pipe gulp.dest DIST.bower
    .pipe successHandler('BOWER')

gulp.task "jade", ->
    return gulp.src SRC.jade
    .pipe plumber {errorHandler}
    .pipe changed DIST.htmls
    .pipe cache 'jade'
    .pipe jade()
    .pipe gulp.dest DIST.htmls
    .pipe successHandler('JADE')

gulp.task "coffee", ->
    return gulp.src SRC.coffee
    .pipe plumber {errorHandler}
    .pipe changed DIST.scripts
    .pipe cache 'coffee'
    .pipe coffee(bare: true)
    .pipe gulp.dest DIST.scripts
    .pipe successHandler('COFFEE')

gulp.task "less", ->
    return gulp.src SRC.less
    .pipe plumber {errorHandler}
    .pipe changed DIST.styles
    .pipe cache 'less'
    .pipe less()
    .pipe gulp.dest DIST.styles
    .pipe successHandler('LESS')

gulp.task "watch", ->
    gulp.watch SRC.bower, ['bower']
    gulp.watch SRC.jade, ['jade']
    gulp.watch SRC.coffee, ['coffee']
    gulp.watch SRC.less, ['less']
    gutil.log "Gulp Watching..."

gulp.task "default", ['bower','jade','coffee','less','watch']