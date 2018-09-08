docker build -t chez-lui-env .
docker run --rm -d -v $(pwd):/ionicapp chez-lui-env tail -f /dev/null
docker exec -e COLUMNS="`tput cols`" -e LINES="`tput lines`" -ti 10c6493cd8b5 bash
rm -Rf node_modules
npm i
npm install -g cordova
ionic cordova build android --prod --release
ionic cordova platform rm android
ionic cordova platform add android
ionic cordova build android
