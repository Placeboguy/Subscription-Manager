# MongoDB Compass Local Connection - Complete Setup

## 🎯 Your Goal
Connect your Subscription Manager app to **MongoDB Compass** running on **localhost:27017**

## ✅ Good News!
Your backend is **already configured** to use localhost:27017!

---

## 📋 Current Configuration

```
Database: subscription-manager
Host: localhost  
Port: 27017
URI: mongodb://localhost:27017/subscription-manager
Environment: Development
```

**Location:** `D:\Subs Manager\server\.env`

---

## 🚀 Quick Start (5 Steps)

### Step 1: Install MongoDB (if needed)
**Windows:**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# Or use: choco install mongodb-community
```

### Step 2: Start MongoDB Server
```powershell
mongod
```
**Wait for:** `Listening on port 27017`

### Step 3: Open MongoDB Compass
- Download: https://www.mongodb.com/products/compass
- Connection: `mongodb://localhost:27017`
- Click: **Connect**

### Step 4: Start Backend Server (New PowerShell)
```powershell
cd "D:\Subs Manager\server"
npm run dev
```
**Expect:** 
```
✓ Server running on http://localhost:5000
✓ MongoDB Connected: localhost
```

### Step 5: Start Frontend (New PowerShell)
```powershell
cd "D:\Subs Manager\my-app"
npm run dev
```
**Expect:**
```
Local: http://localhost:5173/
```

---

## 🧪 Test Your Connection

1. **Go to:** http://localhost:5173
2. **Sign up** with an account
3. **Add subscriptions**
4. **Check MongoDB Compass:**
   - Should show `subscription-manager` database
   - Collections: `users` and `subscriptions`
   - Your data visible

---

## 📊 What You'll See in MongoDB Compass

### Database View
```
subscription-manager/
├── users
│   ├── name
│   ├── email  
│   ├── password (hashed)
│   └── _id
└── subscriptions
    ├── name (Netflix, Spotify, etc.)
    ├── price
    ├── frequency (monthly/yearly)
    ├── category
    ├── userId (references user)
    └── _id
```

### Example User Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...", // bcrypt hashed
  "createdAt": ISODate("2024-01-07T..."),
  "updatedAt": ISODate("2024-01-07T...")
}
```

### Example Subscription Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Netflix",
  "category": "Entertainment",
  "price": 15.99,
  "frequency": "monthly",
  "status": "active",
  "description": "Premium Plan",
  "startDate": ISODate("2024-01-07T..."),
  "nextBillingDate": ISODate("2024-02-07T..."),
  "createdAt": ISODate("2024-01-07T..."),
  "updatedAt": ISODate("2024-01-07T...")
}
```

---

## 🔍 Verification Points

### MongoDB Server Running ✓
```powershell
# In mongod window, you should see:
[initandlisten] Listening on socket: mongod.sock at port 27017
```

### Backend Connected ✓
```
✓ MongoDB Connected: localhost
```

### Frontend Works ✓
- Can sign up
- Can login
- Can add subscriptions
- Can view dashboard

### Data in Compass ✓
- `subscription-manager` database appears
- `users` collection shows your account
- `subscriptions` collection shows your data

---

## ⚙️ Your Configuration Files

### Backend Configuration
**File:** `server/.env`
```properties
MONGODB_URI=mongodb://localhost:27017/subscription-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

### Database Connection
**File:** `server/config/db.js`
```javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    process.exit(1);
  }
};
```

### API Connection
**File:** `my-app/src/services/api.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🛠️ Troubleshooting

### "Cannot connect to localhost:27017"
```powershell
# Make sure MongoDB is running:
mongod

# If port is in use:
netstat -ano | findstr :27017
```

### "MongoDB Connected but no collections show"
- This is **normal!** Collections are created on first write
- Add a subscription in your app
- Collections will appear in Compass

### "Backend won't connect"
1. Check MongoDB is running first
2. Check `.env` has correct `MONGODB_URI`
3. Restart backend after MongoDB starts

### "Connection refused"
1. Verify port 27017 is listening: `mongod`
2. Check firewall isn't blocking it
3. Try: `mongodb://127.0.0.1:27017` instead of localhost

---

## 📱 Process Checklist

Keep these 3 windows running:

```
Window 1: MongoDB Server
┌─────────────────────────┐
│ mongod                  │
│ ✓ Listening on :27017   │
└─────────────────────────┘

Window 2: Backend Server
┌─────────────────────────┐
│ npm run dev             │
│ ✓ Server on :5000       │
│ ✓ MongoDB Connected     │
└─────────────────────────┘

Window 3: Frontend App
┌─────────────────────────┐
│ npm run dev             │
│ ✓ http://localhost:5173 │
└─────────────────────────┘
```

---

## 📊 Data Flow

```
Browser (localhost:5173)
        ↓
React App
        ↓
API Service (http://localhost:5000)
        ↓
Node.js Backend
        ↓
Mongoose ODM
        ↓
MongoDB (localhost:27017)
        ↓
subscription-manager database
  ├── users collection
  └── subscriptions collection
```

---

## 🎯 Success Criteria

Your setup is working when:

✅ `mongod` shows "Listening on port 27017"  
✅ Backend shows "✓ MongoDB Connected: localhost"  
✅ Frontend loads at http://localhost:5173  
✅ Can sign up and login  
✅ Can add subscriptions  
✅ Data appears in MongoDB Compass  
✅ Dashboard stats calculate correctly  
✅ Data persists after page refresh  

---

## 📚 Related Documentation

- `MONGODB_QUICK_START.md` - Quick reference guide
- `MONGODB_CONNECTION_CHECKLIST.md` - Detailed checklist
- `SETUP_GUIDE.md` - Full setup guide
- `GETTING_STARTED.md` - Visual guide

---

## 🚀 Next Steps

1. **Verify MongoDB installed:** `mongod --version`
2. **Start MongoDB:** `mongod`
3. **Open MongoDB Compass**
4. **Connect to:** `mongodb://localhost:27017`
5. **Start backend:** `npm run dev` (from server folder)
6. **Start frontend:** `npm run dev` (from my-app folder)
7. **Test app:** http://localhost:5173
8. **View data:** MongoDB Compass

**You're all set! Your app is ready to use with local MongoDB!** 🎉

---

## 💡 Tips

- **Keep MongoDB running** while using the app
- **Keep both npm servers running** (backend and frontend)
- **Use MongoDB Compass** to inspect and verify your data
- **Data persists** - you can close and reopen apps, data stays in MongoDB
- **Collections created automatically** after first write

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| MongoDB not starting | Install from: https://www.mongodb.com/try/download/community |
| Port 27017 in use | Find process: `netstat -ano \| findstr :27017` |
| Compass can't connect | Make sure mongod is running and listening |
| Backend shows error | Check .env file and restart backend |
| No data in Compass | Add a subscription first, then refresh |
| Data disappeared | MongoDB needs to be running; restart it |

Everything is configured and ready to go! Just start the three services and you're done! ✨
