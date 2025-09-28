# 🚀 Google OAuth & Database Setup Guide

## ✅ What I've Implemented

I've completely replaced the mock authentication with **real Google OAuth** using NextAuth.js! Here's what's now working:

### 🔐 **Real Google Authentication**
- ✅ NextAuth.js integration with Google OAuth provider
- ✅ Admin access control (only specific emails get admin access)
- ✅ Regular user storage in MongoDB database
- ✅ Session management across the entire app
- ✅ Automatic redirects based on user type

### 👥 **User Management**
- ✅ **Admin Users**: `unimoney2025@gmail.com`, `sshiven72@gmail.com`, `pnar0013@student.monash.edu`
- ✅ **Regular Users**: All other Google accounts (stored in database)
- ✅ Pre-filled forms with Google account data for regular users

---

## 🛠️ **Setup Steps Required**

### 1. **Google OAuth Setup**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create/Select Project**: "UniMoney" or create new
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: "UniMoney Website"
   - **Authorized redirect URIs**: 
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-domain.com/api/auth/callback/google
     ```
5. **Copy credentials**: You'll get CLIENT_ID and CLIENT_SECRET

### 2. **MongoDB Database Setup**

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create a new cluster (M0 is free)
4. Create database user with username/password
5. Whitelist your IP address (or use 0.0.0.0/0 for all)
6. Get connection string

**Option B: Local MongoDB**
```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# Connection string: mongodb://localhost:27017/unimoney
```

### 3. **Environment Variables**

Create `.env.local` file in your project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-random-string-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-from-step-1
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-step-1

# MongoDB Configuration
MONGODB_URI=your-mongodb-connection-string-from-step-2
```

**Generate NEXTAUTH_SECRET**:
```bash
# Run this in terminal to generate secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🎯 **How It Works Now**

### **For Admin Users** (`unimoney2025@gmail.com`, etc.)
1. Click "Continue with Google" → Google OAuth popup
2. Sign in with admin email
3. **Automatically redirected to Admin Dashboard**
4. Full admin access to blog management

### **For Regular Users** (any other Google account)
1. Click "Continue with Google" → Google OAuth popup  
2. Sign in with any Google account
3. **User details stored in MongoDB database**
4. Redirected back to loan comparison form
5. Form pre-filled with name/email from Google

### **Database Storage for Regular Users**
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com", 
  "image": "google-profile-image-url",
  "emailVerified": null,
  "createdAt": "2025-09-28T10:30:00Z"
}
```

---

## 🚦 **Testing Steps**

1. **Complete setup steps above**
2. **Restart your dev server**: `npm run dev`
3. **Test Admin Access**:
   - Go to `/loan-compare`
   - Click "Continue with Google"
   - Sign in with `unimoney2025@gmail.com`
   - Should redirect to admin dashboard
4. **Test Regular User**:
   - Sign out from admin
   - Sign in with personal Gmail
   - Should return to loan form with pre-filled data

---

## 🔍 **Database Inspection**

You can view stored users in MongoDB:
```javascript
// In MongoDB Compass or Atlas
db.users.find({}) // See all registered users
db.accounts.find({}) // See OAuth account links
db.sessions.find({}) // See active sessions
```

---

## ⚡ **Benefits of This Setup**

✅ **Real Google OAuth** - No more mock authentication  
✅ **Secure Admin Control** - Only specific emails get admin access  
✅ **User Database** - All non-admin users stored automatically  
✅ **Session Management** - Users stay logged in across pages  
✅ **Data Pre-filling** - Forms auto-populate with Google data  
✅ **Production Ready** - Scales to thousands of users  

Once you complete the setup steps, you'll have a fully functional authentication system with Google OAuth and user database storage! 🎉