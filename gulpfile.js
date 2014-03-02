var gulp = require("gulp");

var notify = require("gulp-notify");
var gutil = require('gulp-util');
var cache = require('gulp-cached');
var changed = require('gulp-changed');

var bowerFiles = require("gulp-bower-files");
var coffee = require("gulp-coffee");
var jade = require("gulp-jade");
var less = require("gulp-less");

var src = {
    bower: ['bower_components'],
    coffee: ["client/coffee/**/*.coffee"],
    jade: ["templates/**/*.jade"],
    less: ["client/less/**/*.less"]
};
var dist = {
    bower: "dist/lib",
    scripts: "dist/scripts/",
    htmls: "dist/",
    styles: "dist/styles/"
};

gulp.task("bower", function(){
    bowerFiles()
    .pipe(changed(dist.bower))
    .pipe(gulp.dest(dist.bower))
    .pipe(notify('Bower updated: <%= file.relative %>'));
});

gulp.task("jade", function(){
    return gulp.src(src.jade)
    .pipe(changed(dist.htmls))
    // .pipe(cache('jade'))
    .pipe(jade().on('error', gutil.log))
    .pipe(gulp.dest(dist.htmls))
    .pipe(notify('Jade updated: <%= file.relative %>'));
});

gulp.task("coffee", function(){
    return gulp.src(src.coffee)
    .pipe(changed(dist.scripts))
    // .pipe(cache('coffee'))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(dist.scripts))
    .pipe(notify('Coffee updated: <%= file.relative %>'));
});

gulp.task("less", function(){
    return gulp.src(src.less)
    .pipe(changed(dist.styles))
    // .pipe(cache('less'))
    .pipe(less().on('error', gutil.log))
    .pipe(gulp.dest(dist.styles))
    .pipe(notify('Less updated: <%= file.relative %>'));
});

gulp.task("watch", function(){
    notify("Gulp Watching...")
    gulp.watch(src.bower, ['bower']);
    gulp.watch(src.jade, ['jade']);
    gulp.watch(src.coffee, ['coffee']);
    gulp.watch(src.less, ['less']);
});

gulp.task("default", ['bower','jade','coffee','less','watch']);