argv = require("minimist")(process.argv.slice(2))

exports.PATH_SRC = PATH_SRC = "src"

PATH_SRC = "src"
if argv.output?
  PATH_APP = argv.output
else
  PATH_APP = "app"

exports.PATH_APP = PATH_APP

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

exports.LIBRARY = [
  "#{vendor}/lodash/**/*.js"

  "#{vendor}/jquery/**/*.js"

  "#{vendor}/angular/**/*.js"
  "#{vendor}/angular*/**/*.js"
]

argv = require("minimist")(process.argv.slice(2))

BUILD_TYPES =
  LOCAL:      "local"
  DEVELOP:    "develop"
  STAGING:    "staging"
  PRODUCTION:    "production"

for arg in argv._
  for key, type of BUILD_TYPES
    if arg.toUpperCase() == type.toUpperCase()
      TYPE = type
      break

  if TYPE?
    break


exports.TYPE = TYPE = TYPE || BUILD_TYPES.LOCAL

exports.IS_STAGING = TYPE == BUILD_TYPES.STAGING
exports.IS_LOCAL = TYPE == BUILD_TYPES.LOCAL
exports.IS_DEVELOP = TYPE == BUILD_TYPES.DEVELOP
exports.IS_PRODUCTION = TYPE == BUILD_TYPES.PRODUCTION


replace = require 'gulp-replace'

path = require "path"
globs = require("glob").sync
MULTI_SCRIPT_REGEX = /(<script src="[\w\/\.\*]*)(js\/[\w\/\.\*]*\*[\w\/\.\*]*\.js)("><\/script>)/ig
exports.REPLACE_MULTI_SCRIPT_FUNC = ->
  replace MULTI_SCRIPT_REGEX, (match, before, key, after)->
    pattern = path.join PATH_APP + '/static', key
    files = globs(pattern).map (filename)->
      path.relative PATH_APP + '/static', filename

    before + files.join(after + before) + after


Q = require "q"
exports.SERVER = Q.defer()

console.log "Bulid type: #{TYPE}."
console.log "Destination path: #{PATH_APP}."
