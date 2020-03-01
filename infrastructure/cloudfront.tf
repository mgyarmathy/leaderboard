resource "aws_cloudfront_origin_access_identity" "leaderboard" {
  comment = "leaderboard"
}

resource "aws_cloudfront_distribution" "leaderboard" {
  enabled  = true

  origin {
    domain_name = aws_s3_bucket.leaderboard.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.leaderboard.bucket_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.leaderboard.cloudfront_access_identity_path
    }
  }

  default_root_object = "index.html"

  aliases = ["leaderboard.gyarmathy.me"]

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.leaderboard.bucket_domain_name

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
