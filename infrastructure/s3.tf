resource "aws_s3_bucket" "leaderboard" {
  bucket = "leaderboard.gyarmathy.me"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}


resource "aws_s3_bucket_policy" "leaderboard" {
  bucket = aws_s3_bucket.leaderboard.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::leaderboard.gyarmathy.me/*"]
    }
  ]
}
EOF
}
