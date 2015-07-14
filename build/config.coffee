
exports.path_src = path_src = "src"
exports.path_app = path_app = "app"

argv = require("minimist")(process.argv.slice(2))

type = argv._[0] or 'local'
exports.isLocal = type is 'local'

console.log "Bulid type: #{type}."
console.log "Destination path: #{path_app}."
