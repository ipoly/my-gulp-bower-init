require('require-dir')('./build')
gulp = require 'gulp'

gulp.task "preprocessor", ["copy", "bower", "image", "less", "coffee", "jade-p", "jade"]

gulp.task "build", ["preprocessor", "clean-up"]

gulp.task "default", ["build", "watch", "webserver"]

gulp.task "develop", ["build"]

gulp.task "staging", ["build"]

gulp.task "production", ["build"]

