
# build
sudo docker build -t chez-lui-env .

# Run
sudo docker run --rm -d -v $(pwd):/ionicapp chez-lui-env tail -f /dev/null

# attach
docker exec -e COLUMNS="`tput cols`" -e LINES="`tput lines`" -ti xxxxxxxxx bash

# Validate license
$ANDROID_HOME/tools/bin/sdkmanager "build-tools;26.0.1" "platforms;android-26"

# Install npm version
npm i -g npm

# clean project
rm -Rf node_modules platforms www res plugins .sourcemaps

# install npm
npm install

# Build app
./scripts/build.sh
