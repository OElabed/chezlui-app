docker build -t chez-lui-env .
docker run --rm -d -v $(pwd):/ionicapp chez-lui-env tail -f /dev/null
docker exec -e COLUMNS="`tput cols`" -e LINES="`tput lines`" -ti 10c6493cd8b5 bash
