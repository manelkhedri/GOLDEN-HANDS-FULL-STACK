# GOLDEN HANDS – Backend

## 1. Student Information

**Student Name:** KHEDRI Manel 
**Project Name:** GOLDEN HANDS  
**Project Part:** Backend

## 2. Application Description

GOLDEN HANDS is a crochet e-commerce application designed to allow users to explore and purchase handmade crochet products.

The backend provides the application's core functionality, including user registration, login, authentication, Google OAuth 2.0 login, and product management.

It uses a MongoDB database to store application data and JWT authentication to secure protected API endpoints.

## 3. Technologies Used

The backend was developed using the following technologies:

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Backend web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Token (JWT):** Used for user authentication and authorization.
- **Passport.js:** Authentication middleware.
- **Google OAuth 2.0:** Allows users to sign in using their Google accounts.
- **bcrypt:** Used to hash and securely store user passwords.
- **Postman:** Used to test API endpoints.

## 4. Database Models

The application uses MongoDB with Mongoose models.

### User Model

The User model stores registered users' information, including:

- User information.
- Email address.
- Hashed password.
- Google account information when applicable.

Passwords are securely hashed before being stored in the database.

### Product Model

The Product model stores crochet products available in the application.

It is used to manage product information and supports product creation, retrieval, updating, and deletion.

## 5. API Endpoints

The backend provides the following REST API endpoints.

### Authentication Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in with email and password |
| GET | `/api/auth/google` | Public | Start Google OAuth authentication |
| GET | `/api/auth/google/callback` | Public | Handle Google OAuth callback |

### Product Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | Retrieve all products |
| GET | `/api/products/:id` | Public | Retrieve a single product |
| POST | `/api/products` | Protected | Create a new product |
| PUT | `/api/products/:id` | Protected | Update an existing product |
| DELETE | `/api/products/:id` | Protected | Delete a product |

**Note:** Protected endpoints require a valid JWT access token.

## 6. JWT Authentication and Authorization

The backend uses JSON Web Tokens (JWT) to authenticate users and protect restricted API endpoints.

The authentication process works as follows:

1. A new user registers using the registration endpoint.
2. The password is hashed before being stored in MongoDB.
3. The user logs in using valid credentials.
4. The backend verifies the user's credentials.
5. After successful login, the backend generates a JWT.
6. The client sends the token in the Authorization header when accessing protected endpoints.
7. The authentication middleware verifies the token using the JWT secret.
8. If the token is valid, the request is authorized. Otherwise, the server returns an unauthorized response.

The token must be sent using the following format:

`Authorization: Bearer YOUR_JWT_TOKEN`

The authentication middleware verifies the token and identifies the authenticated user before allowing access to protected routes.

## 7. Google OAuth 2.0 Authentication

The application supports Google authentication using Passport.js and Google OAuth 2.0.

The authentication process works as follows:

1. The user selects the Google login option from the frontend.
2. The frontend redirects the user to `/api/auth/google`.
3. Passport.js handles the Google authentication process.
4. Google redirects the user to the backend callback endpoint.
5. The backend processes the Google account information.
6. A JWT is generated for the authenticated user.
7. The backend redirects the user to the frontend with the token.
8. The frontend stores the token and updates the authentication state.

The Google OAuth callback URL is:

`http://localhost:3000/api/auth/google/callback`

## 8. Installation and Running the Backend

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- MongoDB
- Git

### Installation Steps

1. Clone the backend repository:

```bash
git clone https://github.com/manelkhedri/e-commerce-backend.git
```

2. Navigate to the backend project directory:

```bash
cd e-commerce-backend
```

3. Install the required dependencies:

```bash
npm install
```

4. Create a `.env` file in the backend root directory.

5. Configure the required environment variables.

6. Start the backend server:

```bash
node server.js
```

When the server starts successfully, the terminal displays messages confirming the MongoDB connection and server startup.

The backend runs locally at:

`http://localhost:3000`

## 9. Environment Variables

The backend uses environment variables to configure the database connection, JWT authentication, and Google OAuth credentials.

The `.env` file contains the following configuration:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

**Important:**

- Replace the example values with the appropriate configuration values.
- Never share or upload the `.env` file.
- The `.env` file is included in `.gitignore` to prevent sensitive credentials from being committed to GitHub.

## 10. API Testing Using Postman

Postman was used to test the backend API endpoints and verify that the application works correctly.

The following tests were performed successfully:

### Authentication Tests

| Test | Expected Result |
|---|---|
| Register a new user | User registered successfully |
| Register using an existing email | Registration rejected |
| Login with valid credentials | Login successful |
| Login with invalid credentials | Authentication rejected |
| Receive JWT after successful login | JWT returned successfully |

### Product Management Tests

| Test | Expected Result |
|---|---|
| GET all products | Products retrieved successfully |
| GET a single product | Product retrieved successfully |
| POST a new product with a valid JWT | Product created successfully |
| PUT an existing product with a valid JWT | Product updated successfully |
| DELETE a product with a valid JWT | Product deleted successfully |

### Security and Error Handling Tests

| Test | Expected Result |
|---|---|
| Access a protected route without a token | `401 Unauthorized` |
| Access a protected route with an invalid token | `401 Unauthorized` |
| Access a product using an invalid ID | Appropriate error response |
| Submit missing or invalid product information | Validation error response |

All the above tests were performed using Postman to verify authentication, product management, and API security.

## 11. Backend Project Structure

```text
backend/
│
├── config/
│   └── passport.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Product.js
│
├── routes/
│   └── authRoutes.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env
```

## 12. Conclusion

The GOLDEN HANDS backend provides the main server-side functionality required by the application.

It includes user registration and login, secure password hashing, JWT authentication, Google OAuth 2.0 integration, MongoDB database management, and protected product management endpoints.

The API endpoints were tested successfully using Postman, including authentication, product operations, and security validation.

The backend is connected to the frontend and provides the necessary services for the GOLDEN HANDS crochet e-commerce application.