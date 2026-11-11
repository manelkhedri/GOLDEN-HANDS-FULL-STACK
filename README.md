# GOLDEN HANDS

## Full-Stack E-Commerce Web Application

**Student Name:** KHEDRI Manel

**Live Website:** https://golden-hands-full-stack-1.onrender.com

**Backend API:** https://golden-hands-full-stack.onrender.com

**GitHub Repository:** https://github.com/manelkhedri/GOLDEN-HANDS-FULL-STACK

---

## 1. Project Overview

GOLDEN HANDS is a full-stack e-commerce web application dedicated to handmade crochet products. It provides customers with an easy and user-friendly shopping experience, allowing them to explore and discover different handmade products.

The application also provides administrative features for managing products and product images.

## 2. Technologies Used

### Frontend
- React.js
- Redux Toolkit
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Passport.js
- Google OAuth 2.0
- Multer
- bcryptjs

## 3. Main Features

- User registration and login.
- Google authentication.
- Secure authentication using JWT.
- Browse and explore products.
- Product search and filtering.
- Shopping cart functionality.
- Admin product management.
- Add, edit, and delete products.
- Upload product images.

## 4. Product Categories

The application includes different handmade crochet product categories:

- Keychains
- Gloves
- Bags
- Table Decor
- Vests

## 5. Project Structure

```text
GOLDEN-HANDS-FULL-STACK/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 6. Installation and Setup

### Prerequisites

Make sure you have installed:
- Node.js
- npm
- MongoDB database

### Clone the Repository

```bash
git clone https://github.com/manelkhedri/GOLDEN-HANDS-FULL-STACK.git
cd GOLDEN-HANDS-FULL-STACK
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure the following environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 7. Database

The application uses MongoDB as its database, with Mongoose for data modeling and database operations.

The database stores user accounts and product information.

## 8. Authentication and Security

- Password hashing using bcryptjs.
- JWT-based authentication.
- Google OAuth 2.0 integration.
- Protected routes and admin authorization.

## 9. Deployment

The application is deployed using Render:

- **Frontend:** https://golden-hands-full-stack-1.onrender.com
- **Backend:** https://golden-hands-full-stack.onrender.com

Production environment variables are configured through the Render dashboard.

## 10. Project Purpose

This project was developed to demonstrate full-stack web development skills through the creation of an e-commerce platform dedicated to handmade crochet products.

It combines a responsive user interface, backend services, database integration, authentication, and product management.

---

**Developed by: Khedri Manel**

**GOLDEN HANDS — Handmade with Love.**