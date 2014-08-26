echo
echo 'Installing npm packages...'
echo
npm config set loglevel http
npm install
npm prune
echo
echo 'Done.'
echo
echo 'Installing bower packages...'
bower install -V
bower prune -V
echo
echo '╰(*°▽°*)╯ Now you can use "npm start" to start. And you may want add this:'
echo 'PATH="./node_modules/.bin:$PATH" >> ~/.bashrc'
npm start