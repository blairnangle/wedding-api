# wedding-api

## TODO

- Principle of least privilege applied to GCP
  - Do we actually need the Google Drive API?
- Get client secret from AWS Secrets Manager via API call
  - Lambda needs permissions to access
  - Lambda needs credentials to authenticate
- Rename all variables from tutorials
- Set up CI/CD
- Handle local versus prod
- Set up a GitHub project and configure it in such a way that it can be private
  - AWS creds and possibly Google client secret need to be accessed at deploy-time as GitHub Actions secrets
- How to trigger API Gateway redeployment after updating
- Proper Terraform backend
