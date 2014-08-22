gulp = require "gulp"

notify = require "gulp-notify"
gutil = require 'gulp-util'
cache = require 'gulp-cached'
changed = require 'gulp-changed'

bowerFiles = require "main-bower-files"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
less = require "gulp-less"

src = {
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

gulp.task "bower", ->
    gulp.src bowerFiles()
    .pipe changed DIST.bower
    .pipe gulp.dest DIST.bower
    # .pipe notify 'Bower updated: <%= file.relative %>'

gulp.task "jade", ->
    return gulp.src src.jade
    .pipe changed DIST.htmls
    # .pipe cache 'jade'
    .pipe jade().on 'error', gutil.log
    .pipe gulp.dest DIST.htmls
    # .pipe notify 'Jade updated: <%= file.relative %>'

gulp.task "coffee", ->
    return gulp.src src.coffee
    .pipe changed DIST.scripts
    # .pipe cache 'coffee'
    .pipe coffee(bare: true).on 'error', gutil.log
    .pipe gulp.dest DIST.scripts
    # .pipe notify 'Coffee updated: <%= file.relative %>'

gulp.task "less", ->
    return gulp.src src.less
    .pipe changed DIST.styles
    # .pipe cache 'less'
    .pipe less().on 'error', gutil.log
    .pipe gulp.dest DIST.styles
    # .pipe notify 'Less updated: <%= file.relative %>'

gulp.task "watch", ->
    gulp.watch src.bower, ['bower']
    gulp.watch src.jade, ['jade']
    gulp.watch src.coffee, ['coffee']
    gulp.watch src.less, ['less']
    gutil.log "Gulp Watching..."

gulp.task "default", ['bower','jade','coffee','less','watch']