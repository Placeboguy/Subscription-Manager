# MongoDB Local Connection Checklist

## ✅ Pre-Connection Checklist

### MongoDB Installation
- [ ] MongoDB Community Edition installed
  - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
  - Mac: `brew install mongodb-community`
  - Linux: Follow official docs
  
- [ ] MongoDB Compass installed
  - Download: https://www.mongodb.com/products/compass

### Backend Configuration
- [ ] Backend `.env` file exists at `server/.env`
- [ ] `.env` contains: `MONGODB_URI=mongodb://localhost:27017/subscription-manager`
- [ ] `.env` PORT is set to 5000
- [ ] Node modules installed: `cd server && npm install`

### Frontend Configuration
- [ ] Frontend dependencies installed: `cd my-app && npm install`
- [ ] API service configured to use `http://localhost:5000`

---

## 🚀 Connection Steps Checklist

### Step 1: Start MongoDB Server
- [ ] Open PowerShell as Administrator
- [ ] Run: `mongod`
- [ ] See output: `[initandlisten] Listening on`
- [ ] Leave this window open

### Step 2: Connect MongoDB Compass
- [ ] Open MongoDB Compass application
- [ ] See connection screen
- [ ] Default connection string appears: `mongodb://localhost:27017`
- [ ] Click "Connect" button
- [ ] See success message: "Connected to localhost:27017"

### Step 3: Start Backend Server
- [ ] Open new PowerShell window
- [ ] Navigate: `cd "D:\Subs Manager\server"`
- [ ] Run: `npm run dev`
- [ ] See output: 
  - `✓ Server running on http://localhost:5000`
  - `✓ MongoDB Connected: localhost`

### Step 4: Start Frontend Application
- [ ] Open another PowerShell window
- [ ] Navigate: `cd "D:\Subs Manager\my-app"`
- [ ] Run: `npm run dev`
- [ ] See output:
  - `VITE v7.1.x ready in X ms`
  - `Local: http://localhost:5173/`

### Step 5: Test Application
- [ ] Open browser: `http://localhost:5173`
- [ ] Sign up with test account
- [ ] Add a subscription
- [ ] Subscription appears in list
- [ ] Go to Dashboard - stats show

### Step 6: Verify Data in MongoDB Compass
- [ ] Look at MongoDB Compass window
- [ ] Left sidebar shows `subscription-manager` database
- [ ] Expand `subscription-manager`
- [ ] See `users` collection with your account
- [ ] See `subscriptions` collection with your subscription

---

## 📊 Data Verification Checklist

### Users Collection Check
- [ ] Shows at least 1 user document
- [ ] User has fields: `name`, `email`, `password` (hashed)
- [ ] User has `_id` field (MongoDB ObjectId)

### Subscriptions Collection Check
- [ ] Shows at least 1 subscription document
- [ ] Subscription has fields:
  - [ ] `name` (e.g., "Netflix")
  - [ ] `price` (e.g., 15.99)
  - [ ] `frequency` (e.g., "monthly")
  - [ ] `category` (e.g., "Entertainment")
  - [ ] `status` (should be "active")
  - [ ] `userId` (matches user's `_id`)
  - [ ] `nextBillingDate` (auto-calculated)

---

## 🔧 Troubleshooting Checklist

### MongoDB Server Won't Start
- [ ] Check if port 27017 is free: `netstat -ano | findstr :27017`
- [ ] Restart Windows if port is stuck
- [ ] Check MongoDB is in PATH or use full path: `"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"`
- [ ] Check firewall isn't blocking port 27017

### Backend Won't Connect to MongoDB
- [ ] MongoDB server is running (check Step 1)
- [ ] Check `.env` file has `MONGODB_URI=mongodb://localhost:27017/subscription-manager`
- [ ] Check backend console for error messages
- [ ] Restart backend after MongoDB is running

### MongoDB Compass Won't Connect
- [ ] MongoDB server is running (mongod window shows "Listening on")
- [ ] Check port 27017 in connection string
- [ ] Try: `mongodb://127.0.0.1:27017` instead of localhost
- [ ] Restart Compass if already open

### No Collections Show in Compass
- [ ] This is normal! Collections appear after first write
- [ ] Add a subscription in your app first
- [ ] Refresh Compass (F5)
- [ ] Collections should appear

### Data Not Persisting
- [ ] Check MongoDB is still running
- [ ] Check backend connected output shows: `✓ MongoDB Connected: localhost`
- [ ] Check browser console (F12) for errors
- [ ] Check backend console for errors

---

## 📝 Configuration Verification Checklist

### .env File Check
```properties
✓ MONGODB_URI=mongodb://localhost:27017/subscription-manager
✓ JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
✓ PORT=5000
✓ NODE_ENV=development
```

### File Locations Check
- [ ] `D:\Subs Manager\server\.env` exists
- [ ] `D:\Subs Manager\server\config\db.js` exists
- [ ] `D:\Subs Manager\my-app\src\services\api.js` exists
- [ ] `D:\Subs Manager\my-app\src\App.jsx` exists

### Process Check (Windows Task Manager)
- [ ] Find `mongod.exe` running (MongoDB Server)
- [ ] Node processes running for backend
- [ ] Browser showing frontend at localhost:5173

---

## ✨ Success Indicators

When everything is working:

- [ ] Browser shows Subscription Manager UI
- [ ] Can sign up and login
- [ ] Can add subscriptions
- [ ] Dashboard shows stats
- [ ] MongoDB Compass shows data
- [ ] Data persists after page refresh
- [ ] Multiple subscriptions show in list
- [ ] Can view stats on dashboard
- [ ] Stats auto-calculate correctly
- [ ] Can delete subscriptions

---

## 📱 Console Output Examples

### MongoDB Server (Should see):
```
[initandlisten] MongoDB starting : pid=1234
[initandlisten] Listening on socket: mongod.sock at port 27017
[initandlisten] waiting for connections on port 27017
```

### Backend Server (Should see):
```
✓ Server running on http://localhost:5000
✓ MongoDB Connected: localhost
```

### Frontend Build (Should see):
```
VITE v7.1.x  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🎯 Final Verification

Run this checklist to confirm everything works:

1. [ ] MongoDB server running (mongod)
2. [ ] MongoDB Compass shows "Connected"
3. [ ] Backend shows "✓ MongoDB Connected"
4. [ ] Frontend loads at http://localhost:5173
5. [ ] Can sign up and login
6. [ ] Can add subscription
7. [ ] Subscription appears in MongoDB Compass
8. [ ] Dashboard shows correct stats
9. [ ] Can add multiple subscriptions
10. [ ] Data persists after browser refresh

✅ **If all checked: Your app is fully connected to local MongoDB!**

---

## Quick Reference

| What | Command | Expected Result |
|-----|---------|-----------------|
| Start MongoDB | `mongod` | `Listening on port 27017` |
| Start Backend | `npm run dev` | `✓ MongoDB Connected` |
| Start Frontend | `npm run dev` | `http://localhost:5173` |
| View Data | Open MongoDB Compass | Database `subscription-manager` |
| Test App | Open http://localhost:5173 | Sign up, add subscription |

