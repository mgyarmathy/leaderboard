# leaderboard-api

A simple Python REST API server to accompany the leaderboard React application.

## API Documentation

API Documentation is generated automatically by [FastAPI](https://github.com/tiangolo/fastapi) using [SwaggerUI](https://github.com/swagger-api/swagger-ui) and/or [ReDoc](https://github.com/Rebilly/ReDoc).

Link to leaderboard-api docs: https://leaderboard-api.gyarmathy.me/docs

## Development

- **Build**: `docker build -t mgyarmathy/leaderboard-api .`
- **Run**: `docker run --rm -p 8080:8080 mgyarmathy/leaderboard-api`
    - Access via http://localhost:8080
- **Test**: `docker run mgyarmathy/leaderboard-api sh -c 'pip install coverage && coverage run --omit=/usr/* -m unittest discover -p=*_test.py && coverage report --omit=*_test.py'`
    - Example output:
        ```bash
        mgyarmathy@MGyarmathy-MBP:~/Code/leaderboard/api$ docker run mgyarmathy/leaderboard-api sh -c 'pip install coverage && coverage run --omit=/usr/* -m unittest discover -p=*_test.py && coverage report --omit=*_test.py'
        Collecting coverage
        Downloading coverage-5.0.3-cp38-cp38-manylinux1_x86_64.whl (228 kB)
        Installing collected packages: coverage
        Successfully installed coverage-5.0.3
        ...........
        ----------------------------------------------------------------------
        Ran 11 tests in 0.037s

        OK
        Name        Stmts   Miss  Cover
        -------------------------------
        db.py          21      0   100%
        main.py        11      1    91%
        models.py       7      0   100%
        routes.py      28      0   100%
        -------------------------------
        TOTAL          67      1    99%

        ```