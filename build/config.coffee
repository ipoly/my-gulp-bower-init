
exports.PATH_SRC = PATH_SRC = "src"
exports.PATH_APP = PATH_APP = "app"

# variables.less was shared between client and public, should placed after bootstrap.less
exports.LESS_SRC = [
  "#{PATH_SRC}/less/bootstrap.less"
  "#{PATH_SRC}/less/**/*.less"
  "#{PATH_SRC}/**/*.less"
]

exports.PAGES = [
  "#{PATH_SRC}/*.jade"
]
exports.TEMPLATES = [
  "#{PATH_SRC}/**/*.jade"
  "!#{PATH_SRC}/*.jade"
  "!#{PATH_SRC}/**/_*.jade"
]

exports.OTHER_SRC = [
  "#{PATH_SRC}/**/*.*"
  "!#{PATH_SRC}/**/*.coffee"
  "!#{PATH_SRC}/**/*.jade"
  "!#{PATH_SRC}/**/*.less"
  "!#{PATH_SRC}/**/*.jpg"
  "!#{PATH_SRC}/**/*.gif"
  "!#{PATH_SRC}/**/*.png"
  "!#{PATH_SRC}/**/_*.*"
]

exports.IMG_SRC = [
  "#{PATH_SRC}/**/*.jpg"
  "#{PATH_SRC}/**/*.gif"
  "#{PATH_SRC}/**/*.png"
  "#{PATH_SRC}/**/*.svg"
  "#{PATH_SRC}/**/*.ico"
]

exports.COFFEE_SRC = [
  "#{PATH_SRC}/**/*.coffee"
]

exports.BOWER_SRC = 'vendor'

vendor = "#{PATH_APP}/vendor"

exports.LIBRARY_ORDERS = [
  "#{vendor}/lodash/**/*.js"

  "#{vendor}/jquery/**/*.js"

  "#{vendor}/angular/**/*.js"
  "#{vendor}/angular*/**/*.js"
]

_ = require 'lodash'
argv = require("minimist")(process.argv.slice(2))
argv = _.omit argv, '_', 'require'

TYPE = 'Local' if argv.local
TYPE = 'Release' if argv.release

_.merge exports, argv

console.log "Bulid type: #{TYPE}."
console.log "Destination path: #{PATH_APP}."
