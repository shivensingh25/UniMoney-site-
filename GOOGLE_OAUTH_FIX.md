# 🚨 **Immediate Action Required: Google OAuth Setup**

## ❌ **Current Issue**
You're seeing a Google 400 error because the OAuth credentials are not configured.

## ✅ **Quick Solution (5 minutes)**

### **Step 1: Get Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project called "UniMoney"
3. Go to **APIs & Services** → **Credentials**
4. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client IDs"**
5. Application type: **"Web application"**
6. Name: "UniMoney Website"
7. **Authorized redirect URIs**: Add this exact URL:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
8. Click **"Create"**
9. **Copy the Client ID and Client Secret**

### **Step 2: Update Your .env.local File**
Replace these lines in your `.env.local` file with the actual values from step 1:

```bash
# Replace these with your REAL values from Google Cloud Console
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-actual-secret-here
```

### **Step 3: Restart Development Server**
```bash
# Stop current server (Ctrl+C) then restart:
npm run dev
```

## 🎯 **Alternative: Use Skip Sign In**
If you want to test the loan form without setting up Google OAuth right now:
1. Click **"Skip Sign In"** on the loan compare page
2. Fill out the form normally
3. Set up Google OAuth later when ready

## 🔍 **How to Know It's Working**
After setup:
- Click "Continue with Google"
- Should see Google's actual sign-in popup (not a 400 error)
- Admin emails go to dashboard, others return to form

---
**The 400 error will disappear once you add real Google OAuth credentials!**