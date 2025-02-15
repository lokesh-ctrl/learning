# Build the Docker image
docker build -t postgres-uploads .

# Run the container
docker run -d --name pg-container -p 5432:5432 postgres-uploads
