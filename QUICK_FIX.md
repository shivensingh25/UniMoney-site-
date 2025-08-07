# 🚀 Quick Fix for Metrics Dashboard

## Step 1: Create .env.local File

1. **Open your UniMoney folder** in File Explorer
2. **Right-click** → **New** → **Text Document**
3. **Name it** `.env.local` (exactly like that, with the dot)
4. **Open the file** and paste this:

```
DATABASE_URL=postgresql://neondb_owner:npg_v31ZSOUJdbQq@ep-red-night-a1yknjbc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
METRICS_PASSWORD=unimoney2024
```

5. **Save the file**

## Step 2: Test Database

1. **Start your website**: `npm run dev`
2. **Open browser** and go to: `http://localhost:3000/api/metrics/test`
3. **You should see** a JSON response with database info

## Step 3: Access Metrics Dashboard

1. **Go to your website**: `http://localhost:3000`
2. **Press** `Ctrl + Shift + M`
3. **Enter password**: `unimoney2024`
4. **You should see the metrics dashboard!**

## If It Still Doesn't Work

**Check if tables exist:**
1. Go to [Neon Console](https://console.neon.tech)
2. Click your project
3. Click "SQL Editor"
4. Run this SQL:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

**If no tables exist, run this:**

```sql
-- Create tables
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS button_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  button_id TEXT NOT NULL,
  button_text TEXT,
  page TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  error_message TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add sample data
INSERT INTO page_views (page, user_agent, ip_address) VALUES 
('/', 'Mozilla/5.0', '127.0.0.1'),
('/loan-dashboard', 'Mozilla/5.0', '127.0.0.1');

INSERT INTO button_clicks (button_id, button_text, page, user_agent, ip_address) VALUES 
('cta-button', 'Call to Action', '/', 'Mozilla/5.0', '127.0.0.1');

INSERT INTO form_submissions (form_type, success, user_agent, ip_address) VALUES 
('waitlist', true, 'Mozilla/5.0', '127.0.0.1');
```

## That's It! 

Your metrics dashboard should now work. If you still have issues, the problem is likely:
1. Wrong DATABASE_URL in .env.local
2. Tables don't exist in database
3. Website not running (`npm run dev`)

**Need help?** Tell me what you see when you visit `/api/metrics/test` 