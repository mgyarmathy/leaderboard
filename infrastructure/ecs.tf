resource "aws_ecs_cluster" "leaderboard" {
  name = "leaderboard"

  capacity_providers = ["FARGATE"]
}

resource "aws_ecs_service" "leaderboard_api" {
  name            = "leaderboard-api"
  cluster         = aws_ecs_cluster.leaderboard.id
  task_definition = aws_ecs_task_definition.leaderboard_api.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.leaderboard_ecs_tasks.id]
    subnets          = data.aws_subnet_ids.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.leaderboard.arn
    container_name   = "leaderboard-api"
    container_port   = 8080
  }
}

resource "aws_ecs_task_definition" "leaderboard_api" {
  family                   = "leaderboard-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn

  container_definitions = <<EOF
[
  {
    "cpu": 256,
    "image": "462053336802.dkr.ecr.us-east-1.amazonaws.com/mgyarmathy/leaderboard-api",
    "memory": 512,
    "name": "leaderboard-api",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 8080
      }
    ]
  }
]
EOF
}
