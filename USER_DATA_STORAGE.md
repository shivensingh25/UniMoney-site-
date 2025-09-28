# 🗄️ Where Your Google User Data Is Stored

## 📍 **Current Storage Status**

### **Right Now: JWT Tokens Only (No Database)**

Your Google authentication is working, but user data is **NOT permanently stored**. Here's exactly where it lives:

### **1. JWT Session Tokens** ⏳
**Location**: User's browser (httpOnly cookies)  
**Duration**: Until browser session expires  
**Contains**:
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "image": "https://lh3.googleusercontent.com/photo.jpg",
  "isAdmin": false,
  "id": "google-user-id"
}
```

### **2. Console Logs** 📝
**Location**: Your terminal/server logs  
**Contains**: Sign-in events
```bash
User signed in: john@gmail.com (New user: true)
New user registered: John Doe (john@gmail.com)
```

### **3. Test Current Users** 🧪
You can see who's currently signed in by visiting:
```
http://localhost:3000/api/current-user
```
*(While logged in, this will show your session data)*

---

## 🗃️ **To Enable Permanent Storage**

### **Option A: Add MongoDB (Recommended)**

1. **Set up free MongoDB Atlas**: https://mongodb.com/atlas
2. **Get connection string** like: `mongodb+srv://user:pass@cluster.mongodb.net/unimoney`
3. **Uncomment in `.env.local`**:
   ```bash
   MONGODB_URI=mongodb+srv://your-connection-string
   ```
4. **Restart server**: `npm run dev`

**Then user data will be saved to:**
- **`users` collection**: User profiles (name, email, image, created date)
- **`accounts` collection**: Google OAuth connection details  
- **`sessions` collection**: Active login sessions

### **Option B: View Database (if MongoDB is enabled)**

**MongoDB Compass**: Desktop app to view your database  
**MongoDB Atlas Dashboard**: Web interface to see data  

**Example user record**:
```json
{
  "_id": "ObjectId('...')",
  "name": "John Doe",
  "email": "john@gmail.com",
  "image": "https://lh3.googleusercontent.com/...",
  "emailVerified": null,
  "createdAt": "2025-09-28T10:30:00.000Z",
  "updatedAt": "2025-09-28T10:30:00.000Z"
}
```

---

## 🔍 **Current User Tracking**

### **What You Can See Now:**
- ✅ **Console logs** of who signs in
- ✅ **Current session data** via `/api/current-user`
- ✅ **Admin vs regular user** distinction

### **What You CAN'T See Now:**
- ❌ **List of all users** who ever signed up
- ❌ **Historical sign-in data**
- ❌ **User count/analytics**

### **Admin Users** (get admin dashboard access):
- `unimoney2025@gmail.com`
- `sshiven72@gmail.com` 
- `pnar0013@student.monash.edu`

### **Regular Users** (get loan comparison form):
- Any other Gmail account
- Data stays in JWT token only
- No permanent record kept

---

## 🎯 **Summary**

**Current State**: Google OAuth works, but no database storage  
**User Data**: Temporary JWT tokens only  
**To Save Users**: Set up MongoDB Atlas (5 minutes)  
**Admin Control**: Working perfectly for your 3 emails  

Your authentication is fully functional - you just need to decide if you want permanent user storage or if temporary JWT sessions are sufficient for now!