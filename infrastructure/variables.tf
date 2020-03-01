variable "bucket" {
  description = "S3 bucket for Terraform remote backend"
  type        = string
}

variable "key" {
  description = "S3 object key for Terraform remote backend tfstate file"
  type        = string
}

variable "region" {
  description = "AWS region to provision this module into"
  type        = string
}
