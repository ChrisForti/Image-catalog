#!/bin/bash

echo "🚀 Setting up Nautical Carpentry Knowledge Base..."

# Check for PostgreSQL
echo ""
echo "🔍 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
  echo "⚠️  PostgreSQL not found. Please install PostgreSQL 14+ first."
  echo "    macOS: brew install postgresql@16"
  echo "    Ubuntu: sudo apt install postgresql postgresql-contrib"
  exit 1
fi

if ! pg_isready &> /dev/null; then
  echo "⚠️  PostgreSQL is not running. Please start PostgreSQL first."
  echo "    macOS: brew services start postgresql"
  echo "    Ubuntu: sudo systemctl start postgresql"
  exit 1
fi

echo "✅ PostgreSQL is installed and running"

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
else
  echo "Backend dependencies already installed."
fi

if [ ! -f ".env" ]; then
  echo "Creating .env file..."
  cp .env.example .env
  echo ""
  echo "⚠️  IMPORTANT: Edit backend/.env and update DATABASE_URL with your PostgreSQL credentials"
  echo "    Example: DATABASE_URL=postgresql://username:password@localhost:5432/nautical_carpentry"
else
  echo ".env file already exists."
fi

if [ ! -d "uploads" ]; then
  echo "Creating uploads directory..."
  mkdir uploads
else
  echo "Uploads directory already exists."
fi

echo "Generating database migrations..."
npm run db:generate

echo ""
echo "⚠️  After updating .env, run: cd backend && npm run db:migrate"

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
else
  echo "Frontend dependencies already installed."
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Create PostgreSQL database: createdb nautical_carpentry"
echo "  2. Edit backend/.env with your DATABASE_URL"
echo "  3. Run migrations: cd backend && npm run db:migrate"
echo "  4. Start backend:  cd backend && npm run dev"
echo "  5. Start frontend: cd frontend && npm run dev"
echo ""
echo "Backend will run on http://localhost:3001"
echo "Frontend will run on http://localhost:3000"
