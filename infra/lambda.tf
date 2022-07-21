resource "aws_lambda_function" "wedding_api" {
  image_uri     = "${aws_ecr_repository.wedding_api_image_registry.repository_url}:latest"
  function_name = "wedding-api"
  role          = aws_iam_role.wedding_api.arn
  package_type  = "Image"
}

resource "aws_iam_role" "wedding_api" {
  name = "wedding-api"

  assume_role_policy = file("./policies/lambda-assume-role.json")
}

resource "aws_iam_role_policy_attachment" "basic_execution_to_wedding_api" {
  role       = aws_iam_role.wedding_api.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_secretsmanager_secret" "google_sheets_client_secret" {
  name = "google-sheets-client-secret"
}

data "aws_secretsmanager_secret" "google_sheet_id" {
  name = "google-sheet-id"
}

resource "aws_iam_policy" "allow_wedding_api_lambda_to_read_certain_secrets_from_secrets_manager" {
  policy = templatefile("policies/allow-wedding-api-lambda-to-read-certain-secrets-from-secrets-manager.json",
    {
      googleSheetsClientSecretArn = data.aws_secretsmanager_secret.google_sheets_client_secret.arn,
      googleSheetIdArn            = data.aws_secretsmanager_secret.google_sheet_id.arn,
    }
  )
}

resource "aws_iam_role_policy_attachment" "allow_wedding_api_lambda_to_read_certain_secrets_from_secrets_manager" {
  role       = aws_iam_role.wedding_api.name
  policy_arn = aws_iam_policy.allow_wedding_api_lambda_to_read_certain_secrets_from_secrets_manager.arn
}

resource "aws_lambda_permission" "wedding_api_api_gw_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.wedding_api.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.wedding_api.execution_arn}/*/*"
}
