# Subscription Manager - Full Stack Setup Guide

## 🚀 Quick Start

Your Subscription Manager app now has a complete backend with MongoDB and Express! Follow these steps to get everything running.

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

---

## 📁 Project Structure

```
Subs Manager/
├── my-app/                 (React Frontend)
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js     (API service for backend communication)
│   │   ├── pages/
│   │   │   └── AuthPage.jsx  (Updated with real auth)
│   │   └── Context/
│   │       └── SubscriptionContext.jsx  (Backend-connected)
│   └── package.json
│
└── server/                (Node/Express Backend)
    ├── config/
    │   └── db.js          (MongoDB connection)
    ├── models/
    │   ├── User.js        (User schema)
    │   └── Subscription.js (Subscription schema)
    ├── controllers/
    │   ├── authController.js      (Auth logic)
    │   └── subscriptionController.js  (Subscription CRUD)
    ├── routes/
    │   ├── auth.js        (Auth endpoints)
    │   └── subscriptions.js (Subscription endpoints)
    ├── middleware/
    │   └── auth.js        (JWT authentication)
    ├── server.js          (Express app entry)
    ├── package.json
    └── .env               (Environment variables)
```

---

## 🔧 Setup Instructions

### Step 1: Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB service
- Default URI: `mongodb://localhost:27017/subscription-manager`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/subscription-manager`)

---

### Step 2: Setup Backend Server

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Update .env file with your MongoDB URI (if using Atlas)
# Open .env and update MONGODB_URI if needed
```

#### Configure `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/subscription-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas**, replace the URI with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-manager?retryWrites=true&w=majority
```

#### Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

✅ You should see: `✓ Server running on http://localhost:5000`

---

### Step 3: Setup Frontend

```bash
# Navigate to my-app folder
cd my-app

# Install dependencies (if not already done)
npm install

# Start React dev server
npm run dev
```

✅ You should see: Frontend running on `http://localhost:5173` or `http://localhost:5174`

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- **POST** `/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/me` - Get current user (requires auth token)

### Subscription Routes (`/api/subscriptions`) - All require authentication

- **GET** `/` - Get all user subscriptions
- **GET** `/stats/overview` - Get subscription statistics
- **GET** `/:id` - Get single subscription
- **POST** `/` - Create new subscription
  ```json
  {
    "name": "Netflix",
    "category": "Streaming",
    "price": 15.99,
    "frequency": "monthly",
    "description": "Movie streaming service"
  }
  ```
- **PUT** `/:id` - Update subscription
- **DELETE** `/:id` - Delete subscription

---

## 🔐 How Authentication Works

1. **User registers/logs in** via AuthPage
2. **Backend validates** credentials and returns JWT token
3. **Frontend stores** token in localStorage
4. **All API requests** include token in Authorization header
5. **Backend verifies** token with `protect` middleware

### Token Format:
```
Authorization: Bearer <jwt_token>
```

---

## 📊 MongoDB Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcryptjs),
  createdAt: Date,
  updatedAt: Date
}
```

### Subscriptions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  name: String,
  category: String (Entertainment|Productivity|Fitness|Education|Streaming|Other),
  price: Number,
  frequency: String (monthly|yearly),
  status: String (active|paused|cancelled),
  startDate: Date,
  nextBillingDate: Date,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing the App

1. **Open frontend**: http://localhost:5173
2. **Create account**:
   - Enter name, email, password
   - Click "Sign Up"
   - Automatically logged in
3. **Add subscription**:
   - Click "Add Subscription" button
   - Fill in details (Name, Price, Frequency, etc.)
   - Click "Add"
4. **View subscriptions**:
   - See in Dashboard stats
   - View all in "All Subscriptions" page
5. **Manage subscriptions**:
   - Edit or delete subscriptions
   - Stats update automatically

---

## 🚨 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: MongoDB is not running. Start MongoDB service or check connection string.

### CORS error
```
Cross-Origin Request Blocked
```
**Solution**: Backend is not running on port 5000. Check `npm run dev` output.

### Authentication fails
- Check `.env` JWT_SECRET is set
- Clear localStorage in browser DevTools
- Try signing up again

### Database shows empty subscriptions
- Make sure you're logged in with the same account
- Each user only sees their own subscriptions
- Check MongoDB that data was saved

---

## 📝 Key Features Implemented

✅ User Registration & Login with JWT
✅ Password encryption with bcryptjs
✅ MongoDB database for persistent storage
✅ User-specific subscription data
✅ REST API endpoints
✅ Protected routes (require authentication)
✅ Error handling and validation
✅ Subscription CRUD operations
✅ Subscription statistics
✅ Auto-calculated next billing dates

---

## 🔄 Data Flow

```
React App (Login Form)
        ↓
   API Service (src/services/api.js)
        ↓
Backend (Express Server)
        ↓
   Authentication Middleware
        ↓
   Controllers (Business Logic)
        ↓
   MongoDB (Persistent Storage)
```

---

## 🎯 Next Steps

1. **Deploy MongoDB**: Use MongoDB Atlas for production
2. **Change JWT Secret**: Update in `.env` to something secure
3. **Frontend Deployment**: Deploy React app to Vercel/Netlify
4. **Backend Deployment**: Deploy server to Heroku/Railway/Render
5. **Update API URL**: Change `API_BASE_URL` in `src/services/api.js`
6. **Add password validation**: Require stronger passwords
7. **Add email verification**: Verify emails before activation

---

## 📞 Support

If you encounter issues:
1. Check terminal for error messages
2. Verify MongoDB is running
3. Check backend and frontend are on correct ports
4. Clear browser cache and localStorage
5. Restart both servers

---

## ⚡ Commands Reference

```bash
# Backend
cd server
npm install
npm run dev      # Development
npm start        # Production

# Frontend
cd my-app
npm install
npm run dev      # Development
npm run build    # Production build
```

---

**You're all set! Your Subscription Manager now has a full backend infrastructure with real user authentication and persistent data storage! 🎉**
