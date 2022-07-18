resource "aws_secretsmanager_secret" "google_sheets_api_client_secret" {
  name = "google_sheets_api_client_secret"
}

resource "aws_secretsmanager_secret_version" "google_sheets_api_client_secret_initial" {
  secret_id     = aws_secretsmanager_secret.google_sheets_api_client_secret.id
  secret_string = file("../client_secret.json")
}
