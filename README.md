## Description

Propeller takehome 

The GraphQL endpoint is 
```
http::/localhost/graphql
```

The prdoucts REST endpoint is 
```
http::/localhost/api/products
```

The images REST endpoint is 
```
http::/localhost/api/images
```

Proxy is utilised to transfer requests. Since this is not running dockerised, the ports for the services are also EXPOSED. Make sure you don't have anything running on ports:
```
80 | 10000 | 10001 | 10002 | 10003
```

## Installation

```bash
$ npm install
```

## Running the app

### The app connects to a MongoDB container exposed on 27017.

```bash
# Initialise the Docker mongo container:
$ docker-compose up

# run all services
$ npm run start:concurent
```

## Running the app

```bash
# If the app needs to be killed
$ npm run kill

```


### TO BE IMPLEMENTED AS A SCRIPT
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
