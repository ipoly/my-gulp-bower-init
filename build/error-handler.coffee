notify = require "gulp-notify"

errorHandler = (task)->
  notify.onError
    message: "#{task} Error: <%= error.message %>"
    title: "ヽ(*。>Д<)o゜ "

module.exports = errorHandler