# catasoft-assignment
Node Module with a `findServer()` function which should return a Promise that either:
    a. Resolves with the online server that has the lowest priority number.
    b. Rejects with an error, if no Servers are online.

I've used `axios` package to make http requests, `nock` package to setup a mock server for running unit testcases. Used `chai` & `mocha` to run those tests.

# Prerequisites
node 10.0+, npm 5.0+

# Steps to install
Clone the repository, move into the project's root directory and use below commands to run the module

```
npm install
node app.js
```

Use below command to run the test cases

```
npm run test
```

Use below command to build for production

```
npm run build
```
