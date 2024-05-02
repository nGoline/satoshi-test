#!/bin/bash

# Build and start the containers
if docker-compose up -d --build; then
  # Wait for the backend to start
  while ! curl -s -f http://localhost:3001 > /dev/null; do
    sleep 1
  done

  # Open the frontend in the default browser
  open http://localhost:3000
else
  echo "Failed to start Docker containers"
  exit 1
fi