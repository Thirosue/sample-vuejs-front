# vue-sample-app

[![Build Status](https://travis-ci.org/Thirosue/sample-vuejs-front.svg?branch=master)](https://travis-ci.org/Thirosue/sample-vuejs-front)

> A Vue.js project

## Required

* Docker

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
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
