# Authentication System API (JWT + PostgreSQL)

A secure authentication REST API built with Node.js, Express, and PostgreSQL. Uses JWT for session management and bcrypt for password hashing.

## Features

- User registration with email validation
- Secure login with JWT token generation
- Protected profile route (JWT middleware)
- Role-based structure (User / Admin)
- Password hashing with bcrypt
- Rate limiting on auth routes
- HTTP header security via helmet
- Centralized error handling
- Request logging middleware

## Folder Structure
src/
├── controllers/
│ └── authController.js
├── routes/
│ └── authRoutes.js
├── models/
│ └── userModel.js
├── middleware/
│ ├── logger.js
│ ├── errorHandler.js
│ ├── auth.js
│ └── rateLimiter.js
├── config/
│ ├── config.js
│ └── db.js
└── app.js


## Database Table: users

| Field       | Type      | Description                     |
|-------------|-----------|----------------------------------|
| id          | SERIAL    | Primary key                     |
| name        | VARCHAR   | Required                        |
| email       | VARCHAR   | Unique, required                |
| password    | VARCHAR   | Hashed with bcrypt               |
| role        | VARCHAR   | Default 'User', or 'Admin'      |
| created_at  | TIMESTAMP | Default NOW()                   |

## Setup Instructions

1. Install dependencies:
```bash
   npm install
```
2. Create a PostgreSQL database named `auth_db` and run the table creation SQL (see below)
3. Create a `.env` file (see `.env.example`) with your DB credentials and a JWT secret
4. Start the server:
```bash
   npm run dev
```
5. Server runs at `http://localhost:5000`

## Database Setup SQL

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'User',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### 1. Register

POST /api/auth/register

Body:
```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "secret123",
  "role": "User"
}
```

### 2. Login

POST /api/auth/login

Body:
```json
{
  "email": "ali@example.com",
  "password": "secret123"
}
```
Returns a JWT token on success.

### 3. Get Profile (Protected)

GET /api/auth/profile

Requires header: `Authorization: Bearer <token>`

## Testing

A Postman collection (`postman_collection.json`) is included in the project root.

## Tech Stack

- Node.js, Express.js
- PostgreSQL (pg)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- helmet (security headers)
- express-rate-limit (rate limiting)
- validator (email validation)