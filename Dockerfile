FROM beevelop/ionic:latest

RUN mkdir /ionicapp
COPY . /ionicapp
WORKDIR /ionicapp
