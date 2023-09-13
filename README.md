# wedding-api

~~We are getting married.~~

We got married! Archiving this project after destroying the infrastructure.

This was a project that took form data from our [wedding website](https://github.com/blairnangle/wedding) and wrote it
to a Google Sheets spreadsheet so that we could easily aggregate numbers for catering, etc.

## Usage

### Locally

Run it:

```shell
./run-local.sh
```

Send some data to the API to write to the spreadsheet. E.g.:

```shell
curl -X POST -v http://localhost:8083/ -H 'Content-Type: application/json' -H 'Accept: application/json' -d @example-payload.json
```

### Remotely

Send some data to the API to write to the spreadsheet. E.g.:

```shell
curl -X POST -v https://<lambad-fn-id>.execute-api.<region>.amazonaws.com/rsvp/ -H 'Content-Type: application/json' -H 'Accept: application/json' -d @example-payload.json
```

## Mechanism

### Infra

- Create AWS Lambda, API Gateway and Elastic Container Registry (ECR) resources

### Deployments

- Docker image is built and uploaded to ECR
- Dockerized Lambda is updated to use the latest image

### App start

#### Locally

- Google Sheets client secret and the ID of the Google Sheet that's going to be updated are loaded in from the local
  file system

#### Remotely

- Google Sheets client secret and the ID of the Google Sheet that's going to be updated are fetched from AWS Secrets
  Manager

### Request-response

- A single POST API at `/` takes a JSON body (depth max. 1) and uses the `google-spreadsheet` library to match the keys
  in the payload to the columns in the Google Sheet and appends the payload values as a row to the Sheet

### Adding secrets to AWS Secrets Manager

Assuming they have been downloaded to the root of the project:

```shell
export AWS_PROFILE=personal
aws secretsmanager create-secret --name google-sheets-client-secret --secret-string file://google-sheets-client-secret.json --region eu-west-2
aws secretsmanager create-secret --name google-sheet-id --secret-string file://google-sheet-id.json --region eu-west-2
```
