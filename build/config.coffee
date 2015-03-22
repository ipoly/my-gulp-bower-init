argv = require("minimist")(process.argv.slice(2))

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

exports.LIBRARY = [
  "#{vendor}/lodash/**/*.js"

  "#{vendor}/jquery/**/*.js"

  "#{vendor}/angular/**/*.js"
  "#{vendor}/angular*/**/*.js"
]

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



console.log "Bulid type: #{TYPE}."
console.log "Destination path: #{PATH_APP}."
