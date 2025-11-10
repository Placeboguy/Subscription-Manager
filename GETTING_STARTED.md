# 🎬 Getting Started - Visual Guide

## Step 1: Setup Backend (2 minutes)

```bash
cd server
npm install
```

**What happens:**
- Downloads 50+ packages (express, mongoose, etc.)
- Creates node_modules folder
- Installs all dependencies

**Expected output:**
```
up to date in 30.5s
```

---

## Step 2: Start Backend (30 seconds)

```bash
npm run dev
```

**Expected output:**
```
✓ MongoDB Connected: localhost
✓ Server running on http://localhost:5000
```

**Keep this terminal open!**

---

## Step 3: Setup Frontend (NEW TERMINAL - 2 minutes)

```bash
cd my-app
npm install
```

**What happens:**
- Downloads 200+ packages (react, vite, etc.)
- Creates node_modules folder

**Expected output:**
```
added 150 packages in 2m
```

---

## Step 4: Start Frontend (NEW TERMINAL - 30 seconds)

```bash
npm run dev
```

**Expected output:**
```
VITE v7.1.x ready in 132 ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal open!**

---

## Step 5: Open Application (BROWSER)

Visit: **http://localhost:5173**

---

## 🎯 What You Should See

### First Time Opening:
```
┌─────────────────────────────────────┐
│                                     │
│  Subscription Manager               │
│  Login / Sign Up Form               │
│                                     │
│  Animated Pink-Purple Background    │
│                                     │
│  [Full Name Field]                  │
│  [Email Field]                      │
│  [Password Field]                   │
│  [Sign Up / Log In Button]          │
│                                     │
│  "Need an account? Sign Up"         │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 Test Flow

### 1. Sign Up
```
Name: John Doe
Email: john@example.com
Password: password123

Click: Sign Up
```

**What happens:**
1. Frontend sends to: POST /api/auth/register
2. Backend validates
3. Backend hashes password
4. Backend creates user in MongoDB
5. Backend returns JWT token
6. Frontend saves token to localStorage
7. Frontend navigates to Dashboard

**You should see:** Dashboard with stats

---

### 2. Dashboard
```
┌─────────────────────────────────────┐
│ SubManager                          │
│ Welcome, John Doe!                  │
│                                     │
│ [Active] [Monthly] [Yearly]         │
│ 0        $0.00      $0.00           │
│                                     │
│ [+ Add Subscription]                │
│                                     │
│ Recent Subscriptions                │
│ (Empty - no subscriptions yet)      │
│                                     │
└─────────────────────────────────────┘
```

---

### 3. Add Subscription
```
Click: [+ Add Subscription]

Modal Appears:
Name: Netflix
Price: 15.99
Category: Streaming
Frequency: Monthly
Description: Movie streaming

Click: Add
```

**What happens:**
1. Frontend sends: POST /api/subscriptions
2. Header includes: Authorization: Bearer <token>
3. Backend verifies token (middleware)
4. Backend saves to MongoDB with userId
5. Backend returns saved subscription
6. Frontend updates stats
7. Dashboard refreshes

**You should see:**
- Stats updated: "1" active, "$15.99" monthly
- Netflix appears in list

---

### 4. View All Subscriptions
```
Click: "All Subscriptions" in sidebar

You see:
- Netflix card with options to edit/delete
- Search bar to filter subscriptions
- Status dropdown (Active/Paused/Cancelled)
```

---

### 5. Edit Subscription
```
Click: Edit on Netflix card

Modal appears with current data:
- Edit price, name, etc.
- Click: Save

What happens:
- Frontend sends: PUT /api/subscriptions/:id
- Backend verifies user owns it
- Backend updates MongoDB
- Frontend refreshes list
```

---

### 6. Delete Subscription
```
Click: Delete on Netflix card

What happens:
- Frontend sends: DELETE /api/subscriptions/:id
- Backend verifies user owns it
- Backend removes from MongoDB
- Frontend removes from list
- Stats recalculate
```

---

### 7. Logout & Login
```
Click: Profile menu at bottom of sidebar
Click: Logout

What happens:
- Frontend clears localStorage
- Navigates to AuthPage
- Shows Login/Signup form

Login with same credentials:
Email: john@example.com
Password: password123
Click: Log In

What happens:
- Backend finds user
- Compares password
- Generates new token
- Frontend logs in
- Dashboard shows Netflix (DATA PERSISTED!)
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running on port 5000 (check terminal)
- [ ] Frontend running on port 5173 (check terminal)
- [ ] Can open http://localhost:5173 in browser
- [ ] Can sign up with new email/password
- [ ] Dashboard shows after signup
- [ ] Can add subscription
- [ ] Stats update after adding
- [ ] Can view in "All Subscriptions" page
- [ ] Can edit subscription
- [ ] Can delete subscription
- [ ] Can logout (shows login again)
- [ ] Can login again
- [ ] Data persists (Netflix still there)

---

## 🐛 If Something Doesn't Work

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB service
```bash
mongosh  # Test connection
```

### Port 5000 already in use
```
Error: listen EADDRINUSE :::5000
```
**Fix:** Kill the process or use different port
```bash
# Windows: Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or in .env, change PORT=5001
```

### Frontend shows CORS error
```
Access to XMLHttpRequest blocked by CORS
```
**Fix:** Backend not running. Start with `npm run dev` in server folder

### Can't sign up (empty error)
```
Check browser console (F12)
```
**Fix:** Enable MongoDB, restart backend

### Data not showing after login
```
Check MongoDB:
mongosh
use subscription-manager
db.users.find()
db.subscriptions.find({userId: ObjectId("...")})
```

---

## 🔍 Debugging Terminals

### Terminal 1 (Backend)
```
✓ MongoDB Connected: localhost
✓ Server running on http://localhost:5000

[POST /api/auth/register] 201 - 45ms
[POST /api/subscriptions] 201 - 32ms
[GET /api/subscriptions] 200 - 18ms
```

### Terminal 2 (Frontend)
```
VITE v7.1.x ready in 132 ms

➜  Local:   http://localhost:5173/
➜  press h to show help

(No errors should show)
```

### Browser Console (F12)
```
✓ Should be empty (no errors)
✓ Network tab shows API calls with 200/201 status
✓ Application tab shows localStorage with authToken
```

---

## 📊 File Structure Quick Look

```
Server Running (:5000)
├── GET /api/health ─→ {success: true}
├── POST /api/auth/register ─→ Signup
├── POST /api/auth/login ─→ Login
└── /api/subscriptions/* ─→ CRUD (need token)

Frontend Running (:5173)
├── AuthPage ─→ Login/Signup
├── Dashboard ─→ Stats & Overview
├── All Subscriptions ─→ List & Manage
└── Settings ─→ User Profile

Database (MongoDB)
├── subscription-manager
│   ├── users ─→ Login accounts
│   └── subscriptions ─→ User's subscriptions
```

---

## 💡 Pro Tips

1. **Keep terminals open** - Don't close backend or frontend
2. **Check Network tab** - F12 → Network to see API calls
3. **Check Console** - F12 → Console for error messages
4. **Check Application** - F12 → Application to see localStorage
5. **Refresh page** - Sometimes helps after changes
6. **Clear localStorage** - F12 → Application → Clear if stuck

---

## 🎊 Success Indicators

When everything works, you'll see:

✅ Backend logs showing requests
✅ Frontend loads without errors
✅ Can signup with new account
✅ Dashboard shows correct stats
✅ Subscriptions persist in database
✅ Can logout and login again
✅ Data still there after refresh

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| "Connection refused" | Start MongoDB |
| "Port in use" | Kill process or change port |
| "CORS error" | Backend not running |
| "Empty form" | Network error, check console |
| "No subscriptions" | Make sure logged in |
| "Data disappeared" | Check localStorage wasn't cleared |

---

## 🚀 You're Ready!

Follow these steps in order:

1. ✅ Backend setup & start
2. ✅ Frontend setup & start
3. ✅ Open browser
4. ✅ Sign up
5. ✅ Add subscriptions
6. ✅ Test everything
7. ✅ Celebrate! 🎉

---

**Need detailed help? Check the documentation files!**
- Stuck? → INSTALLATION.md
- Want details? → SETUP_GUIDE.md
- Need reference? → QUICK_REFERENCE.md
