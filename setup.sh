echo
echo 'Installing npm package...'
echo
npm config set loglevel http
npm install
npm prune
echo
echo 'Done.'
echo
echo 'Installing bower package...'
bower install -V
bower prune -V
echo
echo '╰(*°▽°*)╯ Now you can use "npm start" to start.'
npm start