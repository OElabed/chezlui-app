#!/usr/bin/env bash

cd /ionicapp
rm -Rf node_modules
npm install
ionic cordova build android --prod --release
