# Quick Deploy Guide for Image-catalog

## Your Setup

- **GitHub Repo**: `ChrisForti/Image-catalog`
- **GitHub Pages URL**: `https://chrisforti.github.io/Image-catalog`
- **Base Path**: `/Image-catalog` (required for project site)

## Step 1: Push to GitHub (if not done yet)

```bash
# Add remote if not added
git remote add origin git@github.com:ChrisForti/Image-catalog.git

# Or if already added, verify:
git remote -v

# Push your code
git add .
git commit -m "Setup for Railway + GitHub Pages deployment"
git push -u origin main
```

## Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and login with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **`ChrisForti/Image-catalog`**
5. Railway will detect the Node.js backend

### Add PostgreSQL Database

1. In the Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Wait ~30 seconds for provisioning

### Configure Backend Environment Variables

Click on your backend service → **"Variables"** tab:

```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=${{Postgres.DATABASE_URL}}
CORS_ORIGIN=https://chrisforti.github.io
```

### Generate Public Domain

1. Click on backend service → **"Settings"**
2. Go to **"Networking"** section
3. Click **"Generate Domain"**
4. **COPY THIS URL** - you'll need it for GitHub Pages
   - Example: `https://image-catalog-production-abc123.up.railway.app`

## Step 3: Configure GitHub Pages

### Enable GitHub Pages

1. Go to `https://github.com/ChrisForti/Image-catalog/settings/pages`
2. Under **"Build and deployment"**:
   - Source: **GitHub Actions**

### Add Repository Secrets

1. Go to `https://github.com/ChrisForti/Image-catalog/settings/secrets/actions`
2. Click **"New repository secret"** and add:

**Secret 1:**

- Name: `VITE_API_URL`
- Value: `https://your-backend.up.railway.app` (from Step 2)

**Secret 2:**

- Name: `VITE_BASE_PATH`
- Value: `/Image-catalog`

## Step 4: Deploy!

```bash
# Commit the workflow file if not done
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages workflow"
git push
```

The GitHub Action will:

1. Build your frontend
2. Deploy to GitHub Pages
3. Available at: **https://chrisforti.github.io/Image-catalog**

Check progress: `https://github.com/ChrisForti/Image-catalog/actions`

## Step 5: Update Railway CORS

Once you have your GitHub Pages URL, update Railway:

1. Go to Railway backend service → **"Variables"**
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://chrisforti.github.io
   ```
3. Service will auto-redeploy (~1 minute)

## Step 6: Test Your App!

Visit: **https://chrisforti.github.io/Image-catalog**

Test:

- ✅ Create a Technical SOP entry
- ✅ Upload an image
- ✅ Create a Gallery item
- ✅ Search and filter work

## Local Development

Create `backend/.env`:

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://nautical_user:nautical_pass@localhost:5432/nautical_carpentry
```

Create `frontend/.env.local`:

```bash
VITE_API_URL=http://localhost:3001
```

Run locally:

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000

## Costs

- **Railway**: $5/month (includes PostgreSQL)
- **GitHub Pages**: FREE
- **Total**: $5/month

## Troubleshooting

### Frontend shows blank page

- Check browser console (F12)
- Verify `VITE_BASE_PATH=/Image-catalog` is set in GitHub secrets
- Check Actions tab for build errors

### API calls fail

- Verify `VITE_API_URL` in GitHub secrets matches Railway domain
- Check Railway logs for backend errors
- Verify `CORS_ORIGIN` in Railway includes full GitHub Pages URL

### Database connection error

- Ensure `DATABASE_URL=${{Postgres.DATABASE_URL}}` is set
- Check PostgreSQL service is running in Railway
- View backend logs for connection details

### Railway deployment fails

- Check that `railway.toml` and `nixpacks.toml` are in repo root
- Verify `backend/package.json` exists
- Check Railway build logs for specific errors

## Quick Links

- **Your GitHub Repo**: https://github.com/ChrisForti/Image-catalog
- **GitHub Pages**: https://chrisforti.github.io/Image-catalog
- **GitHub Actions**: https://github.com/ChrisForti/Image-catalog/actions
- **Railway Dashboard**: https://railway.app/dashboard

---

**Ready to go! 🚢**
