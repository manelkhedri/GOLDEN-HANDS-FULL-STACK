
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { API_URL } from '../services/api';
import { getProducts } from '../services/productService';

// Available product categories
const categories = [
  'All',
  'Keychains',
  'Gloves',
  'Bags',
  'Table Decor',
  'Vests',
];

// Main screen for displaying store products
export default function ProductsScreen({ onProductPress, onOpenCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load products from the backend when the screen opens
  useEffect(() => {
    loadProducts();
  }, []);

  // Fetch products and handle loading errors
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare the correct image URL from the backend
  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith('http')) {
      return image;
    }

    return `${API_URL}/${image.replace(/^\/+/, '')}`;
  };

  // Filter products using the search text and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Display each product as a reusable card
  const renderProduct = ({ item }) => (
    <Pressable
      style={styles.productCard}
      onPress={() => onProductPress?.(item)}
    >
      {item.image ? (
        <Image
          source={{ uri: getImageUrl(item.image) }}
          style={styles.productImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>

      <Text style={styles.productPrice}>
        {item.price} DA
      </Text>

      <Text style={styles.productCategory}>
        {item.category}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Store header and cart button */}
      <View style={styles.header}>
        <Text style={styles.storeName}>GOLDEN HANDS</Text>

        <Pressable onPress={onOpenCart} style={styles.cartButton}>
          <Text style={styles.cartText}>🛒</Text>
        </Pressable>
      </View>

      {/* Product search field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#9B8275"
        value={search}
        onChangeText={setSearch}
      />

      {/* Product category filters */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        style={styles.categoriesList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )}
      />

      {/* Loading, error, empty and product list states */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#A8420B"
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={loadProducts}>
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No products found.
            </Text>
          }
        />
      )}
    </View>
  );
}

// Styles for the products screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    paddingTop: 45,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  storeName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#A8420B',
    letterSpacing: 1,
  },
  cartButton: {
    padding: 8,
  },
  cartText: {
    fontSize: 27,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5CFC0',
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    marginBottom: 15,
    color: '#80513B',
  },
  categoriesList: {
    flexGrow: 0,
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#A8420B',
  },
  categoryText: {
    color: '#80513B',
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productsList: {
    paddingBottom: 25,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 9,
    marginBottom: 15,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 145,
    borderRadius: 10,
    backgroundColor: '#F4D9E8',
  },
  imagePlaceholder: {
    height: 145,
    backgroundColor: '#F4D9E8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#80513B',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A8420B',
    marginTop: 9,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#80513B',
    marginTop: 6,
  },
  productCategory: {
    fontSize: 12,
    color: '#9B8275',
    marginTop: 4,
  },
  loader: {
    marginTop: 50,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: '#B00020',
    textAlign: 'center',
  },
  retryText: {
    color: '#A8420B',
    fontWeight: 'bold',
    marginTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#80513B',
    marginTop: 35,
  },
});
