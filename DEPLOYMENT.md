# Deployment Guide: GitHub + Netlify

This guide will help you deploy your weather dashboard to GitHub and host it on Netlify for public access.

## Prerequisites
- GitHub account
- Netlify account
- Git installed on your computer

## Step 1: Prepare Your Local Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Weather Dashboard with documentation"
```

### 1.2 Update package.json for deployment
Make sure your build script is correct:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Step 2: Create GitHub Repository

### 2.1 Create Repository on GitHub
1. Go to [GitHub](https://github.com)
2. Click "New repository" (green button)
3. Name it: `weather-dashboard` (or your preferred name)
4. Add description: "Interactive historical weather data dashboard built with React and TypeScript"
5. Make it **Public** so anyone can see it
6. Don't initialize with README (you already have one)
7. Click "Create repository"

### 2.2 Connect Local Repository to GitHub
```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/weather-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

### Option A: Direct GitHub Integration (Recommended)

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/log in with GitHub account

2. **Import from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repositories
   - Select your `weather-dashboard` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
   - Click "Deploy site"

### Option B: Manual Deploy

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy dist folder**
   - Go to Netlify dashboard
   - Drag and drop the `dist` folder to the deploy area

## Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

## Step 5: Enable Continuous Deployment

With GitHub integration, Netlify will automatically:
- Deploy when you push to main branch
- Build preview deployments for pull requests
- Show build logs and status

## Environment Configuration

### Build Settings in Netlify
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

### Environment Variables (if needed later)
In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add any needed variables
3. Redeploy if variables are added

## Common Deployment Issues & Solutions

### Issue: Build Fails
**Solution:** Check build logs in Netlify
```bash
# Test build locally first
npm run build
```

### Issue: 404 on Refresh
**Solution:** The `netlify.toml` file handles SPA routing

### Issue: API Calls Fail
**Solution:** Check if API endpoints are accessible from production
- Open-Meteo API should work without changes

## Your Deployed URLs

After deployment, you'll get:
- **GitHub Repository:** `https://github.com/YOUR-USERNAME/weather-dashboard`
- **Live Site:** `https://YOUR-SITE-NAME.netlify.app`

## Sharing Your Project

### For Portfolio/Resume
```markdown
🌦️ **Weather Dashboard**
Live Demo: https://your-site.netlify.app
Source Code: https://github.com/your-username/weather-dashboard

Interactive historical weather data visualization built with React, TypeScript, and Recharts. Features responsive design, multiple chart types, and real-time API integration.
```

### For GitHub README Badges
Add these to your README.md:
```markdown
![Deploy Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)
![GitHub Stars](https://img.shields.io/github/stars/YOUR-USERNAME/weather-dashboard)
![GitHub Forks](https://img.shields.io/github/forks/YOUR-USERNAME/weather-dashboard)
```

## Monitoring & Analytics

### Netlify Analytics
- Site performance metrics
- Visitor analytics
- Form submissions (if added later)

### GitHub Insights
- Repository traffic
- Clone statistics
- Popular content

## Next Steps After Deployment

1. **Test thoroughly** - Check all features work in production
2. **Share the link** - Add to your portfolio, resume, LinkedIn
3. **Gather feedback** - Share with friends/colleagues for testing
4. **Monitor performance** - Use Netlify analytics
5. **Add features** - Continuous improvement based on feedback

## Troubleshooting

### Build Logs
Check Netlify build logs for specific errors:
1. Go to Netlify dashboard
2. Click on failed deployment
3. View build logs for error details

### Local Testing
Always test production build locally:
```bash
npm run build
npm run preview
```

### Network Issues
Ensure API endpoints work from different networks:
- Test on mobile data
- Test from different locations
- Check CORS policies

---

**You're now ready to deploy! Follow the steps above and your weather dashboard will be live for the world to see.** 🚀