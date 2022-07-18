variable "aws_region" {
  default = "eu-west-2"
}

provider "aws" {
  region = var.aws_region
}
