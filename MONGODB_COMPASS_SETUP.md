# MongoDB Compass Connection Guide

## Current Setup
Your backend is already configured to use MongoDB at **localhost:27017** with database name **subscription-manager**.

### Configuration Details
- **Database URI:** `mongodb://localhost:27017/subscription-manager`
- **Location:** `server/.env` file
- **Database Name:** `subscription-manager`
- **Host:** localhost
- **Port:** 27017

---

## Step 1: Start MongoDB Server

### Option A: Using MongoDB Community Edition (Local Installation)

**Windows:**
```powershell
# If MongoDB is installed locally
mongod
```

**Alternative: Using MongoDB Community Edition as a Service**
```powershell
# Start MongoDB service
net start MongoDB

# Or use Services app:
# Press Win+R → Type "services.msc" → Find "MongoDB" → Right-click → Start
```

**Or with Homebrew (Mac):**
```bash
brew services start mongodb-community
```

---

## Step 2: Open MongoDB Compass

1. **Install MongoDB Compass** (if not already installed):
   - Download from: https://www.mongodb.com/products/compass
   - Or use: `choco install mongodb-compass` (Windows)

2. **Open the application**

3. **Connection String:**
   ```
   mongodb://localhost:27017
   ```

---

## Step 3: Connect in MongoDB Compass

### Method 1: Using Default Connection

1. Open MongoDB Compass
2. Click **"New Connection"** or use default
3. Connection String should auto-fill with: `mongodb://localhost:27017`
4. Click **"Connect"**

### Method 2: Manual Connection

1. In MongoDB Compass, you'll see a connection field
2. Enter: `mongodb://localhost:27017`
3. Click **"Connect"**

---

## Step 4: Verify Connection

### You should see:

```
✓ Connected to localhost:27017
```

Once connected, you'll see:
- **Databases** on the left sidebar
- A database called `subscription-manager` (created automatically when you add data)

### Collections in Your Database:

When you start adding subscriptions, you'll see these collections:
1. **users** - Your user accounts
2. **subscriptions** - All subscription data
3. **sessions** (optional)

---

## Step 5: Start Your Application

### Terminal 1: Start Backend Server
```powershell
cd "D:\Subs Manager\server"
npm run dev
```

**Expected output:**
```
✓ Server running on http://localhost:5000
✓ MongoDB Connected: localhost
```

### Terminal 2: Start Frontend (in new terminal)
```powershell
cd "D:\Subs Manager\my-app"
npm run dev
```

**Expected output:**
```
  VITE v7.1.x  ready in X ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Step 6: Monitor Data in MongoDB Compass

### View Your Collections:

1. In MongoDB Compass, expand `subscription-manager` database
2. Click on **collections** to see:
   - **users** → View registered users
   - **subscriptions** → View all subscription data

### Example Data Structure:

**Users Collection:**
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_here",
  "createdAt": "2024-01-07T...",
  "updatedAt": "2024-01-07T..."
}
```

**Subscriptions Collection:**
```json
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "name": "Netflix",
  "category": "Entertainment",
  "price": 15.99,
  "frequency": "monthly",
  "status": "active",
  "description": "Premium plan",
  "startDate": "2024-01-07T...",
  "nextBillingDate": "2024-02-07T...",
  "createdAt": "2024-01-07T...",
  "updatedAt": "2024-01-07T..."
}
```

---

## Troubleshooting

### Issue: "Cannot connect to localhost:27017"

**Cause:** MongoDB server is not running

**Solution:**
```powershell
# Check if MongoDB is running
# Windows: Open Task Manager → Look for "mongod.exe"
# Or start it manually:
mongod

# If not installed, install MongoDB Community Edition:
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
```

### Issue: "Connection refused"

**Solution:**
```powershell
# Make sure MongoDB is listening on port 27017
# Edit: C:\Program Files\MongoDB\Server\7.0\mongod.cfg

# Verify the net section:
# net:
#   port: 27017
#   bindIp: 127.0.0.1

# Restart MongoDB
```

### Issue: "No database appears in Compass"

**Solution:**
- This is normal! Collections are created automatically when you add data
- Sign up and add a subscription in your app
- Then refresh Compass or go to `subscription-manager` database
- Collections will appear after first write

### Issue: "Backend cannot connect to database"

**Check:**
1. MongoDB server is running
2. Port 27017 is not blocked by firewall
3. `.env` file has correct `MONGODB_URI`

**Reset Connection:**
```bash
# Stop backend
# Restart MongoDB
mongod

# Restart backend
npm run dev
```

---

## Environment Configuration

Your `.env` file is already configured:

```properties
MONGODB_URI=mongodb://localhost:27017/subscription-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

### To Change Database Name:

Edit `server/.env`:
```properties
# Change from:
MONGODB_URI=mongodb://localhost:27017/subscription-manager

# To:
MONGODB_URI=mongodb://localhost:27017/my-custom-db-name
```

Then restart the backend.

---

## Backup Your Data

### Export data from MongoDB Compass:

1. Right-click on collection (e.g., `subscriptions`)
2. Select **"Export Collection"**
3. Choose format: JSON or CSV
4. Save to file

### Restore data:

1. Right-click on collection
2. Select **"Import Collection"**
3. Choose your backup file

---

## Data Verification Checklist

✅ MongoDB server running on localhost:27017  
✅ MongoDB Compass connected and showing database  
✅ Backend server connected to MongoDB (check console output)  
✅ Frontend can add subscriptions  
✅ Data appears in MongoDB Compass collections  
✅ Data persists after refresh  

---

## Quick Commands

```powershell
# Start MongoDB
mongod

# Start Backend
cd server && npm run dev

# Start Frontend (new terminal)
cd my-app && npm run dev

# View database in MongoDB Compass
# Connection: mongodb://localhost:27017
```

---

## Next Steps

Once connected:

1. ✅ Sign up with an account
2. ✅ Add some subscriptions
3. ✅ Go to MongoDB Compass
4. ✅ View your data in the collections
5. ✅ Check that data persists

Your application is now fully connected to your local MongoDB database! 🎉
