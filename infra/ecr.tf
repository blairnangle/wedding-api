resource "aws_ecr_repository" "wedding_api_image_registry" {
  name = "wedding-api-image-registry"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "wedding-api image registry"
  }
}
