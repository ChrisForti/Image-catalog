# PostgreSQL Database Setup

This project uses PostgreSQL as the database. Follow these steps to set it up.

## Prerequisites

PostgreSQL 14 or higher must be installed on your system.

### Install PostgreSQL

**macOS (using Homebrew):**

```bash
brew install postgresql@16
brew services start postgresql
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

## Database Creation

### Option 1: Command Line (Recommended)

```bash
# Create database using createdb command
createdb nautical_carpentry

# Or create with a specific user
createdb -U postgres nautical_carpentry
```

### Option 2: Using psql

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE nautical_carpentry;

# Create a dedicated user (optional but recommended)
CREATE USER nautical_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE nautical_carpentry TO nautical_user;

# Exit psql
\q
```

## Configure Connection

Edit `backend/.env` with your database credentials:

```bash
# Using default postgres user
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/nautical_carpentry

# Using dedicated user (recommended for production)
DATABASE_URL=postgresql://nautical_user:your_secure_password@localhost:5432/nautical_carpentry

# Remote database
DATABASE_URL=postgresql://username:password@remote-host:5432/nautical_carpentry
```

### Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

- **user**: PostgreSQL username
- **password**: User password
- **host**: Server hostname (usually `localhost`)
- **port**: PostgreSQL port (default: `5432`)
- **database**: Database name

## Run Migrations

After configuring the connection string:

```bash
cd backend

# Generate migration files from schema
npm run db:generate

# Apply migrations to database
npm run db:migrate
```

## Verify Setup

```bash
# Check if database exists
psql -U postgres -l | grep nautical_carpentry

# Connect to database and list tables
psql -U postgres -d nautical_carpentry
\dt
```

You should see `techniques` and `gallery_items` tables.

## Database Management

### View Database in Drizzle Studio

```bash
cd backend
npm run db:studio
```

This opens a web-based database viewer at `https://local.drizzle.studio`

### Backup Database

```bash
pg_dump -U postgres nautical_carpentry > backup.sql
```

### Restore Database

```bash
psql -U postgres nautical_carpentry < backup.sql
```

### Reset Database

```bash
# Drop and recreate
dropdb nautical_carpentry
createdb nautical_carpentry

# Run migrations again
cd backend
npm run db:migrate
```

## Production Considerations

### Managed PostgreSQL Services

For production, consider using managed PostgreSQL:

- **Supabase**: Free tier with 500MB database
- **Railway**: PostgreSQL with automatic backups
- **Neon**: Serverless PostgreSQL
- **AWS RDS**: Enterprise-grade PostgreSQL
- **DigitalOcean Managed Databases**: Simple PostgreSQL hosting
- **Heroku Postgres**: Easy PostgreSQL add-on

### Security Best Practices

1. **Never commit .env files** - Already in `.gitignore`
2. **Use strong passwords** - Generate random passwords for production
3. **Create dedicated users** - Don't use the `postgres` superuser
4. **Enable SSL** - For remote connections, use SSL:
   ```bash
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   ```
5. **Restrict network access** - Use firewall rules to limit database access
6. **Regular backups** - Set up automated backups for production

### Connection Pooling

For production with multiple concurrent users, consider using connection pooling:

```typescript
// backend/src/db/index.ts
const client = postgres(connectionString, {
  max: 10, // Maximum pool size
  idle_timeout: 20,
  connect_timeout: 10,
});
```

## Troubleshooting

### Connection refused

```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

### Authentication failed

- Check username and password in `DATABASE_URL`
- Verify user exists: `psql -U postgres -c "\du"`
- Reset password if needed:
  ```sql
  ALTER USER username WITH PASSWORD 'new_password';
  ```

### Database does not exist

```bash
# List all databases
psql -U postgres -l

# Create missing database
createdb nautical_carpentry
```

### Permission denied

```sql
-- Grant privileges to user
GRANT ALL PRIVILEGES ON DATABASE nautical_carpentry TO your_user;
GRANT ALL ON SCHEMA public TO your_user;
```

## Migration from SQLite

If you previously used SQLite, you'll need to:

1. Export your SQLite data
2. Create PostgreSQL database
3. Run migrations
4. Import data into PostgreSQL

Contact support or see migration tools like `pgloader` for automated migration.
