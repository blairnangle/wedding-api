resource "aws_lambda_function" "wedding_api" {
  image_uri     = "852514525658.dkr.ecr.eu-west-2.amazonaws.com/wedding-api-image-registry:latest"
  function_name = "wedding-api"
  role          = aws_iam_role.wedding_api.arn
#  handler       = "index.handler"
  #  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
#  runtime       = "nodejs16.x"
  package_type  = "Image"
}

resource "aws_iam_role" "wedding_api" {
  name = "wedding-api"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "basic_execution_to_wedding_api" {
  role       = aws_iam_role.wedding_api.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
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
