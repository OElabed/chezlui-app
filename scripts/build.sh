#!/usr/bin/env bash

cd /ionicapp \
&& rm -Rf node_modules platforms www res plugins \
&& npm install \
&& ionic cordova build android --prod --release
