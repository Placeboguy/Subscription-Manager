## Quick API Testing Guide

### Using Postman or cURL

#### 1. Register New User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. Login User
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### 3. Get Current User (Requires Token)
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token_here>
```

---

#### 4. Add Subscription (Requires Token)
```bash
POST http://localhost:5000/api/subscriptions
Authorization: Bearer <your_token_here>
Content-Type: application/json

{
  "name": "Netflix",
  "category": "Streaming",
  "price": 15.99,
  "frequency": "monthly",
  "description": "Movie streaming service"
}
```

---

#### 5. Get All Subscriptions (Requires Token)
```bash
GET http://localhost:5000/api/subscriptions
Authorization: Bearer <your_token_here>
```

---

#### 6. Get Subscription Stats (Requires Token)
```bash
GET http://localhost:5000/api/subscriptions/stats/overview
Authorization: Bearer <your_token_here>
```

---

#### 7. Update Subscription (Requires Token)
```bash
PUT http://localhost:5000/api/subscriptions/<subscription_id>
Authorization: Bearer <your_token_here>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 19.99,
  "status": "active"
}
```

---

#### 8. Delete Subscription (Requires Token)
```bash
DELETE http://localhost:5000/api/subscriptions/<subscription_id>
Authorization: Bearer <your_token_here>
```

---

## Using cURL Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Subscriptions (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer TOKEN"
```

### Add Subscription
```bash
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Netflix","category":"Streaming","price":15.99,"frequency":"monthly"}'
```

---

## Testing in React App

The frontend already has all API integration done:

1. Go to http://localhost:5173
2. **Sign Up** with new email
3. **Add Subscriptions** through UI
4. **View Dashboard** stats update automatically
5. **Manage Subscriptions** in "All Subscriptions" page

All data persists in MongoDB and is user-specific!

---

## Debugging Tips

1. **Check MongoDB is running:**
   ```bash
   mongo
   # or for MongoDB 5.0+
   mongosh
   ```

2. **View MongoDB data:**
   ```bash
   use subscription-manager
   db.users.find()
   db.subscriptions.find()
   ```

3. **Backend logs:**
   - Watch terminal where `npm run dev` is running
   - All requests logged with timestamps

4. **Frontend network logs:**
   - Open DevTools (F12)
   - Go to Network tab
   - Watch API calls happen in real-time

5. **Token validation:**
   - Decode JWT at: https://jwt.io
   - Paste token to see claims
   - Check expiration time

---

## Common Issues & Fixes

### "MongoDB connection refused"
- Start MongoDB service
- Check MONGODB_URI in .env

### "Unauthorized" on protected routes
- Include `Authorization: Bearer <token>` header
- Make sure token is still valid (expires in 30 days)

### CORS errors
- Check backend is running on :5000
- Check frontend is running on :5173 or :5174
- Backend has `cors()` middleware enabled

### Email already exists error
- Use different email for signup
- Or check MongoDB if user exists: `db.users.find({email: "..."})`

### Stats showing zeros
- Make sure subscriptions have `status: "active"`
- Check frequency is "monthly" or "yearly"
- Data takes moment to sync

