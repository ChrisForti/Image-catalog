# GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click "+ New" → "Database" → "PostgreSQL"
5. In your backend service, add variables:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   CORS_ORIGIN=https://YOUR_USERNAME.github.io
   ```
6. Go to Settings → Networking → "Generate Domain"
7. **Copy your backend URL** (e.g., `https://your-app.up.railway.app`)

### Step 2: Configure GitHub Pages

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. Go to your GitHub repository
3. Click **Settings** → **Pages**
4. Under "Build and deployment":
   - Source: **GitHub Actions**

5. Click **Settings** → **Secrets and variables** → **Actions**
6. Click "New repository secret"
7. Add secret:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.up.railway.app` (from Step 1.7)

### Step 3: Set Base Path (Important!)

If your repo is NOT named `YOUR_USERNAME.github.io`, you need to set the base path.

**Example:**
- Repo: `github.com/john/nautical-app`
- GitHub Pages URL: `john.github.io/nautical-app`
- Base path needed: `/nautical-app`

Add another secret:
- Name: `VITE_BASE_PATH`
- Value: `/YOUR_REPO_NAME` (e.g., `/nautical-app`)

**Skip this if:**
- Your repo is named `YOUR_USERNAME.github.io` (then base path is `/`)

### Step 4: Update Workflow File

The workflow file is already created at `.github/workflows/deploy.yml`. Update it to include the base path:

```yaml
- name: Build
  run: cd frontend && npm run build
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
    VITE_BASE_PATH: ${{ secrets.VITE_BASE_PATH || '/' }}
```

### Step 5: Deploy!

1. Push your changes:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push
   ```

2. Go to **Actions** tab in GitHub
3. Watch the deployment (takes 2-3 minutes)
4. Your site will be live at:
   - User site: `https://YOUR_USERNAME.github.io`
   - Project site: `https://YOUR_USERNAME.github.io/YOUR_REPO`

### Step 6: Update CORS

Go back to Railway and update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://YOUR_USERNAME.github.io
```

## Testing

Visit your GitHub Pages URL and test:
- ✅ Create Technical SOP
- ✅ Upload images
- ✅ Create Gallery items
- ✅ Search and filter

## Troubleshooting

### 404 on page refresh
GitHub Pages + React Router issue. The workflow already includes a fix (copies index.html to 404.html), but if you still see issues, add this to your build step:

```bash
cp dist/index.html dist/404.html
```

### API calls fail
- Check browser console for CORS errors
- Verify `VITE_API_URL` secret is correct
- Ensure Railway `CORS_ORIGIN` matches GitHub Pages domain

### Blank page after deployment
- Check if you need `VITE_BASE_PATH`
- Verify the base path in vite.config.ts
- Check browser console for asset loading errors

### Images/assets don't load
- If using project site (`username.github.io/repo`), ensure `VITE_BASE_PATH=/repo` is set
- Check that assets are built correctly in the Actions log

## Costs

- **GitHub Pages**: FREE ✅
- **Railway Backend**: $5/month
- **Total: $5/month**

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build frontend
cd frontend
npm install
VITE_API_URL=https://your-backend.up.railway.app npm run build

# Deploy using gh-pages package
npm install -g gh-pages
gh-pages -d dist
```

## Local Development

Create `frontend/.env.local`:
```
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

## Support

- GitHub Pages Docs: https://docs.github.com/pages
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html#github-pages
- Railway Docs: https://docs.railway.app

---

**Your app is live! 🚀**
