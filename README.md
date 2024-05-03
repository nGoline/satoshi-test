# Satoshi Full-Stack Test

This is my submission for the Satoshi Full-Stack Test. I have implemented the backend and frontend as requested. The backend is a RESTful API built with NestJS and the frontend is a React app.

## Running the app

You need Docker and Docker Compose installed on your machine. To run the app, clone the repository and run the following command:

```bash
./start.sh
```

This will build the Docker images, start the containers, and open your browser.
The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## Stopping the app

To stop the app, run the following command:

```bash
./stop.sh
```

## Swagger

The backend API has Swagger documentation available at `http://localhost:3001/api`.
