## Description

Hello Propeller Reviewer. This is the solution developed as part of my take-home assignment for Propeller. This project showcases my skills in building GQL API using NestJs, and also Makeing RESTful APIs using Node/Express in JS, implementing both GraphQL and RESTful services.

Features

GraphQL API: Implements a GraphQL server providing data retrieval.
REST API: Includes RESTful endpoints for managing products and images, following standard HTTP methods.
Database Integration: Utilizes TypeORM for database interactions.
UUID Implementation: E ach product and image is uniquely identified with a UUID. <br />
Testing Suite:  <br />
API tests (End-to-End) to verify the entire application flow. - [x] [implemented, as scripts] <br />
Unit tests  - [ ] [not properly, neither fully implemented] <br />
Integration tests - [ ] [not implemented] <br />

### Project Structure

gql/: Contains all GraphQL-related code.
rest/: REST API implementation.
tests/: Includes tests.
image/: Specific implementation for image-related operations.
product/: Dedicated to product management functionalities.

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

Proxy is utilised to transfer requests. Since this is not running dockerised, the ports for the individual services are also EXPOSED. Make sure you don't have anything running on ports:
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
$ docker-compose up --detach

# run all services
$ npm run start:concurent
```

## Killing the app in case of a problem after Ctrl+c [Unix-only command... kills processes that work on specific ports]

```bash
# If the app needs to be killed
$ npm run kill

```


### Not implemented properly, but you can run the commands. This is new to me, I was trying things out.

## Test [Scripts for endpoints testing implemented, files in test]
## This one creates files in main directory with the OUTPUT.
```bash
$ npm run test:endpoints
```

## Default commands from Nest Framework
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
