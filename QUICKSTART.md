# Nautical Carpentry Knowledge Base

## Quick Start

### Option 1: Docker (Recommended) ⭐

**One command to rule them all:**

```bash
docker-compose up
```

Or use the helper script:

```bash
chmod +x start-docker.sh
./start-docker.sh
```

**That's it!** Access the app at http://localhost:3000

The Docker setup includes:

- ✅ PostgreSQL database (auto-configured)
- ✅ Backend API server
- ✅ Frontend application
- ✅ Database migrations run automatically

Stop with `Ctrl+C` or:

```bash
docker-compose down
```

See [DOCKER.md](DOCKER.md) for advanced usage.

### Option 2: Manual Setup

#### Prerequisites

- Node.js 18+
- PostgreSQL 14+ installed and running

### PostgreSQL Setup

Create a database:

```bash
createdb nautical_carpentry
```

Or using psql:

```bash
psql -U postgres
CREATE DATABASE nautical_carpentry;
\q
```

### Setup (First Time Only)

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

**Important:** After running setup, edit `backend/.env` and update your PostgreSQL connection:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/nautical_carpentry
```

Then run migrations:

```bash
cd backend
npm run db:migrate
cd ..
```

### Running the Application

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Then open your browser to: `http://localhost:3000`

### What's Included

- ✅ Node.js Express backend with TypeScript
- ✅ React frontend with Vite + TypeScript + Tailwind
- ✅ Drizzle ORM with SQLite database
- ✅ Technical SOP form with required fields
- ✅ Master search with filters
- ✅ Technical card UI
- ✅ Image upload support
- ✅ Gallery mode for general photos

### Key Features

1. **Technical SOP Mode**: Document techniques with required Location, Material, and Instructions
2. **Master Search**: Filter by Hardware + Material + Location
3. **Technical Cards**: Rich display with specs, logic, and step-by-step instructions
4. **Gallery Mode**: Simple photo gallery for general work

See [README.md](README.md) for complete documentation.
