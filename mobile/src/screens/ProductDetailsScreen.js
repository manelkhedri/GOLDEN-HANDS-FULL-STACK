
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { API_URL } from '../services/api';
import CustomButton from '../components/CustomButton';

// Display detailed information about the selected product
export default function ProductDetailsScreen({
  product,
  onBack,
  onAddToCart,
}) {
  // Prepare the product image URL
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `${API_URL}/${product.image.replace(/^\/+/, '')}`;

  return (
    <ScrollView style={styles.container}>
      {/* Back navigation button */}
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Back to Products</Text>
      </Pressable>

      {/* Product image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* Product information */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>

        <Text style={styles.productPrice}>
          {product.price} DA
        </Text>

        <Text style={styles.category}>
          Category: {product.category}
        </Text>

        <Text style={styles.type}>
          Type: {product.type}
        </Text>

        {/* Display product size only when available */}
        {product.size ? (
          <Text style={styles.size}>
            Size: {product.size}
          </Text>
        ) : null}

        <Text style={styles.descriptionTitle}>Description</Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        {/* Add the selected product to the cart */}
        <CustomButton
          title="Add to Cart"
          onPress={() => onAddToCart(product)}
          backgroundColor="#A8420B"
          textColor="#FFFFFF"
        />
      </View>
    </ScrollView>
  );
}

// Styles for the product details screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
  },
  backButton: {
    padding: 20,
    marginTop: 30,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A8420B',
  },
  productImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#F4D9E8',
  },
  detailsContainer: {
    padding: 22,
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#A8420B',
  },
  productPrice: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#80513B',
    marginTop: 12,
  },
  category: {
    fontSize: 15,
    color: '#80513B',
    marginTop: 18,
  },
  type: {
    fontSize: 15,
    color: '#80513B',
    marginTop: 8,
  },
  size: {
    fontSize: 15,
    color: '#80513B',
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#A8420B',
    marginTop: 22,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#80513B',
    lineHeight: 23,
    marginBottom: 25,
  },
});
