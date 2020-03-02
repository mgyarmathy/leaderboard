# leaderboard-infrastructure

Terraform configuration files used to provision resources for deploying the
`leaderboard-client` React application and `leaderboard-api` API server on AWS.

## Architecture Summary

**leaderboard-client**
- The React application is hosted as a 
[static website](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html) 
on S3 and is delivered through a CDN using 
[CloudFront](https://aws.amazon.com/cloudfront/).
- URL: https://leaderboard.gyarmathy.me

**leaderboard-api**
- The Python API server is built as a Docker container and runs on AWS 
[ECS](https://aws.amazon.com/ecs/) with 
[Fargate](https://aws.amazon.com/fargate/). The ECS container is fronted by an 
[Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html), 
which handles routing and SSL-termination.
- URL: https://leaderboard-api.gyarmathy.me

## Instructions

- **Initialization** - `terraform init -backend-config=terraform.tfvars`
- **Validatation** - `terraform validate`
- **View the execution plan** - `terraform plan`
- **Apply changes** - `terraform apply`
