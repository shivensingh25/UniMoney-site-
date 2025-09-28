# 🚀 Quick Google OAuth Setup

## ⚡ **Immediate Fix Needed**

The error occurs because Google OAuth credentials are missing. Here's how to fix it in **5 minutes**:

### 1. **Get Google OAuth Credentials** (3 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client IDs"**
5. Choose **"Web application"**
6. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. **Copy the Client ID and Client Secret**

### 2. **Update Environment Variables** (1 minute)

Replace these lines in your `.env.local` file:
```bash
# Replace these with your actual values from step 1
GOOGLE_CLIENT_ID=your-actual-client-id-from-google
GOOGLE_CLIENT_SECRET=your-actual-client-secret-from-google
```

### 3. **Restart Development Server** (1 minute)

```bash
# Stop the current server (Ctrl+C) then:
npm run dev
```

## 🎯 **That's It!**

After this setup:
- ✅ Google OAuth will work properly
- ✅ Admin emails (`unimoney2025@gmail.com`, etc.) will get admin access
- ✅ Other users will be handled with JWT sessions (no database needed yet)
- ✅ No more "undefined" errors

## 🔍 **Testing**

1. Go to `/loan-compare`
2. Click "Continue with Google"
3. Should see Google sign-in popup
4. Sign in with `unimoney2025@gmail.com` → Goes to admin dashboard
5. Sign in with any other Gmail → Returns to loan form

---

**Database setup is optional for now** - users will be handled with JWT tokens until you set up MongoDB later!