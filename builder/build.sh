#!/bin/sh
buildCss="../app-build/css/"

echo "optimizing application..."
node ./r.js -o ./build.config.js

echo "compiling and optimizing stylesheets..."
lessc "$buildCss"/main.less  > "$buildCss"/main.css

# clearing main.less to avoid being compiled
echo "" > "$buildCss"/main.less