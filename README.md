# USER AUTHENTICATION & ROLE BASED ACCESS API

# Project Overview

This is a secure User Authentication API built with Node.js, Express, and MongoDB. It provides features for user registration, login, logout, role-based access control, and password management. The API is JWT-based, uses bcrypt for password hashing, and includes refresh token support for session renewal.

This project is designed to be a backend foundation for web or mobile applications requiring secure authentication and user management.

# Features
1. User Authentication

Register: Secure user registration with hashed passwords using bcrypt.

Login: JWT-based login system with access and refresh tokens.

Logout: Clears authentication cookies to end user sessions.

2. Role-Based Access

Supports user (default) and admin roles.

Admin routes allow viewing all users and deleting users.

User routes allow accessing personal profile data only.

3. Protected Routes

JWT middleware ensures routes are accessible only to authenticated users.

Role middleware restricts sensitive operations to admins.

4. Error Handling

Proper HTTP status codes for invalid credentials, unauthorized access, expired/invalid tokens, and server errors.

5. Bonus Features

Refresh Tokens: Allows renewing access tokens without re-login.

Password Reset: Users can reset their password securely.

Last Login Tracking: Stores the last login timestamp for each user.

# Technologies Used

Node.js

Express.js

MongoDB & Mongoose

JWT (JSON Web Token)

bcryptjs

cookie-parser

dotenv

CORS

# API Endpoints
-> Authentication

POST /api/register-user – Register a new user

POST /api/login-user – User login

POST /api/logout-user – User logout

POST /api/refresh-token – Refresh access token

POST /api/reset-password – Reset user password

-> User Routes

GET /user/user-profile – Get logged-in user's profile (protected)

-> Admin Routes

GET /admin/fetch-all-users – Get all users (admin only)

DELETE /admin/delete-user/:id – Delete a user by ID (admin only)


# Installation

-> Clone the repository:

git clone <repo-url>

-> Install dependencies:

npm install


-> Create a .env file with the following variables:

MONGO_URI=<your_mongodb_connection_string>

JWT_SECRET_ACCESS_TOKEN=<your_access_token_secret>

JWT_SECRET_REFRESH_TOKEN=<your_refresh_token_secret>


Start the server:

npm run start

## Live Demo
[Click here to try the User Authentication API](https://userauthentication-role-based-api.onrender.com)
