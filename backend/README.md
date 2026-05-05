# Backend - DSA Learning Platform

## 📋 Project Overview

This is the backend API for a DSA (Data Structures & Algorithms) learning platform built with Node.js and Express.js. It handles user authentication, problem management, and user progress tracking.

---

## 🛠️ Tech Stack

### Runtime & Framework

- **Node.js** - JavaScript runtime environment
- **Express.js** (v5.2.1) - Web application framework for building RESTful APIs

### Database

- **MongoDB** - NoSQL database (via Mongoose)
- **Mongoose** (v9.6.1) - MongoDB object modeling and schema validation

### Authentication & Security

- **JWT (jsonwebtoken)** (v9.0.3) - JSON Web Tokens for stateless authentication
- **bcryptjs** (v3.0.3) - Password hashing and encryption

### Middleware & Utilities

- **CORS** (v2.8.6) - Cross-Origin Resource Sharing for frontend-backend communication
- **dotenv** (v17.4.2) - Environment variable management

---

## 📁 Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── .env                       # Environment variables (not committed)
│
├── config/
│   └── db.js                 # MongoDB connection configuration
│
├── controllers/
│   ├── authController.js     # Authentication logic (login, register, etc.)
│   └── problemController.js  # Problem/DSA topic management logic
│
├── models/
│   ├── User.js               # User schema (MongoDB model)
│   └── Problem.js            # Problem/DSA topic schema
│
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   └── problemRoutes.js      # Problem/DSA endpoints
│
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware
│
├── data/
│   ├── dsaSheet.js           # DSA data/problems data
│   └── localdb.json          # Local database backup
│
└── utils/
    └── localStore.js         # Utility functions for local storage
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file in the backend directory:**

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Check server status

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Problem Routes (`/api/problem`)

- `GET /api/problem` - Get all DSA problems
- `GET /api/problem/:id` - Get specific problem
- `POST /api/problem` - Create new problem (admin)
- `PUT /api/problem/:id` - Update problem (admin)
- `DELETE /api/problem/:id` - Delete problem (admin)

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns a JWT token
3. Frontend stores token in localStorage
4. Token is sent in `Authorization: Bearer <token>` header for protected routes
5. `authMiddleware.js` verifies the token on each protected request

---

## 📦 Key Dependencies

| Package      | Version | Purpose               |
| ------------ | ------- | --------------------- |
| express      | ^5.2.1  | Web framework         |
| mongoose     | ^9.6.1  | MongoDB ODM           |
| jsonwebtoken | ^9.0.3  | JWT authentication    |
| bcryptjs     | ^3.0.3  | Password hashing      |
| cors         | ^2.8.6  | Cross-origin requests |
| dotenv       | ^17.4.2 | Environment config    |

---

## 🔧 Scripts

```bash
npm start    # Start the server
npm test     # Run tests (not configured yet)
```

---

## 📝 Environment Variables

```
MONGODB_URI    # MongoDB connection string
JWT_SECRET     # Secret key for JWT signing
PORT           # Server port (default: 5000)
```

---

## 🤝 Database Schema

### User Model

- `username` - String, unique
- `email` - String, unique
- `password` - String (hashed)
- `createdAt` - Date
- `updatedAt` - Date

### Problem Model

- `title` - String
- `description` - String
- `difficulty` - String (Easy, Medium, Hard)
- `category` - String (Array/Sorting/DP/etc.)
- `solved` - Boolean
- `solvedCount` - Number
- `createdAt` - Date

---

## ⚙️ Configuration Files

### `config/db.js`

Handles MongoDB connection using Mongoose.

### `.env` Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsadb
JWT_SECRET=your_super_secret_key_here_12345
PORT=5000
```

---

## 📌 Notes

- All passwords are hashed using bcryptjs before storage
- JWT tokens expire based on configuration
- CORS is enabled for frontend requests
- API follows RESTful conventions
- Endpoints requiring authentication use `authMiddleware.js`

---

## 🐛 Troubleshooting

### Connection Issues

- Verify MongoDB URI is correct
- Check if MongoDB service is running
- Ensure firewall allows connection

### Auth Errors

- Verify JWT_SECRET is set in .env
- Check token expiration
- Ensure token is sent in Authorization header

---

## 📞 Support

For issues or questions, contact the development team.
