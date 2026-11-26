# GOLDEN HANDS – Mobile Application
## STUDENT FULL NAME: KHEDRI Manel
## 1. Project Description

GOLDEN HANDS is a mobile e-commerce application developed using React Native and Expo.

The application allows users to browse and explore handmade crochet products from the GOLDEN HANDS online store.

It connects to the existing GOLDEN HANDS REST API, allowing users and administrators to interact with the same product database used by the web application.

This project was developed as part of the TP05 practical assignment.

## 2. Technologies Used

- React Native
- Expo SDK 58
- JavaScript
- React Hooks (`useState`)
- REST API
- Fetch API
- JSON
- Expo Secure Store
- Expo Image Picker
- Node.js and Express (existing backend)
- MongoDB (existing database)

## 3. Main Features

### Authentication
- User registration.
- User login using email and password.
- JWT-based authentication.
- Secure token storage using Expo Secure Store.
- User profile display.
- Logout functionality.

**Note:** The Continue with Google button is displayed in the interface, but Google authentication is not implemented in this mobile version.

### Products
- Display products retrieved from the backend API.
- Two-column product grid.
- Product images and prices.
- Search products by name.
- Filter products by category.
- Display detailed product information.

### Shopping Cart
- Add products to the cart.
- Increase and decrease product quantities.
- Remove products from the cart.
- Calculate the total price.
- Display an empty cart message.

### Administrator Features

Administrators have access to additional product management features:

- View all products.
- Add new products.
- Edit existing products.
- Delete products.
- Upload and update product images.
- Select product categories.

### User Interface
- Simple and user-friendly interface.
- Consistent GOLDEN HANDS branding and colors.
- Reusable components.
- Bottom navigation.
- Loading and error messages.

## 4. Backend API

The mobile application communicates with the existing GOLDEN HANDS backend.

**Base URL:**

https://golden-hands-full-stack.onrender.com

**Main API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Get current user information |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve product details |
| POST | `/api/products` | Add a product (Admin) |
| PUT | `/api/products/:id` | Update a product (Admin) |
| DELETE | `/api/products/:id` | Delete a product (Admin) |

Protected endpoints require JWT authentication using the Bearer token.

## 5. Project Structure

```text
mobile/
│
├── assets/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── BottomNavigation.js
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   └── Logo.js
│   │
│   ├── screens/
│   │   ├── WelcomeScreen.js
│   │   ├── AccountScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── LoginScreen.js
│   │   ├── ProductsScreen.js
│   │   ├── ProductDetailsScreen.js
│   │   ├── CartScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── AdminProductsScreen.js
│   │   └── ProductFormScreen.js
│   │
│   └── services/
│       ├── api.js
│       ├── authService.js
│       ├── productService.js
│       └── tokenService.js
│
├── App.js
├── app.json
├── package.json
└── README.md
```

## 6. Installation and Setup

### Prerequisites

- Node.js and npm.
- Expo Go installed on an Android or iOS device.
- Internet connection.
- Access to the GOLDEN HANDS backend API.

### Step 1: Navigate to the mobile directory

```bash
cd mobile
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the Expo development server

```bash
npx expo start --tunnel
```

### Step 4: Run the application

- Open Expo Go on your mobile device.
- Scan the QR code displayed in the terminal.
- Wait for the application to load.

## 7. Testing

The following features were tested using Expo Go on a physical mobile device:

- User registration and login.
- Authentication error handling.
- Product loading from the backend.
- Product search and category filtering.
- Product details display.
- Adding products to the shopping cart.
- Cart quantity management and total calculation.
- User profile and logout.
- Administrator product management.
- Adding, editing and deleting products.
- Product image uploading.
- Network error handling.

## 8. Notes and Limitations

- The application uses the existing GOLDEN HANDS backend and MongoDB database.
- Administrator features require an account with the administrator role.
- Google authentication is not enabled in this version.
- The checkout button is currently a placeholder because an order processing endpoint is not available in the existing backend.
- The shopping cart is managed locally in the application.

## 9. Author

Developed as part of the TP05 practical assignment.

**Project:** GOLDEN HANDS – Mobile Application

**Technology:** React Native & Expo