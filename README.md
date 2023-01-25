<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

CQRS + Event Sourcing using redis as a read database and mongo as a event source database.
All developed with NestJS using typescript.

## Installation

```bash
$ npm install
```

## Environment

| Name        | Type     | Description             | Example                                |
| ----------- | -------- | ----------------------- | -------------------------------------- |
| `REDIS_URL` | `String` | URL of redis server     | `redis://127.0.0.1:6379/0`             |
| `MONGO_URL` | `String` | Url of monogo DB server | `mongodb://localhost:27017/eventstore` |


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Reconstructing the view db

```bash
$ npm run reconstruct-view-db
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Debug VS Code

```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "npm run start:debug",
      "request": "launch",
      "runtimeArgs": ["run-script", "start:debug"],
      "runtimeExecutable": "npm",
      "type": "pwa-node",
      "console": "internalConsole",
      "outputCapture": "std",
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "internalConsoleOptions": "openOnSessionStart",
      "env": {
        "DS_ENV": "dev",
        "DS_LOGGER": "true",
        "REDIS_URL": "redis://127.0.0.1:6379/0",
        "MONGO_URL": "mongodb://localhost:27017/eventstore",
      }
    },
    {
      "name": "npm run reconstruct-view-db",
      "request": "launch",
      "runtimeArgs": ["run-script", "reconstruct-view-db"],
      "runtimeExecutable": "npm",
      "type": "pwa-node",
      "console": "internalConsole",
      "outputCapture": "std",
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "internalConsoleOptions": "openOnSessionStart",
      "env": {
        "DS_ENV": "dev",
        "DS_LOGGER": "true",
        "REDIS_URL": "redis://127.0.0.1:6379/0",
        "MONGO_URL": "mongodb://localhost:27017/eventstore",
      }
    },
  ]
}
```
