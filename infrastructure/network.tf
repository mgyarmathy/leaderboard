data "aws_vpc" "default" {
  id = "vpc-13e2e175" # default
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

resource "aws_security_group" "lb" {
  name        = "leaderboard-alb"
  description = "controls access to the ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "leaderboard_ecs_tasks" {
  name        = "leaderboard-ecs-tasks"
  description = "allow inbound access from the ALB only"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    protocol        = "tcp"
    from_port       = "8080"
    to_port         = "8080"
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_alb" "leaderboard" {
  name            = "leaderboard"
  subnets         = data.aws_subnet_ids.default.ids
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "leaderboard" {
  name        = "leaderboard"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"
}

resource "aws_lb_listener" "leaderboard-http-to-https" {
  load_balancer_arn = aws_alb.leaderboard.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "leaderboard-https" {
  load_balancer_arn = aws_alb.leaderboard.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.cert.arn

  default_action {
    target_group_arn = aws_alb_target_group.leaderboard.arn
    type             = "forward"
  }
}
