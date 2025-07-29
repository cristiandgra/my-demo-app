# 🚀 Demo Web Application

A full-stack web application demonstrating modern development practices with React, TypeScript, Spring Boot, and Docker.

## Quick Start

### Prerequisites

- Docker and Docker Compose installed

### Run the Application

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

### Access the Application

1. **Frontend**: <http://localhost:3000>
2. **Backend Home**: <http://localhost:8080>
3. **API Documentation**: <http://localhost:8080/api/>
4. **Swagger UI**: <http://localhost:8080/swagger-ui.html>
5. **Health Check**: <http://localhost:8080/api/health>

## 📚 API Documentation

### POST /api/process

Process user input data and return processed result.

**Request Body:**

```json
{
  "data": "hello world"
}
```

**Response (200 OK):**

```json
{
  "message": "Data processed successfully!",
  "data": "HELLO WORLD",
  "timestamp": "2024-01-01T12:00:00"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Error: Input data cannot be null or empty",
  "data": "",
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET /api/health

Check if the backend service is running.

**Response (200 OK):**

```
Backend is running!
```

## 🧪 Testing

### Frontend Testing

```bash
# Run tests
cd frontend
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## 🐳 Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

### Individual Services

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Restart specific service
docker-compose restart backend
docker-compose restart frontend

# View service logs
docker-compose logs backend
docker-compose logs frontend
```

## 📁 Project Structure

```
my-demo-app/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── App.tsx          # Main component
│   │   ├── App.test.tsx     # Component tests
│   │   └── index.css        # Tailwind CSS
│   ├── package.json         # Dependencies
│   ├── vitest.config.ts     # Test configuration
│   └── Dockerfile          # Multi-stage build
├── backend/                  # Spring Boot application
│   ├── src/main/java/
│   │   └── com/demo/app/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── dto/         # Data transfer objects
│   │       └── config/      # Configuration classes
│   ├── src/main/resources/
│   │   ├── templates/       # HTML pages
│   │   │   ├── index.html   # Main backend page
│   │   │   └── api.html     # API documentation page
│   │   └── application.properties # Spring Boot configuration
│   ├── pom.xml             # Maven dependencies
│   └── Dockerfile          # Multi-stage build
├── docker-compose.yml       # Service orchestration
└── README.md               # This file
```
