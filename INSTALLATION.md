# 🚀 Installation & Startup Instructions

## Prerequisites Check
- ✅ Node.js v14+ installed
- ✅ MongoDB (local or Atlas account)
- ✅ Git
- ✅ npm or yarn

---

## 📦 Step 1: Install Dependencies

### Backend Setup
```bash
# Open terminal in Subs Manager folder
cd server

# Install all dependencies
npm install

# You should see: added XX packages
```

### Frontend Setup
```bash
# Open new terminal in Subs Manager folder
cd my-app

# Install dependencies (if not already done)
npm install

# You should see: added XX packages
```

---

## 🗄️ Step 2: MongoDB Setup

### Option A: Local MongoDB (Windows)

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download Windows MSI Installer
   - Run installer, choose typical install

2. **Start MongoDB Service**
   ```bash
   # In PowerShell (as Administrator)
   net start MongoDB
   ```

3. **Verify it's running**
   ```bash
   mongosh
   # or for older versions
   mongo
   ```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create new project

2. **Create a Cluster**
   - Choose free tier (M0)
   - Select your region
   - Click "Create Cluster" (takes ~10 minutes)

3. **Get Connection String**
   - Go to "Connect" button on cluster
   - Choose "Connect your application"
   - Copy connection string (format: `mongodb+srv://...`)

4. **Update Server .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-manager?retryWrites=true&w=majority
   ```

---

## ⚙️ Step 3: Configure Environment Variables

### Backend .env Configuration

Edit `server/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/subscription-manager

# JWT Secret (Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

**If using MongoDB Atlas**, replace MONGODB_URI with your connection string.

---

## 🔧 Step 4: Start the Application

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```

**Expected Output:**
```
✓ Server running on http://localhost:5000
```

**Available routes:**
- Health check: http://localhost:5000/api/health
- Auth routes: http://localhost:5000/api/auth/*
- Subscription routes: http://localhost:5000/api/subscriptions/*

---

### Terminal 2: Start Frontend Server
```bash
cd my-app
npm run dev
```

**Expected Output:**
```
  VITE v7.1.x ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## ✨ Step 5: Test the Application

1. **Open your browser**
   - Go to: http://localhost:5173 (or http://localhost:5174)

2. **Sign Up**
   - Click "Need an account? Sign Up"
   - Enter: Name, Email, Password
   - Click "Sign Up" button
   - ✅ Should login automatically

3. **Add Subscription**
   - Click "Add Subscription" button in Dashboard
   - Fill in: Name, Price, Category, Frequency
   - Click "Add"
   - ✅ Should appear in list

4. **View Subscriptions**
   - Dashboard tab: See stats (Active, Monthly Cost, Yearly Cost)
   - All Subscriptions tab: See all your subscriptions
   - Edit or delete subscriptions as needed

5. **Logout**
   - Click on your profile (bottom of sidebar)
   - Click "Logout"
   - ✅ Returns to login screen

---

## 🧪 Verify Everything Works

### Check Backend
```bash
# Terminal 1: In server folder
npm run dev

# In another terminal, test API
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"Server is running"}
```

### Check Database Connection
```bash
# In MongoDB shell
use subscription-manager
db.users.find()
db.subscriptions.find()
```

### Check Frontend
- Open http://localhost:5173 in browser
- Open DevTools (F12)
- Go to Console tab
- Should see no errors
- Network tab shows API requests with 200-201 status codes

---

## 📝 Project Structure Created

```
Subs Manager/
├── my-app/                          (React Frontend)
│   ├── src/
│   │   ├── services/api.js         ← API communication
│   │   ├── Context/SubscriptionContext.jsx  ← Backend-connected state
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx        ← Real auth with backend
│   │   │   ├── DashboardPage.jsx
│   │   │   └── AllSubscriptionPage.jsx
│   │   └── ...other components
│   ├── package.json
│   └── vite.config.js
│
├── server/                          (Node/Express Backend)
│   ├── config/db.js                ← MongoDB connection
│   ├── models/
│   │   ├── User.js                 ← User schema with password hashing
│   │   └── Subscription.js         ← Subscription schema
│   ├── controllers/
│   │   ├── authController.js       ← Signup/Login/JWT logic
│   │   └── subscriptionController.js  ← CRUD operations
│   ├── routes/
│   │   ├── auth.js                 ← /api/auth/* endpoints
│   │   └── subscriptions.js        ← /api/subscriptions/* endpoints
│   ├── middleware/
│   │   └── auth.js                 ← JWT verification
│   ├── server.js                   ← Express app entry point
│   ├── package.json
│   ├── .env                        ← Environment variables
│   └── .gitignore
│
├── SETUP_GUIDE.md                  (Detailed setup documentation)
├── API_TESTING.md                  (API examples and testing)
└── INSTALLATION.md                 (This file)
```

---

## 🔄 Restarting the Application

If you need to restart:

1. **Stop both servers**
   - Terminal 1 (Backend): Press `Ctrl+C`
   - Terminal 2 (Frontend): Press `Ctrl+C`

2. **Restart Backend**
   ```bash
   cd server
   npm run dev
   ```

3. **Restart Frontend**
   ```bash
   cd my-app
   npm run dev
   ```

4. **Refresh browser**
   - Press `F5` or `Ctrl+R`

---

## 🆘 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
→ MongoDB not running. Start MongoDB service.

### Port 5000 already in use
```
Error: listen EADDRINUSE :::5000
```
→ Kill process: `netstat -ano | findstr :5000` then note PID and `taskkill /PID <PID> /F`

### Frontend won't start
```
Error: Port 5173 is already in use
```
→ Use different port: `npm run dev -- --port 5174`

### "Cannot POST /api/auth/login"
→ Backend not running. Start backend with `npm run dev`

### CORS errors in console
→ Backend not running on http://localhost:5000

### "Email already exists"
→ Use different email or check MongoDB: `db.users.find()`

### Empty subscriptions list
→ Make sure you're logged in with correct user
→ Try adding new subscription
→ Check MongoDB: `db.subscriptions.find({userId: ObjectId("...")})`

---

## 📚 Documentation Files

- **SETUP_GUIDE.md** - Comprehensive setup guide with architecture
- **API_TESTING.md** - API endpoints and cURL examples
- **INSTALLATION.md** - This quick start guide

---

## 🎯 Your App Has

✅ User Registration & Login (with real authentication)
✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ MongoDB database (persistent data)
✅ User-specific subscriptions (each user has their own)
✅ Subscription CRUD operations (Create, Read, Update, Delete)
✅ Real-time stats calculation
✅ Auto-calculated billing dates
✅ Error handling and validation
✅ Protected API routes
✅ Responsive UI with beautiful gradient backgrounds

---

## 🎉 Success Checklist

- [ ] Backend running on :5000
- [ ] Frontend running on :5173/:5174
- [ ] MongoDB connected
- [ ] Can sign up with new account
- [ ] Can add subscriptions
- [ ] Stats display correctly
- [ ] Can edit/delete subscriptions
- [ ] Can logout
- [ ] Data persists after refresh

---

## 💡 What's Next?

1. Deploy MongoDB to Atlas if using local
2. Deploy backend to: Heroku, Railway, or Render
3. Deploy frontend to: Vercel or Netlify
4. Add email verification
5. Add password reset functionality
6. Add social login (Google, GitHub)
7. Add subscription categories/filtering
8. Add email notifications
9. Add payment integration

---

## 📞 Need Help?

1. Check the terminal output for error messages
2. Review the documentation files
3. Verify all prerequisites are installed
4. Clear browser cache and localStorage
5. Restart both backend and frontend

---

**Your Subscription Manager is ready! Start hacking! 🚀**
