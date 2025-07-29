# Demo Web Application

A simple web application with React TypeScript frontend and Java Spring Boot backend, following SOLID, KISS, and DRY principles.

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Java 17 + Spring Boot 3.2
- **Containerization**: Docker + Docker Compose
- **Package Manager**: pnpm

## 📁 Project Structure

```
my-demo-app/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   ├── Dockerfile           # Frontend container configuration
│   └── nginx.conf          # Nginx configuration
├── backend/                  # Spring Boot application
│   ├── src/main/java/com/demo/app/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── dto/            # Data Transfer Objects
│   │   └── DemoApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── Dockerfile          # Backend container configuration
├── docker-compose.yml       # Multi-container orchestration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Java 17 (for local development)
- Node.js 18+ and pnpm (for local development)

### Using Docker (Recommended)

1. **Clone and navigate to the project:**

   ```bash
   cd my-demo-app
   ```

2. **Build and run with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:8080/api/health>

### Local Development

#### Frontend Development

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start development server:**

   ```bash
   pnpm run dev
   ```

4. **Access at:** <http://localhost:5173>

#### Backend Development

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Build with Maven:**

   ```bash
   mvn clean install
   ```

3. **Run the application:**

   ```bash
   mvn spring-boot:run
   ```

4. **Access at:** <http://localhost:8080>

## 🔧 API Endpoints

### POST /api/process

Process user input data.

**Request Body:**

```json
{
  "data": "your input text"
}
```

**Response:**

```json
{
  "message": "Data processed successfully!",
  "data": "YOUR INPUT TEXT",
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET /api/health

Health check endpoint.

**Response:**

```
Backend is running!
```

## 🐳 Docker Commands

### Build and Run

```bash
# Build all services
docker-compose build

# Run all services
docker-compose up

# Run in background
docker-compose up -d

# Stop all services
docker-compose down
```

### Individual Services

```bash
# Build frontend only
docker build -t demo-frontend ./frontend

# Build backend only
docker build -t demo-backend ./backend

# Run frontend container
docker run -p 3000:80 demo-frontend

# Run backend container
docker run -p 8080:8080 demo-backend
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
pnpm run test
```

### Backend Testing

```bash
cd backend
mvn test
```

## 🔍 Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Maven**: Java code quality tools
- **Docker**: Containerized development environment

## 🚨 Error Handling

### Frontend

- Async/await for API calls
- Try-catch blocks for error handling
- User-friendly error messages
- Loading states for better UX

### Backend

- Proper HTTP status codes
- Validation with Bean Validation
- Exception handling with @ControllerAdvice
- Graceful error responses

## 📊 Performance Considerations

- **Frontend**: Vite for fast development builds
- **Backend**: Spring Boot optimized for production
- **Docker**: Multi-stage builds for smaller images
- **Nginx**: Efficient static file serving

## 🔐 Security

- CORS configuration for frontend-backend communication
- Input validation on both frontend and backend
- No sensitive data in logs
- Container security best practices

## 📈 Monitoring

- Health check endpoints
- Docker health checks
- Application logging
- Error tracking
