# Stock Management App



## Description

Created in NestJS, a Typescript framework

## Project setup

```bash
$ npm install
```

## Create and start a local db

```bash
docker run --name postgres-local -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
docker exec -it postgres-local psql -U postgres
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run the project and db as a container
(For Dev environment)
```bash
docker-compose up --build
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

#load tests
$ k6 run -e BASE_URL=<YOUR_BASE_URL> script.js
```

## Deployment

Cloud Run from GCP can be used for this app, please follow the instructions in gcp_script.sh
Check out the [documentation](https://cloud.google.com/run)

Sample
```bash
gcloud run deploy SERVICE_NAME \
    --image gcr.io/PROJECT_ID/IMAGE_NAME \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars CLOUD_SQL_CONNECTION_NAME=PROJECT_ID:us-central1:my-postgres-instance \
    --set-env-vars DB_USER=postgres \
    --set-env-vars DB_PASS=PASSWORD \
    --set-env-vars DB_NAME=databasename
```

### Documentation
Go to /docs to see swagger api documentation

### Architecture Diagram

<img src="assets/Diagram.svg" alt="diagram" width="500" height="500">

Copyright (c) 2025 Oscar Gutierrez

