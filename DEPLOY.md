# Quick Start: Railway Deployment

## Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Nautical Carpentry Knowledge Base"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy Backend to Railway

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Wait for provisioning (takes ~30 seconds)

4. **Configure Backend Service**
   - Click on your backend service
   - Go to "Variables" tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=3001
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     CORS_ORIGIN=*
     ```
   - Click "Settings" → "Networking"
   - Click "Generate Domain"
   - **Copy the domain URL** (e.g., `https://your-app.up.railway.app`)

5. **Wait for Deployment**
   - Check "Deployments" tab for progress
   - Should complete in 2-3 minutes
   - Migrations run automatically on start

## Step 3: Deploy Frontend to Vercel (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign up

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build**
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend.up.railway.app`
     (Use the domain from Step 2.4)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app is live!

## Step 4: Update CORS (Important!)

1. Go back to Railway
2. Click your backend service
3. Go to "Variables"
4. Update `CORS_ORIGIN` to your Vercel domain:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
5. Service will automatically redeploy

## Step 5: Test Your Application

Visit your Vercel URL and test:
- ✅ Create a Technical SOP entry
- ✅ Upload an image
- ✅ Create a Gallery item
- ✅ Search and filter
- ✅ View Technical Card details

## Costs

**Railway:**
- Hobby Plan: $5/month (500 hours execution)
- Includes PostgreSQL database

**Vercel:**
- Free tier (perfect for this app)
- 100GB bandwidth/month
- Unlimited deployments

**Total: ~$5/month**

## Troubleshooting

### Backend Won't Start
```bash
# Check logs in Railway dashboard
# Common issues:
# - DATABASE_URL not set correctly
# - Build failed (check npm install logs)
# - Port conflict (Railway sets PORT automatically)
```

### Frontend Can't Connect
```bash
# Verify VITE_API_URL is correct
# Check browser console for CORS errors
# Ensure CORS_ORIGIN matches Vercel domain
```

### Database Migrations Failed
```bash
# View deployment logs in Railway
# Migrations run automatically with: npm run db:migrate
# Manual trigger: railway run npm run db:migrate
```

## Alternative: Deploy Frontend to Railway Too

If you prefer everything on Railway:

1. Click "+ New" in Railway project
2. Select "GitHub Repo" (same repo)
3. Add these settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -p $PORT`
4. Add variables:
   ```
   VITE_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}
   ```
5. Generate domain for frontend service

## Support

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Issues? Check [RAILWAY.md](./RAILWAY.md) for detailed troubleshooting

---

**Your app is ready! 🚢⚓**
