#!/bin/bash
npm install
npm run build
mkdir -p dist/photos
cp -r public/photos/* dist/photos/ 