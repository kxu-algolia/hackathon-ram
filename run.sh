#!/bin/bash
APPID="$1"
APIKEY="$2"
INDEX="$3"
VERSION="$4"

# snapshot the current version of the rules
node snapshot.js $APPID $APIKEY $INDEX $VERSION > mvp-commit/export.json
cd mvp-commit
git add export.json
git commit -m $VERSION
git push origin master
cd ..

