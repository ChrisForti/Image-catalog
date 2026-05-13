# Docker Deployment Guide

This guide covers running the Nautical Carpentry Knowledge Base in Docker containers.

## Prerequisites

- Docker 20.10+ installed
- Docker Compose 2.0+ installed

## Quick Start (Development)

Start all services with one command:

```bash
docker-compose up
```

Or run in detached mode:

```bash
docker-compose up -d
```

Access the application:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## Services

The Docker setup includes three services:

1. **postgres** - PostgreSQL 16 database
2. **backend** - Node.js/Express API server
3. **frontend** - Vite development server (dev) or Nginx (production)

## Development Mode

### Start Services

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up backend

# Rebuild and start
docker-compose up --build
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database!)
docker-compose down -v
```

### Access Container Shell

```bash
# Backend container
docker exec -it nautical-backend sh

# PostgreSQL container
docker exec -it nautical-db psql -U nautical_user -d nautical_carpentry
```

## Production Deployment

### Build Production Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### Configure Environment

1. Copy environment template:

```bash
cp .env.docker .env
```

2. Edit `.env` and set secure passwords:

```bash
POSTGRES_PASSWORD=your_secure_password_here
```

### Start Production Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Access the application:

- **Frontend**: http://localhost:80 (or your configured port)
- **Backend API**: http://localhost:3001

## Database Management

### Run Migrations

Migrations run automatically on backend startup. To run manually:

```bash
docker-compose exec backend npm run db:migrate
```

### Access Database

```bash
# Using docker exec
docker-compose exec postgres psql -U nautical_user -d nautical_carpentry

# From host (if PostgreSQL client installed)
psql -h localhost -U nautical_user -d nautical_carpentry
```

### Database Backup

```bash
# Backup to file
docker-compose exec postgres pg_dump -U nautical_user nautical_carpentry > backup.sql

# Restore from file
docker-compose exec -T postgres psql -U nautical_user -d nautical_carpentry < backup.sql
```

### View Database in Drizzle Studio

```bash
docker-compose exec backend npm run db:studio
```

Open https://local.drizzle.studio in your browser.

## Volume Management

### List Volumes

```bash
docker volume ls | grep nautical
```

### Inspect Volume

```bash
docker volume inspect image-catalog_postgres_data
```

### Backup Volumes

```bash
# Backup PostgreSQL data
docker run --rm -v image-catalog_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data

# Backup uploads
docker run --rm -v $(pwd)/backend/uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-backup.tar.gz /data
```

### Restore Volumes

```bash
# Restore PostgreSQL data
docker run --rm -v image-catalog_postgres_data:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/postgres-backup.tar.gz --strip 1"
```

## Troubleshooting

### Backend Can't Connect to Database

**Error**: `ECONNREFUSED` or `connection refused`

**Solution**:

1. Check if PostgreSQL is healthy:
   ```bash
   docker-compose ps
   ```
2. View PostgreSQL logs:
   ```bash
   docker-compose logs postgres
   ```
3. Ensure backend waits for database:
   ```bash
   docker-compose up --force-recreate
   ```

### Port Already in Use

**Error**: `port is already allocated`

**Solution**:

1. Change ports in `docker-compose.yml` or `.env`:
   ```yaml
   ports:
     - "3002:3001" # Use different host port
   ```
2. Or stop conflicting service:
   ```bash
   lsof -ti:3001 | xargs kill
   ```

### Database Migration Failed

**Solution**:

1. Check backend logs:
   ```bash
   docker-compose logs backend
   ```
2. Run migrations manually:
   ```bash
   docker-compose exec backend npm run db:migrate
   ```
3. If schema is corrupted, reset:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### Frontend Can't Reach Backend

**Solution**:

1. Check backend is running:
   ```bash
   docker-compose ps backend
   ```
2. Test backend API:
   ```bash
   curl http://localhost:3001/api/health
   ```
3. Check nginx configuration (production):
   ```bash
   docker-compose exec frontend nginx -t
   ```

### Out of Disk Space

**Solution**:

1. Remove unused images:
   ```bash
   docker image prune -a
   ```
2. Remove unused volumes:
   ```bash
   docker volume prune
   ```
3. Clean up containers:
   ```bash
   docker system prune -a
   ```

## Production Best Practices

### Security

1. **Change default passwords** in `.env`
2. **Use secrets management** for production:
   ```yaml
   secrets:
     postgres_password:
       file: ./secrets/postgres_password.txt
   ```
3. **Enable SSL** for PostgreSQL connections
4. **Use environment-specific configs** - never commit `.env` files
5. **Scan images** for vulnerabilities:
   ```bash
   docker scan nautical-backend
   ```

### Performance

1. **Resource limits** in docker-compose:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: "2"
         memory: 2G
   ```
2. **Connection pooling** - already configured in postgres client
3. **Nginx caching** - configured in `nginx.conf`
4. **Health checks** - configured for postgres

### Monitoring

1. **View container stats**:
   ```bash
   docker stats
   ```
2. **Check health status**:
   ```bash
   docker-compose ps
   ```
3. **Export logs** for analysis:
   ```bash
   docker-compose logs > app-logs.txt
   ```

### Backup Strategy

1. **Daily database backups**:
   ```bash
   # Cron job
   0 2 * * * docker-compose exec postgres pg_dump -U nautical_user nautical_carpentry > /backups/db-$(date +\%Y\%m\%d).sql
   ```
2. **Volume snapshots** if using cloud providers
3. **Offsite backup storage** (S3, Google Cloud Storage, etc.)

## Cloud Deployment

### Docker Hub

```bash
# Tag images
docker tag nautical-backend username/nautical-backend:latest
docker tag nautical-frontend username/nautical-frontend:latest

# Push to registry
docker push username/nautical-backend:latest
docker push username/nautical-frontend:latest
```

### Deploy to Cloud Providers

**DigitalOcean App Platform**:

- Use `docker-compose.prod.yml`
- Configure environment variables in dashboard
- Add managed PostgreSQL database

**AWS ECS/Fargate**:

- Push images to ECR
- Create task definitions from docker-compose
- Use RDS for PostgreSQL

**Google Cloud Run**:

- Build and push to GCR
- Deploy each service separately
- Use Cloud SQL for PostgreSQL

**Railway/Render**:

- Connect GitHub repository
- Auto-deploys from docker-compose.yml
- Provides managed PostgreSQL

## Development Tips

### Hot Reload

Source code is mounted as volumes in development mode:

- Edit `backend/src/*` - backend restarts automatically
- Edit `frontend/src/*` - frontend hot-reloads

### Install New Dependencies

```bash
# Backend
docker-compose exec backend npm install package-name
docker-compose restart backend

# Frontend
docker-compose exec frontend npm install package-name
docker-compose restart frontend
```

### Run Tests

```bash
docker-compose exec backend npm test
docker-compose exec frontend npm test
```

## Useful Commands

```bash
# Remove all containers and volumes (fresh start)
docker-compose down -v && docker-compose up --build

# View all container logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Execute command in container
docker-compose exec backend npm run db:generate

# Scale services (if supported)
docker-compose up --scale backend=3

# Check resource usage
docker stats
```
