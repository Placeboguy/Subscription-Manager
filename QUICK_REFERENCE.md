# 🚀 Quick Reference Card

## File Structure

```
Subs Manager/
├── server/                      ← Backend (Node/Express)
│   ├── config/db.js
│   ├── models/User.js
│   ├── models/Subscription.js
│   ├── controllers/authController.js
│   ├── controllers/subscriptionController.js
│   ├── middleware/auth.js
│   ├── routes/auth.js
│   ├── routes/subscriptions.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── my-app/                      ← Frontend (React)
│   ├── src/
│   │   ├── services/api.js      ← API communication
│   │   ├── Context/SubscriptionContext.jsx  ← Backend-connected state
│   │   ├── pages/AuthPage.jsx   ← Real authentication
│   │   └── ...other files
│   ├── package.json
│   └── vite.config.js
│
├── SETUP_GUIDE.md               ← Detailed setup guide
├── INSTALLATION.md              ← Quick start
├── API_TESTING.md               ← API examples
├── ARCHITECTURE.md              ← System design
└── BACKEND_SUMMARY.md           ← Feature summary
```

---

## 🚀 Get Started in 5 Minutes

### 1. Install Backend
```bash
cd server
npm install
npm run dev
```
✅ Should see: `✓ Server running on http://localhost:5000`

### 2. Install Frontend (new terminal)
```bash
cd my-app
npm install
npm run dev
```
✅ Should see: `Local: http://localhost:5173/`

### 3. Open Browser
```
http://localhost:5173
```

### 4. Test Features
- Sign Up with any email/password
- Add Subscriptions
- See Dashboard stats update
- Logout and login again (data persists!)

---

## 📡 API Endpoints Cheat Sheet

### Auth Endpoints
```bash
# Register
POST /api/auth/register
Body: {name, email, password}
Response: {token, user}

# Login
POST /api/auth/login
Body: {email, password}
Response: {token, user}

# Get Current User (protected)
GET /api/auth/me
Header: Authorization: Bearer <token>
```

### Subscription Endpoints (all protected - need token in header)
```bash
# Get all subscriptions
GET /api/subscriptions
Header: Authorization: Bearer <token>

# Add subscription
POST /api/subscriptions
Body: {name, price, category, frequency, description}

# Get stats
GET /api/subscriptions/stats/overview

# Update subscription
PUT /api/subscriptions/:id
Body: {field: value}

# Delete subscription
DELETE /api/subscriptions/:id
```

---

## 🔑 Key Concepts

| Concept | What it Does |
|---------|-------------|
| **JWT Token** | Proves you're logged in (stored in localStorage) |
| **Hash** | Encrypts password (bcryptjs) - can't decrypt, only compare |
| **Middleware** | Function that checks token before handling request |
| **ObjectId** | MongoDB's unique ID for each document |
| **REST API** | Communication between frontend & backend using HTTP |
| **CRUD** | Create, Read, Update, Delete operations |

---

## 🧪 Test with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get subscriptions (replace TOKEN)
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/subscriptions
```

---

## 🔒 Security Features

✅ Password hashing (bcryptjs - 10 salt rounds)
✅ JWT authentication (30-day expiration)
✅ Input validation (email format, required fields)
✅ User data isolation (can't see other users' data)
✅ Protected API routes (middleware checks token)
✅ Unique email constraint (no duplicate accounts)

---

## 📊 Database Schema

### Users
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Subscriptions
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (points to user)",
  "name": "string",
  "category": "string",
  "price": "number",
  "frequency": "monthly|yearly",
  "status": "active|paused|cancelled",
  "startDate": "date",
  "nextBillingDate": "date (auto-calc)",
  "description": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## 🐛 Debugging Tips

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB not running - start MongoDB service |
| `Port 5000 in use` | Another process using port 5000 - kill it or use different port |
| `CORS error` | Backend not running on :5000 - check server.js output |
| `Unauthorized 401` | Missing or invalid JWT token - login again |
| `Email exists` | Email already registered - use different email |
| `Empty subscriptions` | Make sure logged in, check MongoDB data |

---

## 📝 Environment Variables (.env)

```env
# MongoDB Connection (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/subscription-manager

# JWT Secret (change in production!)
JWT_SECRET=your_secret_key_here

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

---

## 🎯 Frontend Usage

```javascript
// Import API service
import { authAPI, subscriptionAPI } from '../services/api';

// Register user
const result = await authAPI.register(name, email, password);

// Login user
const result = await authAPI.login(email, password);

// Get subscriptions
const result = await subscriptionAPI.getAll();

// Add subscription
const result = await subscriptionAPI.add({
  name: "Netflix",
  price: 15.99,
  frequency: "monthly"
});

// Logout
authAPI.logout(); // Clears localStorage
```

---

## 🔄 Request/Response Format

### Request
```
POST /api/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "password123"
}
```

### Successful Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3...",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 🌐 Frontend State Management

```javascript
// SubscriptionContext provides:
{
  subscriptions: [],           // Array of subscription objects
  addSubscription: async (sub) => {...},      // Add new
  deleteSubscription: async (id) => {...},    // Delete
  updateSubscription: async (id, data) => {...},  // Update
  getStats: () => {...},       // Get stats object
  fetchSubscriptions: async () => {...},  // Refetch from server
  loading: false,              // Loading state
  error: null                  // Error message
}

// Use in component:
import { useSubscriptions } from '../Context/SubscriptionContext';
const { subscriptions, addSubscription, getStats } = useSubscriptions();
```

---

## 📱 Component Flow

```
App.jsx (checks localStorage for token)
├─ Not logged in? → AuthPage (Login/Signup)
└─ Logged in? → Layout (Dashboard/Subscriptions/Settings)
   └─ SubscriptionContext (manages subscription state)
      └─ Gets data from API service
         └─ Makes HTTP requests to backend
```

---

## ✨ Features Implemented

✅ User Registration (with validation)
✅ User Login (with password verification)
✅ JWT Token Authentication (30-day expiration)
✅ Password Hashing (bcryptjs)
✅ User-Specific Subscriptions (data isolation)
✅ Add/Edit/Delete Subscriptions (CRUD)
✅ Dashboard Statistics (active, monthly, yearly)
✅ Auto-Calculated Billing Dates
✅ Protected API Routes (require token)
✅ Error Handling (validation & exception)
✅ Persistent Data (MongoDB storage)
✅ Session Persistence (localStorage + token)

---

## 🚀 Next Steps

1. **Run the app** - Follow INSTALLATION.md
2. **Test APIs** - Use API_TESTING.md examples
3. **Understand architecture** - Read ARCHITECTURE.md
4. **Explore code** - Start with server.js
5. **Add features** - Email verification, password reset, etc.
6. **Deploy** - MongoDB Atlas + Vercel/Heroku

---

## 📚 Documentation Index

- **INSTALLATION.md** - Step-by-step setup
- **SETUP_GUIDE.md** - Comprehensive guide with architecture
- **API_TESTING.md** - API endpoints with examples
- **ARCHITECTURE.md** - Complete system design & data flow
- **BACKEND_SUMMARY.md** - Feature overview
- **QUICK_REFERENCE.md** - This file!

---

## 💡 Pro Tips

1. **Save JWT token** - Already done in `api.js`
2. **Add error boundaries** - Catch component errors
3. **Add loading spinners** - Show while fetching
4. **Add confirmation dialogs** - Before deleting
5. **Add form validation** - Check before submitting
6. **Add error toasts** - Notify users of failures
7. **Add success toasts** - Notify users of success
8. **Debounce search** - Don't query on every keystroke

---

## 🎓 Learning Resources

- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **MongoDB**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/
- **REST API**: https://restfulapi.net/
- **React Context**: https://react.dev/reference/react/useContext

---

## ⚡ Commands Reference

```bash
# Backend
cd server && npm install && npm run dev

# Frontend (new terminal)
cd my-app && npm install && npm run dev

# MongoDB (local)
mongosh  # or mongo

# Stop servers
Ctrl+C (in terminal)

# Check if port is in use (Windows)
netstat -ano | findstr :5000

# Kill process by PID (Windows)
taskkill /PID <PID> /F
```

---

**Happy coding! 🎉**
