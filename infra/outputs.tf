output "base_url" {
  value = aws_api_gateway_deployment.wedding_api.invoke_url
}
