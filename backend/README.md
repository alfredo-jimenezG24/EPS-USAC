# Backend (Jakarta EE / TomEE)

## Build
mvn -q clean package

## Run (Docker)
docker build -t inacif-backend .
docker run -p 8081:8080 --env-file ../.env inacif-backend
