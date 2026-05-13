# Railway Deployment Guide

## Overview

Deploy the Nautical Carpentry Knowledge Base to Railway with PostgreSQL database.

## Prerequisites

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Code pushed to GitHub repository

## Deployment Steps

### 1. Create New Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your `image-catalog` repository

### 2. Add PostgreSQL Database

1. In your Railway project dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will provision a PostgreSQL database
4. Copy the `DATABASE_URL` from the database service variables

### 3. Configure Backend Service

In your backend service settings, add these environment variables:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**Important**: Railway automatically references other services using `${{ServiceName.VARIABLE}}` syntax.

### 4. Configure Domains

1. Click on your backend service
2. Go to "Settings" → "Networking"
3. Click "Generate Domain" to get a public URL
4. Note the domain (e.g., `your-app.up.railway.app`)

### 5. Update Frontend for Production

The frontend should be deployed to Vercel or Netlify. Update the API URL:

**For Vercel/Netlify:**

- Set environment variable: `VITE_API_URL=https://your-backend.up.railway.app`

**Alternative: Deploy frontend on Railway too:**

1. Create a new service in Railway
2. Select the same GitHub repo
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.up.railway.app`

### 6. Run Database Migrations

After deployment, run migrations:

1. Open Railway dashboard
2. Click on your backend service
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Open "View Logs"
6. The migrations should run automatically on start

Or manually trigger:

```bash
railway run npm run db:migrate
```

## Environment Variables Reference

### Backend Service

```
NODE_ENV=production
PORT=3001
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Frontend Service (if deploying on Railway)

```
VITE_API_URL=https://your-backend.up.railway.app
```

## File Upload Configuration

Railway provides persistent storage through volumes. The `uploads` directory will persist across deployments if you configure a volume:

1. Go to backend service settings
2. Click "Volumes"
3. Add volume mount: `/app/backend/uploads`

## Monitoring & Logs

- View logs in Railway dashboard under "Deployments"
- Check PostgreSQL metrics in database service
- Monitor resource usage in "Metrics" tab

## Cost Estimates

Railway offers:

- **Hobby Plan**: $5/month (500 hours of usage)
- **Pro Plan**: $20/month (unlimited)
- PostgreSQL database included in plan

## Troubleshooting

### Build Fails

- Check that `package.json` is in the backend directory
- Verify Node.js version compatibility (20.x)
- Check build logs for specific errors

### Database Connection Issues

- Verify `DATABASE_URL` is correctly set
- Check that PostgreSQL service is running
- Ensure migrations ran successfully

### Frontend Can't Connect to Backend

- Verify backend domain is generated and accessible
- Check CORS settings in backend
- Ensure `VITE_API_URL` points to correct backend URL

## Alternative: Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```
6. Deploy!

This approach is recommended as Vercel specializes in frontend deployments.

## Useful Commands

### Railway CLI

Install Railway CLI:

```bash
npm i -g @railway/cli
```

Login:

```bash
railway login
```

Link to project:

```bash
railway link
```

View logs:

```bash
railway logs
```

Run migrations:

```bash
railway run npm run db:migrate
```

## Production Checklist

- [ ] PostgreSQL database provisioned on Railway
- [ ] Backend deployed with correct environment variables
- [ ] Database migrations executed successfully
- [ ] Frontend deployed (Railway/Vercel/Netlify)
- [ ] Frontend `VITE_API_URL` points to backend
- [ ] CORS configured for frontend domain
- [ ] Test creating a Technical SOP entry
- [ ] Test uploading images
- [ ] Test Gallery functionality
- [ ] Verify search and filters work

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
