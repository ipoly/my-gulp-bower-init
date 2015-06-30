notify = require "gulp-notify"

errorHandler = (task)->
  notify.onError
    message: """#{task} Error: <%= error.message %>
        <%= error.filename %>

        <%= error.code %>
    """
    title: "ヽ(*。>Д<)o゜.・゜゜・ヽ(｀Д´#)ﾉ "

module.exports = errorHandler
