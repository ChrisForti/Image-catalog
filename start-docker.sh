#!/bin/bash

# Start all services in Docker
echo "🚀 Starting Nautical Carpentry Knowledge Base in Docker..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker first."
  exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
  echo "❌ docker-compose not found. Please install Docker Compose."
  exit 1
fi

echo "✅ Docker is running"
echo ""
echo "Starting services..."
echo "  - PostgreSQL database"
echo "  - Backend API (port 3001)"
echo "  - Frontend (port 3000)"
echo ""

# Start services
docker-compose up --build

echo ""
echo "Application is running at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo "  Database: localhost:5432"
echo ""
echo "Press Ctrl+C to stop all services"
