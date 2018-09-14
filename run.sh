#!/usr/bin/env bash

sudo docker build -t chez-lui-env .
sudo docker run --rm -d -v $(pwd):/ionicapp chez-lui-env tail -f /dev/null
docker exec -e COLUMNS="`tput cols`" -e LINES="`tput lines`" -ti chez-lui-env bash
sudo rm -rf /vagrant/*.apk
cp /home/vagrant/work/repos/pooc/chez-lui-package/chezlui-app/platforms/android/app/build/outputs/apk/armv7/release/*.apk /vagrant
sudo rm -Rf node_modules
npm i
sudo rm -Rf node_modules
npm i
