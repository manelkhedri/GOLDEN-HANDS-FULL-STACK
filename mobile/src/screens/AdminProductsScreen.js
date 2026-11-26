import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { API_URL } from '../services/api';
import { getProducts } from '../services/productService';
import { getToken } from '../services/tokenService';

import CustomButton from '../components/CustomButton';

// Admin products screen
export default function AdminProductsScreen({
  onAddProduct,
  onEditProduct,
}) {
  // Store products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load products when the admin screen opens
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Delete a product after admin confirmation
const handleDeleteProduct = (productId) => {
  Alert.alert(
    'Delete Product',
    'Are you sure you want to delete this product?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await getToken();

            const response = await fetch(
              `${API_URL}/api/products/${productId}`,
              {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Failed to delete product.');
            }

            setProducts((currentProducts) =>
              currentProducts.filter((item) => item._id !== productId)
            );

            Alert.alert('Success', 'Product deleted successfully.');
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]
  );
};

// Render one product with its admin actions
const renderProduct = ({ item }) => {
  const imageUrl = item.image.startsWith('http')
    ? item.image
    : `${API_URL}/${item.image.replace(/^\/+/, '')}`;

  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>
          {item.name}
        </Text>

        <Text style={styles.productPrice}>
          {item.price} DA
        </Text>

        <Text style={styles.productCategory}>
          {item.category}
        </Text>

        {/* Product management actions */}
        <View style={styles.actions}>
          <Pressable
            style={styles.editButton}
            onPress={() => onEditProduct(item)}
          >
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteProduct(item._id)}
          >
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Display the admin products screen
return (
  <View style={styles.container}>
    {/* Admin screen header */}
    <Text style={styles.title}>Manage Products</Text>

    {/* Add new product button */}
    <CustomButton
      title="+ Add New Product"
      onPress={onAddProduct}
      backgroundColor="#A8420B"
      textColor="#FFFFFF"
    />

    {/* Loading indicator */}
    {loading ? (
      <ActivityIndicator
        size="large"
        color="#A8420B"
        style={styles.loader}
      />
    ) : error ? (
      <Text style={styles.errorText}>{error}</Text>
    ) : products.length === 0 ? (
      <Text style={styles.emptyText}>No products found.</Text>
    ) : (
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    )}
  </View>
);
}

// Styles for the admin products screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#A8420B',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    marginTop: 40,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
  },
  productImage: {
    width: 105,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#F4D9E8',
  },
  productInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A8420B',
  },
  productPrice: {
    fontSize: 14,
    color: '#80513B',
    marginTop: 5,
  },
  productCategory: {
    fontSize: 13,
    color: '#80513B',
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#F2A9C5',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#B00020',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorText: {
    color: '#B00020',
    textAlign: 'center',
    marginTop: 30,
  },
  emptyText: {
    color: '#80513B',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});