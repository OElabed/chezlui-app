# sudo docker build -t chez-lui-env .
sudo docker run --rm -v $(pwd):/ionicapp chez-lui-env ./scripts/build.sh
sudo rm -rf /vagrant/*.apk
cp /home/vagrant/work/repos/pooc/chez-lui-package/chezlui-app/platforms/android/app/build/outputs/apk/armv7/release/*.apk /vagrant
sudo rm -Rf node_modules
npm i
