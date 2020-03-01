terraform {
  required_version = ">= 0.12.10"
  
  backend "s3" {}
}

provider "aws" {
  region = var.region
}
