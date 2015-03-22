require('require-dir')('./build')
gulp = require 'gulp'

gulp.task "build", ["copy", "bower", "image", "less", "coffee", "jade-p", "jade"]

gulp.task "default", ["build", "watch", "webserver"]

gulp.task "release", ["build"]


