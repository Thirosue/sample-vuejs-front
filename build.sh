#!/bin/ash

apk add python make g++
npm install -g yarn
yarn \
  && yarn lint \
  && yarn test:unit \
  && yarn build