#!/usr/bin/env bash

sudo rm -rf /vagrant/*.apk
cp /home/vagrant/work/repos/pooc/chez-lui-package/chezlui-app/platforms/android/app/build/outputs/apk/armv7/release/*.apk /vagrant
