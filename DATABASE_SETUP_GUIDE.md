# 🗄️ Simple Database Setup Guide for UniMoney Metrics

This guide will help you set up your database so the metrics dashboard works properly.

## 🎯 What We Need to Do

1. **Check if you have a Neon database** ✅ (You do!)
2. **Create the metrics tables** in your database
3. **Test the connection**

## 📋 Step-by-Step Setup

### Step 1: Check Your Database Connection

I can see you already have a Neon database with this connection string:
```
postgres://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 2: Create the Metrics Tables

**Option A: Using Neon Console (Easiest)**

1. **Go to [Neon Console](https://console.neon.tech)**
2. **Sign in** with your account
3. **Click on your project** (it should be named something like "neondb")
4. **Click "SQL Editor"** in the left sidebar
5. **Copy and paste this entire SQL code**:

```sql
-- UniMoney Metrics Tables Setup
-- This will create all the tables needed for the metrics dashboard

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create button_clicks table
CREATE TABLE IF NOT EXISTS button_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  button_id TEXT NOT NULL,
  button_text TEXT,
  page TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  start_time TIMESTAMP DEFAULT NOW() NOT NULL,
  end_time TIMESTAMP,
  pages_visited TEXT[],
  total_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  error_message TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_button_clicks_button_id ON button_clicks(button_id);
CREATE INDEX IF NOT EXISTS idx_button_clicks_page ON button_clicks(page);
CREATE INDEX IF NOT EXISTS idx_button_clicks_created_at ON button_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_success ON form_submissions(success);

-- Insert some sample data so you can see the dashboard working
INSERT INTO page_views (page, user_agent, ip_address, referrer) VALUES 
('/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1',NULL),
('/loan-dashboard','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1','/'),
('/metrics-dashboard','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1',NULL);

INSERT INTO button_clicks (button_id, button_text, page, user_agent, ip_address) VALUES 
('cta-button','Call to Action','/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1'),
('cta-button','Call to Action','/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1');

INSERT INTO form_submissions (form_type, success, error_message, user_agent, ip_address) VALUES 
('waitlist',true,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1'),
('data_acquisition',true,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1');

-- Success message
SELECT 'Metrics tables created successfully!' as status;
```

6. **Click "Run"** button
7. **You should see**: "Metrics tables created successfully!"

### Step 3: Test Your Metrics Dashboard

1. **Go to your website**
2. **Press `Ctrl + Shift + M`** or go to `/metrics-dashboard`
3. **Enter password**: `unimoney2024`
4. **You should now see the metrics dashboard with data!**

## 🔍 Troubleshooting

### If you get "Failed to load metrics" error:

1. **Check if tables were created**:
   - Go back to Neon Console
   - Click "Tables" in the left sidebar
   - You should see: `page_views`, `button_clicks`, `user_sessions`, `form_submissions`

2. **If tables don't exist**:
   - Go back to SQL Editor
   - Run the SQL code again

3. **If you get connection errors**:
   - Make sure your `.env.local` file has the correct DATABASE_URL
   - Check that the connection string is correct

### If you can't access Neon Console:

1. **Go to [neon.tech](https://neon.tech)**
2. **Sign in** with your account
3. **Find your project** in the dashboard
4. **Click on it** to open the console

## 🎯 What This Does

The SQL code creates:
- **4 tables** for tracking metrics
- **Indexes** for better performance
- **Sample data** so you can see the dashboard working immediately

## ✅ Success Checklist

- [ ] Opened Neon Console
- [ ] Ran the SQL code
- [ ] Saw "Metrics tables created successfully!"
- [ ] Can access metrics dashboard
- [ ] See sample data in the dashboard

## 🚀 Next Steps

Once your metrics dashboard is working:

1. **Test the tracking** - Click buttons, fill forms, visit pages
2. **Check the dashboard** - See your real data appear
3. **Customize the password** - Change it in your environment variables
4. **Deploy to Vercel** - Follow the Vercel deployment guide

---

**Need help?** The most common issue is not running the SQL code in the Neon Console. Make sure you copy the entire SQL code and click "Run"! 