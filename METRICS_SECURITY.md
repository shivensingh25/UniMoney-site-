# Metrics Dashboard Security

## Overview
The metrics dashboard is now protected with password authentication to ensure only authorized users can access it.

## How it works

1. **Hidden Route**: The metrics dashboard link has been removed from the navigation bar, making it invisible to regular users.

2. **Password Protection**: When someone tries to access `/metrics-dashboard`, they are presented with a password prompt.

3. **Server-side Verification**: The password is verified on the server-side via the `/api/metrics/auth` endpoint for security.

4. **Session Storage**: Once authenticated, the session is stored in the browser's sessionStorage (clears when browser closes).

## Access Methods

### Method 1: Direct URL (Primary)
Navigate directly to: `https://yourdomain.com/metrics-dashboard`

### Method 2: Keyboard Shortcut (Hidden)
Press `Ctrl + Shift + M` from anywhere on the website to access the metrics dashboard.

## Setup Instructions

### 1. Set Environment Variable (Recommended)
Create a `.env.local` file in your project root and add:

```bash
METRICS_PASSWORD=your_secure_password_here
```

### 2. Default Password
If no environment variable is set, the default password is: `unimoney2024`

### 3. Access the Dashboard
- **Option A**: Navigate directly to: `https://yourdomain.com/metrics-dashboard`
- **Option B**: Press `Ctrl + Shift + M` from anywhere on the site
- Enter the password when prompted
- The dashboard will load with all metrics data

## Security Features

- ✅ **Hidden from navigation**: No visible link in the navbar
- ✅ **Server-side password verification**: Password checked on the server
- ✅ **Session-based authentication**: Authentication persists during browser session
- ✅ **Environment variable support**: Password can be set via environment variable
- ✅ **No hardcoded passwords**: Password is not visible in client-side code
- ✅ **Keyboard shortcut access**: Convenient hidden access method

## Changing the Password

1. **Using Environment Variable** (Recommended):
   ```bash
   # In .env.local
   METRICS_PASSWORD=your_new_password
   ```

2. **Default Password**: Edit the fallback password in `/pages/api/metrics/auth.ts`

## Access Control

- Only users who know the exact URL and password can access the dashboard
- The route is not discoverable through normal navigation
- Authentication is required on each browser session
- No persistent login across browser restarts
- Keyboard shortcut provides convenient access for authorized users

## Technical Implementation

- **Frontend**: React component with password form
- **Backend**: Next.js API route for password verification
- **Storage**: Browser sessionStorage for authentication state
- **Security**: Server-side password validation
- **Access**: Direct URL + keyboard shortcut (Ctrl+Shift+M)

## Troubleshooting

### Can't access the dashboard?
1. Check that you're using the correct password
2. Ensure the environment variable is set correctly (if using one)
3. Try refreshing the page and re-entering the password
4. Try the keyboard shortcut: `Ctrl + Shift + M`

### Password not working?
1. Verify the password in your `.env.local` file
2. Check the server logs for any errors
3. Ensure the API route is working correctly

## Future Enhancements

Consider implementing:
- Rate limiting for password attempts
- IP-based access restrictions
- Multi-factor authentication
- Admin user management system 