# Quick Start: MongoDB Local Connection

## Your Setup ✅

```
✓ Backend configured for: mongodb://localhost:27017/subscription-manager
✓ Database name: subscription-manager
✓ Host: localhost
✓ Port: 27017
```

## 3 Simple Steps

### 1️⃣ Start MongoDB
```powershell
mongod
```
Or use MongoDB Service (Windows Services)

### 2️⃣ Open MongoDB Compass
- Download: https://www.mongodb.com/products/compass
- Connection: `mongodb://localhost:27017`
- Click Connect

### 3️⃣ Start Your Apps

**Terminal 1 - Backend:**
```powershell
cd "D:\Subs Manager\server"
npm run dev
```

**Terminal 2 - Frontend (new terminal):**
```powershell
cd "D:\Subs Manager\my-app"
npm run dev
```

---

## Verify Connection

### Backend Console Should Show:
```
✓ Server running on http://localhost:5000
✓ MongoDB Connected: localhost
```

### MongoDB Compass Should Show:
- Connected to localhost:27017
- After adding subscriptions: `subscription-manager` database appears

---

## Your Database Structure

```
subscription-manager/
├── users
│   └── {_id, name, email, password, ...}
└── subscriptions
    └── {_id, userId, name, price, frequency, ...}
```

---

## Test It

1. Go to http://localhost:5173
2. Sign up
3. Add a subscription
4. Check MongoDB Compass
5. See your data appear! ✨

---

## Common Issues

| Problem | Solution |
|---------|----------|
| "Cannot connect" | Start MongoDB with `mongod` |
| "Connection refused" | Check port 27017 not blocked |
| "No database shows" | This is normal - collections appear after first write |
| Backend won't start | Make sure MongoDB is running first |

---

## Configuration File

**Location:** `server/.env`

```properties
MONGODB_URI=mongodb://localhost:27017/subscription-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

Everything is already set up! Just start MongoDB and run your apps! 🚀
