#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'mike.cousins.io/coupon-3d-print' > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mcous/coupon-3d-print.git main:gh-pages

cd -
