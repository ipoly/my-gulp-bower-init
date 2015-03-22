
exports.path_src = path_src = "src"
exports.path_app = path_app = "app"

# variables.less was shared between client and public, should placed after bootstrap.less
exports.less_src = [
  "#{path_src}/less/bootstrap.less"
  "#{path_src}/less/**/*.less"
  "#{path_src}/**/*.less"
]

exports.pages = [
  "#{path_src}/*.jade"
]
exports.TEMPLATES = [
  "#{path_src}/**/*.jade"
  "!#{path_src}/*.jade"
  "!#{path_src}/**/_*.jade"
]

exports.other_src = [
  "#{path_src}/**/*.*"
  "!#{path_src}/**/*.coffee"
  "!#{path_src}/**/*.jade"
  "!#{path_src}/**/*.less"
  "!#{path_src}/**/*.jpg"
  "!#{path_src}/**/*.gif"
  "!#{path_src}/**/*.png"
  "!#{path_src}/**/_*.*"
]

exports.img_src = [
  "#{path_src}/**/*.jpg"
  "#{path_src}/**/*.gif"
  "#{path_src}/**/*.png"
  "#{path_src}/**/*.svg"
  "#{path_src}/**/*.ico"
]

exports.coffee_src = [
  "#{path_src}/**/*.coffee"
]

exports.BOWER_SRC = 'vendor'

vendor = "#{path_app}/vendor"

exports.LIBRARY_ORDERS = [
  "#{vendor}/lodash/**/*.js"

  "#{vendor}/jquery/**/*.js"

  "#{vendor}/angular/**/*.js"
  "#{vendor}/angular*/**/*.js"
]

argv = require("minimist")(process.argv.slice(2))

type = argv._[0] or 'local'
exports.isLocal = type is 'local'

console.log "Bulid type: #{type}."
console.log "Destination path: #{path_app}."
