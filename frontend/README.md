
# Student name : KHEDRI Manel
# Application/Store name : GOLDEN HANDS 
A stylish crochet e-commerce application showcasing handmade creations, including keychains, gloves, bags, table decorations, and crochet vests.

# Application Description

GOLDEN HANDS is a frontend e-commerce application dedicated to handmade crochet products. It highlights the beauty of handcrafted items through a product catalog with images, names, and prices.

The application was developed as part of a practical assignment to apply React concepts, reusable components, and centralized state management using Redux Toolkit.

The main goal is to create an attractive, user-friendly shopping interface while demonstrating how modern React applications manage and update application state.

# Technologies Used

| Technology | Purpose |
|:---|:---|
|React| Building the user interface with reusable components |
|Vite| Development server and production build tool |
|JavaScript (ES6+)| Application logic and interactivity |
|Redux Toolkit| Managing the shopping cart state |
|React Redux| Connecting React components to the Redux store |
|HTML5| Structuring the application |
|CSS3| Styling and designing the interface |
|Git & GitHub| Version control and source code hosting |
|GitHub Pages| Deploying the application online |

# Main React Components

The application is organized into reusable components, each responsible for a specific part of the interface.

- "App.jsx" — Main application component that brings the interface and its components together.
- "ProductList.jsx" — Displays the collection of available crochet products.
- "ProductCard.jsx" — Presents individual product information, including its image, name, price, and shopping actions.
- "SearchBar.jsx" — Allows users to search for products.
- "CartSummary.jsx" — Displays a summary of the shopping cart.
- "main.jsx" — Entry point of the React application, where the Redux Provider makes the store available to the component tree.

## State Management Files

- "src/app/store.js" — Configures the Redux store.
- "src/features/cartSlice.js" — Defines the shopping cart state and the actions used to update it.
- "src/data/products.js" — Contains the product catalog data.

# Redux State Management

Redux Toolkit is used to manage the shopping cart state centrally, making it accessible to the React components that need it.

The application uses a Redux store configured in "store.js" and a cart slice defined in "cartSlice.js".

Main state managed by Redux:

- Cart items: The products added to the shopping cart.
- Product quantities: The quantity of each item in the cart, if supported by the cart logic.
- Cart updates: Changes resulting from adding or removing products, according to the implemented actions.

The cart slice defines the actions that update the state, while React Redux provides access to the store through the "Provider" and the appropriate hooks.

This approach keeps cart-related state organized and avoids having to pass it manually through multiple component levels.

# Implemented Features

- Product Catalog: Browse a collection of 15 handmade crochet products.
- Multiple Categories: Explore keychains, gloves, bags, table decorations, and vests.
- Product Images: View images representing the handmade creations.
- Product Search: Search for products using the search interface.
- Shopping Cart: Add products to the cart using the implemented cart actions.
- Cart Summary: View a summary of the shopping cart.
- Centralized State Management: Manage cart-related state with Redux Toolkit.
- Reusable Components: Build the interface using modular React components.
- Online Deployment: Access the application through GitHub Pages.

# Instructions for running the application

Follow these steps to run the project locally.

Prerequisites

Make sure you have installed:

- "Node.js" (https://nodejs.org/)
- npm, which is included with Node.js
- "Git" (https://git-scm.com/) (optional, for cloning the repository)

1. Clone the Repository

git clone https://github.com/manelkhedri/threads-crochet.git

2. Navigate to the Project Directory

cd e-commerce-app

3. Install Dependencies

npm install

4. Start the Development Server

npm run dev

Open the local URL displayed in your terminal, usually:

http://localhost:5173/


# Deployment

The application is deployed using GitHub Pages. The production build is generated with Vite and published through GitHub Actions.

Visit the live application:

🔗 https://manelkhedri.github.io/threads-crochet/






