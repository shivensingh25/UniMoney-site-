# Vercel Deployment Guide for UniMoney

This guide will help you deploy your UniMoney website with metrics tracking to Vercel.

## 🚀 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Neon Database**: You should have a Neon PostgreSQL database set up

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add metrics dashboard and tracking system"
   git push origin main
   ```

2. **Ensure these files are in your repository**:
   - ✅ `lib/db/migrations/0001_metrics_tables.sql`
   - ✅ `pages/api/metrics/track.ts`
   - ✅ `pages/api/metrics/data.ts`
   - ✅ `pages/api/metrics/auth.ts`
   - ✅ `pages/metrics-dashboard.tsx`
   - ✅ `lib/metrics.ts`
   - ✅ `setup-metrics-tables.sql`

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (or leave empty)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Set Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

#### Required Environment Variables

```bash
# Database Configuration
DATABASE_URL=postgres://your_neon_connection_string_here

# Metrics Dashboard Password (Optional - defaults to 'unimoney2024')
METRICS_PASSWORD=your_secure_password_here
```

#### How to Get Your DATABASE_URL

1. **Go to [Neon Console](https://console.neon.tech)**
2. **Select your project**
3. **Go to "Connection Details"**
4. **Copy the connection string** (it looks like):
   ```
   postgres://username:password@host/database?sslmode=require
   ```

### Step 4: Set Up Database Tables

After deployment, you need to create the metrics tables in your database:

#### Option A: Using Neon Console (Recommended)

1. **Go to [Neon Console](https://console.neon.tech)**
2. **Select your project**
3. **Click "SQL Editor"**
4. **Copy and paste the contents of `setup-metrics-tables.sql`**
5. **Click "Run"**

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Run the migration**:
   ```bash
   vercel env pull .env.local
   node scripts/run-migration.js
   ```

### Step 5: Test Your Deployment

1. **Visit your deployed site**: `https://your-project.vercel.app`
2. **Test the metrics dashboard**:
   - Press `Ctrl + Shift + M` or go to `/metrics-dashboard`
   - Enter password: `unimoney2024` (or your custom password)
   - You should see the metrics dashboard with sample data

## 🔧 Configuration Details

### Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Neon database connection string | ✅ Yes | - |
| `METRICS_PASSWORD` | Password for metrics dashboard | ❌ No | `unimoney2024` |

### Database Tables Created

The deployment will create these tables:
- `page_views` - Tracks page visits
- `button_clicks` - Tracks button interactions  
- `user_sessions` - Tracks user sessions
- `form_submissions` - Tracks form submissions

## 🎯 Post-Deployment Checklist

- [ ] Environment variables are set in Vercel
- [ ] Database tables are created
- [ ] Metrics dashboard is accessible
- [ ] Password protection is working
- [ ] Sample data is visible
- [ ] All tracking is working

## 🔍 Troubleshooting

### Common Issues

#### 1. "Failed to load metrics" Error
**Cause**: Database tables don't exist
**Solution**: Run the SQL from `setup-metrics-tables.sql` in your database

#### 2. Database Connection Error
**Cause**: Wrong DATABASE_URL
**Solution**: Check your Neon connection string in Vercel environment variables

#### 3. Build Errors
**Cause**: Missing dependencies
**Solution**: Ensure all dependencies are in `package.json`

#### 4. Metrics Dashboard Not Loading
**Cause**: API routes not working
**Solution**: Check Vercel function logs in the dashboard

### Debugging Steps

1. **Check Vercel Function Logs**:
   - Go to your Vercel dashboard
   - Click on your project
   - Go to "Functions" tab
   - Check for errors in `/api/metrics/*` functions

2. **Test Database Connection**:
   - Use the Neon console to test your connection string
   - Ensure the database is accessible

3. **Verify Environment Variables**:
   - Check that all environment variables are set in Vercel
   - Ensure they're correctly formatted

## 🔒 Security Considerations

### For Production

1. **Change Default Password**:
   ```bash
   METRICS_PASSWORD=your_very_secure_password_here
   ```

2. **Use Environment Variables**:
   - Never hardcode passwords in your code
   - Always use environment variables for sensitive data

3. **Database Security**:
   - Use connection pooling for better performance
   - Enable SSL connections
   - Regularly rotate database credentials

## 📊 Monitoring Your Deployment

### Vercel Analytics

1. **Enable Vercel Analytics** in your project settings
2. **Monitor performance** and user behavior
3. **Set up alerts** for errors

### Custom Metrics

Your metrics dashboard will track:
- Page views
- Button clicks (especially CTA button)
- Form submissions
- Conversion rates
- User sessions

## 🚀 Next Steps

After successful deployment:

1. **Test all functionality** thoroughly
2. **Monitor metrics** for a few days
3. **Optimize based on data** from the dashboard
4. **Set up custom domain** if needed
5. **Configure CI/CD** for automatic deployments

## 📞 Support

If you encounter issues:

1. **Check Vercel documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Check Neon documentation**: [neon.tech/docs](https://neon.tech/docs)
3. **Review function logs** in Vercel dashboard
4. **Test locally** before deploying

---

**Happy Deploying! 🎉** 