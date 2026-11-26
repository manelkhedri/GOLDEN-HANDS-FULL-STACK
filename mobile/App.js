
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import application services
import {registerUser,loginUser,getCurrentUser,} from './src/services/authService';
import { saveToken, deleteToken } from './src/services/tokenService';

// Import application components
import BottomNavigation from './src/components/BottomNavigation';

// Import application screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AdminProductsScreen from './src/screens/AdminProductsScreen';
import ProductFormScreen from './src/screens/ProductFormScreen';

// Main application component responsible for screen navigation
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  // Store the product selected by the user
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Store the products added to the shopping cart
  const [cartItems, setCartItems] = useState([]);
  // Store the logged-in user's information
  const [user, setUser] = useState(null);
  // Store the product selected for editing
const [editingProduct, setEditingProduct] = useState(null);


  // Add a product to the cart or increase its quantity
const handleAddToCart = (product) => {
  setCartItems((currentItems) => {
    const existingItem = currentItems.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      return currentItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...currentItems, { ...product, quantity: 1 }];
  });
};

// Increase the quantity of a cart product
const handleIncreaseQuantity = (productId) => {
  setCartItems((currentItems) =>
    currentItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// Decrease the quantity or remove the product when it reaches zero
const handleDecreaseQuantity = (productId) => {
  setCartItems((currentItems) =>
    currentItems
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

// Remove a product completely from the cart
const handleRemoveFromCart = (productId) => {
  setCartItems((currentItems) =>
    currentItems.filter((item) => item._id !== productId)
  );
};

// Log out the user and clear the saved session
const handleLogout = async () => {
  try {
    await deleteToken();
    setUser(null);
    setCartItems([]);
    setCurrentScreen('welcome');
  } catch (error) {
    alert('Unable to log out. Please try again.');
  }
};

  // Display the selected screen and pass its navigation functions
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onContinue={() => setCurrentScreen('account')}
          />
        );

      case 'account':
        return (
          <AccountScreen
            onBack={() => setCurrentScreen('welcome')}
            onCreateAccount={() => setCurrentScreen('register')}
            onLogin={() => setCurrentScreen('login')}
            onGoogleLogin={() => {}}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onBack={() => setCurrentScreen('account')}
            onRegister={async (userData) => {
              try {
                const result = await registerUser(userData);

                alert(result.message || 'Account created successfully!');

                setCurrentScreen('login');
              } catch (error) {
                alert(error.message || 'Registration failed. Please try again.');
              }
            }}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onBack={() => setCurrentScreen('account')}
            onLogin={async (userData) => {
              try {
                const result = await loginUser(userData);

                await saveToken(result.token);

                // Fetch the complete user profile, including the role
                const currentUser = await getCurrentUser(result.token);

                setUser(currentUser);

                // alert(`Welcome ${result.user.name}!`);

                // console.log('Logged-in user:', result.user);

                setCurrentScreen('products');
              } catch (error) {
                alert(error.message || 'Login failed. Please try again.');
              }
            }}
          />
        );

     case 'products':
  return (
    <ProductsScreen
      onProductPress={(product) => {
        setSelectedProduct(product);
        setCurrentScreen('productDetails');
      }}
      onOpenCart={() => setCurrentScreen('cart')}
    />
  );

case 'productDetails':
  return (
    <ProductDetailsScreen
      product={selectedProduct}
      onBack={() => setCurrentScreen('products')}
      onAddToCart={(product) => {
  handleAddToCart(product);
  setCurrentScreen('cart');
}}
    />
  );

  case 'cart':
  return (
    <CartScreen
      cartItems={cartItems}
      onIncrease={handleIncreaseQuantity}
      onDecrease={handleDecreaseQuantity}
      onRemove={handleRemoveFromCart}
      onBack={() => setCurrentScreen('products')}
      onCheckout={() => {
        alert('Checkout will be implemented later.');
      }}
    />
  );

  case 'adminProducts':
  return (
    <AdminProductsScreen
      onAddProduct={() => {
        setEditingProduct(null);
        setCurrentScreen('productForm');
      }}
      onEditProduct={(product) => {
        setEditingProduct(product);
        setCurrentScreen('productForm');
      }}
    />
  );

  case 'productForm':
  return (
    <ProductFormScreen
      product={editingProduct}
      onBack={() => setCurrentScreen('adminProducts')}
    />
  );

  case 'profile':
  return (
    <ProfileScreen
      user={user}
      onLogout={handleLogout}
    />
  );

      default:
        return (
          <WelcomeScreen
            onContinue={() => setCurrentScreen('account')}
          />
        );
    }
  };

  return (
  <View style={styles.container}>
    <StatusBar style="dark" />

    {renderScreen()}

    {/* Show bottom navigation on main screens */}
    {['products', 'cart', 'profile', 'adminProducts', 'productForm'].includes(currentScreen) && (
      <BottomNavigation
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        isAdmin={user?.role === 'admin'}
      />
    )}
  </View>
);
}

// Main application container styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

