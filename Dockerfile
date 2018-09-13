FROM beevelop/ionic:latest

RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;26.0.1" "platforms;android-26" \
    && (sleep 3; echo "y";)

RUN mkdir /ionicapp
COPY . /ionicapp
WORKDIR /ionicapp
