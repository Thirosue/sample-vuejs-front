# vue-sample-app

[![Build Status](https://travis-ci.org/Thirosue/sample-vuejs-front.svg?branch=master)](https://travis-ci.org/Thirosue/sample-vuejs-front)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)

> A Vue.js project

## Required

* Docker
* Chrome

## BackEnd

### Run BackEnd API

```
$ docker-compose up -d
```

### Swagger

http://localhost:18081/admin/swagger-ui.html

### 接続先情報

* テストユーザ

```
sample@sample.com / password
```

* db

```
$ docker exec -ti sample-db /bin/bash
root@sample-db:/# mysql -h localhost -P 3306 -uroot -ppassw0rd sample
```

### destory :boom:

```
$ ./clean_docker
```

## FrontEnd

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Run your unit tests
```
yarn test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
